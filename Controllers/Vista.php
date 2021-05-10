<?php
    class Vista extends Controllers{
        
        function principal(){
            require VW . DF . "head.html";
            $this->view->render($this, "principal");
            require VW . DF . "footer.html";
        }

        function checkout(){
            require VW . DF . "head.html";
            $this->view->render($this, "checkout");
            require VW . DF . "footer.html";
        }
    }