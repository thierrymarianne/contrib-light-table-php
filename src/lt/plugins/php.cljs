(ns lt.plugins.php
  (:require [lt.object :as object]
            [lt.objs.clients :as clients]
            [lt.objs.clients.tcp :as tcp]
            [lt.objs.editor :as ed]
            [lt.objs.eval :as eval]
            [lt.objs.command :as cmd]
            [lt.objs.dialogs :as dialogs]
            [lt.objs.files :as files]
            [lt.objs.notifos :as notifos]
            [lt.objs.platform :as platform]
            [lt.objs.popup :as popup]
            [lt.objs.proc :as proc]
            [lt.objs.plugins :as plugins]
            [lt.objs.sidebar.clients :as scl]
            [lt.util.load :as load])
  (:require-macros [lt.macros :refer [behavior]]))

(def debug-mode false)

(defn log [message]
  (when debug-mode (.log js/console (clojure.string/join message))))

(comment Declare path to PHP plugin directory)
(def plugin-dir (plugins/find-plugin "Php"))

(comment Declare path to PHP server)
(def server-path (files/join plugin-dir "php-src/ltmain.php"))

(comment Declare shell utility allowing use of `which` command)
(def shell (load/node-module "shelljs"))

(defn check-php [obj]
  (assoc obj :php (.which shell "php")))

(defn check-server [obj]
  (assoc obj :php-server (files/exists? server-path)))

(defn handle-no-php [client]
  (clients/rem! client)
  (notifos/done-working)
  (popup/popup! {:header "We could not find PHP."
                 :body "In order to evaluate in PHP files,
                 PHP must installed and on your system PATH"
                 :buttons [{:label "Download PHP"
                            :action (fn []
                                      (platform/open "https://php.net"))}
                           {:label "ok"}]}))

(defn run-php [{:keys [path client] :as info}]
  (let [obj (object/create ::connecting-notifier client)
        client-id (clients/->id  client)]
    (object/merge! client {:port tcp/port
                           :proc obj})
    (object/add-tags client [:tcp.client])

    (notifos/working "Connecting...")

    (log ["tcp port: #" tcp/port])
    (log ["server path: \"" server-path "\""])

    (proc/exec {:command "php"
                :args [server-path tcp/port client-id]
                :cwd path
                :env {}
                :obj obj})))

(defn notify [obj]
  (let [{:keys [php path php-server client]} obj]
    (cond
     (or (not php) (empty? php)) (do (handle-no-php client))
     :else (run-php obj))
    obj))

(defn check-all [obj]
  (-> obj
      (check-php)
      (check-server)
      (notify)))

(defn try-connect [{:keys [info]}]
  (let [path (:path info)
        client (clients/client! :php.client)]
    (log ["Trying to connect with client #" (clients/->id client)])
    (check-all {:path path
                :client client})
    (log ["Client of id #" (clients/->id client) " has been checked successfully."])
    client))

(object/object* ::php-lang
                :tags #{:php.lang})

(def php (object/create ::php-lang))

(scl/add-connector {:name "PHP"
                    :desc "Select a directory to serve as the root of your PHP projet"
                    :connect (fn []
                               (dialogs/dir php :connect))})

(behavior ::connect
          :desc "PHP: Try to connect client to Light Table"
          :triggers #{:connect}
          :reaction (fn [this path]
                      (try-connect {:info {:path path}})))

(behavior ::on-eval
          :desc "PHP: Eval current editor"
          :triggers #{:eval}
          :reaction (fn [editor]
                      (log ["Start evaluating snippet"])
                      (object/raise php :eval! {:origin editor
                                                :info (assoc (@editor :info)
                                                        :code (ed/->val editor)
                                                        :meta {:start 0, :end (ed/last-line editor)})})))

(behavior ::on-eval.one
          :desc "PHP: Evaluate current selection"
          :triggers #{:eval.one}
          :reaction (fn [editor]
                      (let [pos (ed/->cursor editor)
                            info (conj (:info @editor)
                                       (if (ed/selection? editor)
                                         {:code (ed/selection editor)
                                          :meta {:start (-> (ed/->cursor editor "start") :line)
                                                 :end (-> (ed/->cursor editor "end") :line)}}
                                         {:pos pos
                                          :code (ed/line editor (:line pos))
                                          :meta {:start (:line pos)
                                                 :end (:line pos)}}))]
                        (log ["Evaluating current selection"])
                        (object/raise php :eval! {:origin editor :info info}))))

(behavior ::eval!
          :desc "PHP: Evaluate snippet of code"
          :triggers #{:eval!}
          :reaction (fn [this event]
                      (log ["Evaluating snippet: " (:info event)])

                      (let [{:keys [info origin]} event
                             client (-> @origin :client :default)]
                        (notifos/working "Evaluating...")
                        (log ["client id #" (clients/->id client)])

                        (clients/send (eval/get-client! {:command :editor.eval.php
                                                         :origin origin
                                                         :info info
                                                         :create try-connect})
                                      :editor.eval.php info
                                      :only origin))))


(behavior ::php-watch
           :desc "PHP: Watch expression"
           :triggers #{:editor.eval.php.watch}
           :reaction (fn [editor res]
                       (when-let [watch (get (:watches @editor) (-> res :meta :id))]
                       (let [str-result (:result res)]
                          (object/raise (:inline-result watch) :update! str-result)))))

(behavior ::php-exception
          :desc "PHP: Handle exception"
          :triggers #{:editor.eval.php.exception}
          :reaction (fn [editor ex]
                      (notifos/done-working)
                      (log ["Handling exception"])
                      (object/raise editor
                                    :editor.exception (:ex ex)
                                    {:line (-> ex :meta :end)
                                    :start-line (-> ex :meta :start)})))

(behavior ::php-result
          :desc "PHP: Handle evaluation result"
          :triggers #{:editor.eval.php.result}
          :reaction (fn [editor res]
                        (notifos/done-working)
                        (log ["Handling results"])
                        (object/raise editor
                                      :editor.result (:result res)
                                      {:line (:end (:meta res))
                                      :start-line (-> res :meta :start)})))

(behavior ::on-out
          :triggers #{:proc.out}
          :reaction (fn [this data]
                       (let [out (.toString data)]
                         (object/update! this [:buffer] str out)
                         (comment The "Connected" token should be contained in the buffer)
                         (when (> (.indexOf out "Connected") -1)
                          (do
                            (log ["Connected"])
                            (notifos/done-working)
                            (object/merge! this {:connected true}))
                            (log ["Buffer: " (str out)])
                          (object/update! this [:buffer] str out)))))

(behavior ::on-error
          :triggers #{:proc.error}
          :reaction (fn [this buffer]
                      (log ["Connection error : " (.toString buffer)])
                      (let [error (.toString buffer)]
                        (notifos/done-working)
                        (when-not (> (.indexOf (:buffer @this) "Connected") -1)
                          (object/update! this [:buffer] str error)))))

(behavior ::on-exit
          :triggers #{:proc.exit}
          :reaction (fn [this exit-code]
                      (when-not (:connected @this)
                        (notifos/done-working)
                        (popup/popup! {:header "We could not connect."
                                       :body [:span "Looks like there was an issue
                                              when trying to connect to the project."]
                                       :buttons [{:label "close"}]}))
                      (clients/rem! (:client @this))
                      (log ["Removed client of id#" (clients/->id (:client @this))])
                      (proc/kill-all (:procs @this))
                      (object/destroy! this)))

(object/object* ::connecting-notifier
                :triggers []
                :behaviors [::on-exit ::on-error ::on-out]
                :init (fn [this client]
                        (object/merge! this {:client client :buffer ""})
                        nil))

