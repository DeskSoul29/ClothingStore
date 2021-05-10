<?php
    require "config.php";
    $url= $_SERVER["REQUEST_URI"];
 
    $url = explode("/", $url);
    
    $controller = "";
    $method = "";
    $cont=1;
    foreach($url as $t){
        if($cont==2){
            $controller=$t;
        }
        if($cont==3){
            $method=$t;
        }
        $cont=$cont+1;   
    }
    
    spl_autoload_register(function($class){
        if(file_exists(LB.$class . ".php")){
            require LB.$class . ".php";
        }
    });

    require 'Controllers/Error.php';
    $error = new Errors();

    $controllersPath = "Controllers/" . $controller . '.php';

    if (file_exists($controllersPath)) {
        require $controllersPath;

        $controller = new $controller();

        if (isset($method)) {
            if (method_exists($controller, $method))
                $controller->{$method}();
            else
                $error->error();
        }
    } else
        $error->error();
