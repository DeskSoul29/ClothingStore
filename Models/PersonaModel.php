<?php
class PersonaModel extends Connection
{
    function insertarContactos($cedula, $nombre, $apellido, $correo, $celular, $ciudad)
    {
        $table = "persona";
        $values = "";
        $params = array();

        $values = "(pers_ced, pers_nombre, pers_apellido, pers_correo, pers_tel, pers_city) VALUES (:cedula,:nombre,:apellido,:correo,:celular,:ciudad)";
        $params = array(
            "cedula" => $cedula,
            "nombre" => $nombre,
            "apellido" => $apellido,
            "correo" => $correo,
            "celular" => $celular,
            "ciudad" => $ciudad
        );

        $data = $this->db->insert($table, $values, $params);
        if ($data == true)
            return 1;
        else
            return $data;
    }

    function borrarContacto2($cedula, $ciudad)
    {
        $table = "persona";
        $where = "pers_city = :ciudad AND(SELECT COUNT(pers_city) FROM persona WHERE pers_city = :ciudad) >= 3 and pers_ced= :cedula";
        $params = array(
            "cedula" => $cedula,
            "ciudad" => $ciudad
        );

        $data = $this->db->delete($table, $where, $params);
        if ($data == true)
            return 1;
        else
            return $data;
    }

    function borrarContacto($cedula, $ciudad)
    {
        $cedula1 = strval($cedula);
        $ciudad1 = strval($ciudad);

        $hostname = 'localhost';
        $database = 'db_clientes';
        $username = 'desksoul';
        $password = 'jcrn';

        $conexion = new mysqli($hostname, $username, $password, $database);
        $con1 = "delete from persona WHERE pers_city = '" . $ciudad . "' AND(SELECT COUNT(pers_city) FROM persona WHERE pers_city = '" . $ciudad . "') >= 3 and pers_ced='" . $cedula . "'";
        mysqli_query($conexion, $con1) or die(mysqli_connect_error());
        mysqli_close($conexion);
        return 1;
    }

    function actualizarContatos2($cedula, $nombre, $apellido, $correo, $celular, $ciudad)
    {
        $table = "persona";
        $newvalues = "";
        $params = array();
        $where = "";
        $columns = "*";

        $data = $this->db->update($table, $columns, $newvalues, $where, $params);
        if ($data == true)
            return 1;
        else
            return $data;
    }

    function actualizarContatos($cedula, $nombre, $apellido, $correo, $celular, $ciudad)
    {

        $hostname = 'localhost';
        $database = 'db_clientes';
        $username = 'desksoul';
        $password = 'jcrn';
        $conexion = new mysqli($hostname, $username, $password, $database);

        $consulta = "UPDATE persona SET pers_ced='" . $cedula . "', pers_nombre='" . $nombre . "', pers_apellido='" . $apellido . "', pers_tel='" . $celular . "', pers_correo='" . $correo . "', pers_city='" . $ciudad . "' where pers_ced='" . $cedula . "'";
        mysqli_query($conexion, $consulta) or die(mysqli_connect_error());
        mysqli_close($conexion);

        return 1;
    }

    function seleccionarTodosContactos()
    {
        $columns = "*";
        $tables = "persona";
        $where = "";
        $params = "";
        return $this->db->select($columns, $tables, $where, $params);
    }
}
