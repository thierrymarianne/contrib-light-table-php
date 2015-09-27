if(!lt.util.load.provided_QMARK_('lt.plugins.php')) {
goog.provide('lt.plugins.php');
goog.require('cljs.core');
goog.require('lt.objs.plugins');
goog.require('lt.objs.files');
goog.require('lt.objs.platform');
goog.require('lt.objs.popup');
goog.require('lt.objs.dialogs');
goog.require('lt.objs.popup');
goog.require('lt.objs.notifos');
goog.require('lt.objs.proc');
goog.require('lt.objs.notifos');
goog.require('lt.objs.command');
goog.require('lt.objs.platform');
goog.require('lt.objs.files');
goog.require('lt.objs.clients.tcp');
goog.require('lt.objs.sidebar.clients');
goog.require('lt.objs.plugins');
goog.require('lt.objs.eval');
goog.require('lt.objs.clients');
goog.require('lt.objs.clients.tcp');
goog.require('lt.util.load');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.dialogs');
goog.require('lt.util.load');
goog.require('lt.objs.proc');
goog.require('lt.objs.eval');
goog.require('lt.objs.clients');
goog.require('lt.objs.sidebar.clients');
goog.require('lt.objs.command');
goog.require('lt.objs.editor');
lt.plugins.php.debug_mode = true;
lt.plugins.php.log = (function log(message){if(cljs.core.truth_(lt.plugins.php.debug_mode))
{return console.log(clojure.string.join.call(null,message));
} else
{return null;
}
});
lt.plugins.php.plugin_dir = lt.objs.plugins.find_plugin.call(null,"Php");
lt.plugins.php.server_path = lt.objs.files.join.call(null,lt.plugins.php.plugin_dir,"php-src/ltmain.php");
lt.plugins.php.shell = lt.util.load.node_module.call(null,"shelljs");
lt.plugins.php.check_php = (function check_php(obj){return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"php","php",1014015210),lt.plugins.php.shell.which("php"));
});
lt.plugins.php.check_server = (function check_server(obj){return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"php-server","php-server",3780887722),lt.objs.files.exists_QMARK_.call(null,lt.plugins.php.server_path));
});
lt.plugins.php.handle_no_php = (function handle_no_php(client){lt.objs.clients.rem_BANG_.call(null,client);
lt.objs.notifos.done_working.call(null);
return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"We could not find PHP.",new cljs.core.Keyword(null,"body","body",1016933652),"In order to evaluate in PHP files,\n                 PHP must installed and on your system PATH",new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Download PHP",new cljs.core.Keyword(null,"action","action",3885920680),(function (){return lt.objs.platform.open.call(null,"https://php.net");
})], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"ok"], null)], null)], null));
});
lt.plugins.php.run_php = (function run_php(p__6359){var map__6361 = p__6359;var map__6361__$1 = ((cljs.core.seq_QMARK_.call(null,map__6361))?cljs.core.apply.call(null,cljs.core.hash_map,map__6361):map__6361);var info = map__6361__$1;var client = cljs.core.get.call(null,map__6361__$1,new cljs.core.Keyword(null,"client","client",3951159101));var path = cljs.core.get.call(null,map__6361__$1,new cljs.core.Keyword(null,"path","path",1017337751));var obj = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.php","connecting-notifier","lt.plugins.php/connecting-notifier",2403829242),client);var client_id = lt.objs.clients.__GT_id.call(null,client);lt.object.merge_BANG_.call(null,client,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"port","port",1017351155),lt.objs.clients.tcp.port,new cljs.core.Keyword(null,"proc","proc",1017353928),obj], null));
lt.object.add_tags.call(null,client,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tcp.client","tcp.client",3877789162)], null));
lt.objs.notifos.working.call(null,"Connecting...");
lt.plugins.php.log.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["tcp port: #",lt.objs.clients.tcp.port], null));
lt.plugins.php.log.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["server path: \"",lt.plugins.php.server_path,"\""], null));
return lt.objs.proc.exec.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"command","command",1964298941),"php",new cljs.core.Keyword(null,"args","args",1016906831),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.php.server_path,lt.objs.clients.tcp.port,client_id], null),new cljs.core.Keyword(null,"cwd","cwd",1014003170),path,new cljs.core.Keyword(null,"env","env",1014004831),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"obj","obj",1014014057),obj], null));
});
lt.plugins.php.notify = (function notify(obj){var map__6363 = obj;var map__6363__$1 = ((cljs.core.seq_QMARK_.call(null,map__6363))?cljs.core.apply.call(null,cljs.core.hash_map,map__6363):map__6363);var client = cljs.core.get.call(null,map__6363__$1,new cljs.core.Keyword(null,"client","client",3951159101));var php_server = cljs.core.get.call(null,map__6363__$1,new cljs.core.Keyword(null,"php-server","php-server",3780887722));var path = cljs.core.get.call(null,map__6363__$1,new cljs.core.Keyword(null,"path","path",1017337751));var php = cljs.core.get.call(null,map__6363__$1,new cljs.core.Keyword(null,"php","php",1014015210));if((cljs.core.not.call(null,php)) || (cljs.core.empty_QMARK_.call(null,php)))
{lt.plugins.php.handle_no_php.call(null,client);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{lt.plugins.php.run_php.call(null,obj);
} else
{}
}
return obj;
});
lt.plugins.php.check_all = (function check_all(obj){return lt.plugins.php.notify.call(null,lt.plugins.php.check_server.call(null,lt.plugins.php.check_php.call(null,obj)));
});
lt.plugins.php.try_connect = (function try_connect(p__6364){var map__6366 = p__6364;var map__6366__$1 = ((cljs.core.seq_QMARK_.call(null,map__6366))?cljs.core.apply.call(null,cljs.core.hash_map,map__6366):map__6366);var info = cljs.core.get.call(null,map__6366__$1,new cljs.core.Keyword(null,"info","info",1017141280));var path = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(info);var client = lt.objs.clients.client_BANG_.call(null,new cljs.core.Keyword(null,"php.client","php.client",4216505459));lt.plugins.php.log.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Trying to connect with client #",lt.objs.clients.__GT_id.call(null,client)], null));
lt.plugins.php.check_all.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"path","path",1017337751),path,new cljs.core.Keyword(null,"client","client",3951159101),client], null));
lt.plugins.php.log.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Client of id #",lt.objs.clients.__GT_id.call(null,client)," has been checked successfully."], null));
return client;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.php","php-lang","lt.plugins.php/php-lang",4117308930),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"php.lang","php.lang",3998496790),null], null), null));
lt.plugins.php.php = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.php","php-lang","lt.plugins.php/php-lang",4117308930));
lt.objs.sidebar.clients.add_connector.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),"PHP",new cljs.core.Keyword(null,"desc","desc",1016984067),"Select a directory to serve as the root of your PHP projet",new cljs.core.Keyword(null,"connect","connect",1965255772),(function (){return lt.objs.dialogs.dir.call(null,lt.plugins.php.php,new cljs.core.Keyword(null,"connect","connect",1965255772));
})], null));
lt.plugins.php.__BEH__connect = (function __BEH__connect(this$,path){return lt.plugins.php.try_connect.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"info","info",1017141280),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",1017337751),path], null)], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.php","connect","lt.plugins.php/connect",2057556553),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.php.__BEH__connect,new cljs.core.Keyword(null,"desc","desc",1016984067),"PHP: Try to connect client to Light Table",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connect","connect",1965255772),null], null), null));
lt.plugins.php.__BEH__on_eval = (function __BEH__on_eval(editor){lt.plugins.php.log.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Start evaluating snippet"], null));
return lt.object.raise.call(null,lt.plugins.php.php,new cljs.core.Keyword(null,"eval!","eval!",1110791799),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"info","info",1017141280),cljs.core.assoc.call(null,cljs.core.deref.call(null,editor).call(null,new cljs.core.Keyword(null,"info","info",1017141280)),new cljs.core.Keyword(null,"code","code",1016963423),lt.objs.editor.__GT_val.call(null,editor),new cljs.core.Keyword(null,"meta","meta",1017252215),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",1123661780),0,new cljs.core.Keyword(null,"end","end",1014004813),lt.objs.editor.last_line.call(null,editor)], null))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.php","on-eval","lt.plugins.php/on-eval",4465210793),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.php.__BEH__on_eval,new cljs.core.Keyword(null,"desc","desc",1016984067),"PHP: Eval current editor",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval","eval",1017029646),null], null), null));
lt.plugins.php.__BEH__on_eval__DOT__one = (function __BEH__on_eval__DOT__one(editor){var pos = lt.objs.editor.__GT_cursor.call(null,editor);var info = cljs.core.conj.call(null,new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor)),(cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,editor))?new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"code","code",1016963423),lt.objs.editor.selection.call(null,editor),new cljs.core.Keyword(null,"meta","meta",1017252215),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",1123661780),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,editor,"start")),new cljs.core.Keyword(null,"end","end",1014004813),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,editor,"end"))], null)], null):new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"pos","pos",1014015430),pos,new cljs.core.Keyword(null,"code","code",1016963423),lt.objs.editor.line.call(null,editor,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(pos)),new cljs.core.Keyword(null,"meta","meta",1017252215),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",1123661780),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(pos),new cljs.core.Keyword(null,"end","end",1014004813),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(pos)], null)], null)));lt.plugins.php.log.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Evaluating current selection"], null));
return lt.object.raise.call(null,lt.plugins.php.php,new cljs.core.Keyword(null,"eval!","eval!",1110791799),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"info","info",1017141280),info], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.php","on-eval.one","lt.plugins.php/on-eval.one",4359197473),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.php.__BEH__on_eval__DOT__one,new cljs.core.Keyword(null,"desc","desc",1016984067),"PHP: Evaluate current selection",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval.one","eval.one",1173589382),null], null), null));
lt.plugins.php.__BEH__eval_BANG_ = (function __BEH__eval_BANG_(this$,event){lt.plugins.php.log.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Evaluating snippet: ",new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(event)], null));
var map__6368 = event;var map__6368__$1 = ((cljs.core.seq_QMARK_.call(null,map__6368))?cljs.core.apply.call(null,cljs.core.hash_map,map__6368):map__6368);var origin = cljs.core.get.call(null,map__6368__$1,new cljs.core.Keyword(null,"origin","origin",4300251800));var info = cljs.core.get.call(null,map__6368__$1,new cljs.core.Keyword(null,"info","info",1017141280));var client = new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,origin)));lt.objs.notifos.working.call(null,"Evaluating...");
lt.plugins.php.log.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["client id #",lt.objs.clients.__GT_id.call(null,client)], null));
return lt.objs.clients.send.call(null,lt.objs.eval.get_client_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"editor.eval.php","editor.eval.php",1083026425),new cljs.core.Keyword(null,"origin","origin",4300251800),origin,new cljs.core.Keyword(null,"info","info",1017141280),info,new cljs.core.Keyword(null,"create","create",3956577390),lt.plugins.php.try_connect], null)),new cljs.core.Keyword(null,"editor.eval.php","editor.eval.php",1083026425),info,new cljs.core.Keyword(null,"only","only",1017320222),origin);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.php","eval!","lt.plugins.php/eval!",2704928868),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.php.__BEH__eval_BANG_,new cljs.core.Keyword(null,"desc","desc",1016984067),"PHP: Evaluate snippet of code",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval!","eval!",1110791799),null], null), null));
lt.plugins.php.__BEH__php_watch = (function __BEH__php_watch(editor,res){var temp__4092__auto__ = cljs.core.get.call(null,new cljs.core.Keyword(null,"watches","watches",2139868463).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor)),new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)));if(cljs.core.truth_(temp__4092__auto__))
{var watch = temp__4092__auto__;var str_result = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res);return lt.object.raise.call(null,new cljs.core.Keyword(null,"inline-result","inline-result",656479555).cljs$core$IFn$_invoke$arity$1(watch),new cljs.core.Keyword(null,"update!","update!",779473898),str_result);
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.php","php-watch","lt.plugins.php/php-watch",765377817),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.php.__BEH__php_watch,new cljs.core.Keyword(null,"desc","desc",1016984067),"PHP: Watch expression",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.php.watch","editor.eval.php.watch",3880164378),null], null), null));
lt.plugins.php.__BEH__php_exception = (function __BEH__php_exception(editor,ex){lt.objs.notifos.done_working.call(null);
lt.plugins.php.log.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Handling exception"], null));
return lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"editor.exception","editor.exception",3983021184),new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(ex),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"end","end",1014004813).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(ex)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(ex))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.php","php-exception","lt.plugins.php/php-exception",3225118489),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.php.__BEH__php_exception,new cljs.core.Keyword(null,"desc","desc",1016984067),"PHP: Handle exception",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.php.exception","editor.eval.php.exception",1436816154),null], null), null));
lt.plugins.php.__BEH__php_result = (function __BEH__php_result(editor,res){lt.objs.notifos.done_working.call(null);
lt.plugins.php.log.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Handling results"], null));
return lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"end","end",1014004813).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.php","php-result","lt.plugins.php/php-result",4375176049),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.php.__BEH__php_result,new cljs.core.Keyword(null,"desc","desc",1016984067),"PHP: Handle evaluation result",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.php.result","editor.eval.php.result",3829158614),null], null), null));
lt.plugins.php.__BEH__on_out = (function __BEH__on_out(this$,data){var out = data.toString();lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"buffer","buffer",3930752946)], null),cljs.core.str,out);
if((out.indexOf("Connected") > -1))
{lt.plugins.php.log.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Connected"], null));
lt.objs.notifos.done_working.call(null);
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connected","connected",4729661051),true], null));
lt.plugins.php.log.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Buffer: ",[cljs.core.str(out)].join('')], null));
return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"buffer","buffer",3930752946)], null),cljs.core.str,out);
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.php","on-out","lt.plugins.php/on-out",3749847751),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.php.__BEH__on_out,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.out","proc.out",4302083112),null], null), null));
lt.plugins.php.__BEH__on_error = (function __BEH__on_error(this$,buffer){lt.plugins.php.log.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Connection error : ",buffer.toString()], null));
var error = buffer.toString();lt.objs.notifos.done_working.call(null);
if((new cljs.core.Keyword(null,"buffer","buffer",3930752946).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)).indexOf("Connected") > -1))
{return null;
} else
{return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"buffer","buffer",3930752946)], null),cljs.core.str,error);
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.php","on-error","lt.plugins.php/on-error",2620488313),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.php.__BEH__on_error,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.error","proc.error",4143512802),null], null), null));
lt.plugins.php.__BEH__on_exit = (function __BEH__on_exit(this$,exit_code){if(cljs.core.truth_(new cljs.core.Keyword(null,"connected","connected",4729661051).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))
{} else
{lt.objs.notifos.done_working.call(null);
lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"We could not connect.",new cljs.core.Keyword(null,"body","body",1016933652),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1017440956),"Looks like there was an issue\n                                              when trying to connect to the project."], null),new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"close"], null)], null)], null));
}
lt.objs.clients.rem_BANG_.call(null,new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
lt.plugins.php.log.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Removed client of id#",lt.objs.clients.__GT_id.call(null,new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))], null));
lt.objs.proc.kill_all.call(null,new cljs.core.Keyword(null,"procs","procs",1120844623).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
return lt.object.destroy_BANG_.call(null,this$);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.php","on-exit","lt.plugins.php/on-exit",4465208619),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.php.__BEH__on_exit,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.exit","proc.exit",4162906152),null], null), null));
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.php","connecting-notifier","lt.plugins.php/connecting-notifier",2403829242),new cljs.core.Keyword(null,"triggers","triggers",2516997421),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"behaviors","behaviors",607554515),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.plugins.php","on-exit","lt.plugins.php/on-exit",4465208619),new cljs.core.Keyword("lt.plugins.php","on-error","lt.plugins.php/on-error",2620488313),new cljs.core.Keyword("lt.plugins.php","on-out","lt.plugins.php/on-out",3749847751)], null),new cljs.core.Keyword(null,"init","init",1017141378),(function (this$,client){lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"client","client",3951159101),client,new cljs.core.Keyword(null,"buffer","buffer",3930752946),""], null));
return null;
}));
}

//# sourceMappingURL=php_compiled.js.map