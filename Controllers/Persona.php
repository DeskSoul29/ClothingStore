<?php
    class Persona extends Controllers{
        function registrar(){
            $cedula = $_POST["pers_ced"];
            $nombre = $_POST["pers_nombre"];
            $apellido = $_POST["pers_apellido"];
            $correo = $_POST["pers_adress"];
            $celular = $_POST["tele_celular"];
            $ciudad = $_POST["pers_city"];

            $res = $this->model->insertarContactos($cedula, $nombre, $apellido, $correo, $celular, $ciudad);
            echo $res;
        }
        
        function editar(){
            $cedula = $_POST["pers_ced"];
            $nombre = $_POST["pers_nombre"];
            $apellido = $_POST["pers_apellido"];
            $correo = $_POST["pers_adress"];
            $celular = $_POST["tele_celular"];
            $ciudad = $_POST["pers_city"];

            $res = $this->model->actualizarContatos($cedula, $nombre, $apellido, $correo, $celular, $ciudad);
            echo $res;
        }

        function borrar(){
            $cedula = $_POST["pers_ced"];
            $ciudad = $_POST["pers_city"];
            

            $res = $this->model->borrarContacto($cedula, $ciudad);
            
            echo $res;
        }
        
        function obtenerTodo(){
            $res = $this->model->seleccionarTodosContactos();
            if (is_array($res)) 
                echo json_encode($res);
            else
                echo $res;
        }
    }