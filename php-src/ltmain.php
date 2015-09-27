<?php

require __DIR__ . '/vendor/autoload.php';

use Monolog\Logger,
    Monolog\Handler\StreamHandler;

use React\EventLoop\Factory as EventLoopFactory;

$log = new Logger('socket_client');
$log->pushHandler(new StreamHandler(__DIR__ . '/logs/dev.log', Logger::INFO));

function checkInput($input, Logger $log) {
    if (array_key_exists(1, $input)) {
        $port = $input[1];
        $log->addInfo(sprintf("Listening to port #%d", $port));
    } else {
        throw new \InvalidArgumentException('Invalid port');
    }

    if (array_key_exists(2, $input)) {
        $clientId = $input[2];
        $log->addInfo(sprintf("Client id #%d", $clientId));
    } else {
        throw new \InvalidArgumentException('Invalid client id');
    }
}

function connectToLightTable($clientId, $port, $projectRootDir, Logger $log) {
    $message = [
        'client-id' => intval($clientId),
        'tags' => 'php.client',
        'commands' => [
            'editor.eval.php',
            'editor.eval.php.exception',
            'editor.eval.php.result'
        ],
        'name' => 'PHP',
        'type' => 'php',
        'dir' => $projectRootDir
    ];

    $loop = EventLoopFactory::create();

    $dnsResolverFactory = new React\Dns\Resolver\Factory();
    $dns = $dnsResolverFactory->createCached('8.8.8.8', $loop);
    $connector = new React\SocketClient\Connector($loop, $dns);


    $connector->create('127.0.0.1', intval($port))->then(
        function (React\Stream\Stream $stream) use ($log, $message) {
            echo 'Connected';

            $encodedMessage = json_encode($message);
            $stream->write($encodedMessage . "\n");

            $log->addInfo(sprintf('Acknowledged connection and client id #%d', $message['client-id']));

            $stream->on('data', function ($data) use ($stream, $log, $encodedMessage) {
                    $log->addInfo(sprintf('Decoding data "%s"', print_r($data, true)));
                    $decodedData = json_decode($data, $asAssociativeArray = true);

                    if ($decodedData[1] == 'editor.eval.php') {
                        try {
                            ob_start();
                            require $decodedData[2]['path'];
                            $output = ob_get_contents();
                            $outputType = 'result';
                            $responseType = 'editor.eval.php.result';
                        } catch (\Exception $exception) {
                            $output = $exception->getMessage();
                            $output .= $exception->getTraceAsString();
                            $outputType = 'ex';
                            $responseType = 'editor.eval.php.exception';
                        }

                        $response = json_encode([
                            $decodedData[0],
                            $responseType,
                            [
                                "meta" => $decodedData[2]['meta'],
                                $outputType => $output
                            ]
                        ]);

                        $stream->write($response. "\n");
                    	ob_end_clean();
                    }

                    if ($decodedData[1] === 'client.close') {
                        $stream->close();
                    }
                }
            );
        }
    );

    $loop->run();
}


checkInput($argv, $log);

$port = $argv[1];
$clientId = $argv[2];
$projectRootDir = getcwd();

$log->addInfo(sprintf("Project root dir \"%s\"", $projectRootDir));

connectToLightTable($clientId, $port, $projectRootDir, $log);
