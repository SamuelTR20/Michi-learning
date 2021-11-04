<?php



// Creamos la conexión
function conexion(){
$servidor = "localhost"; 
$baseDatos = "michilearningdb";
$usuarioBd = "root";
$passwordBd = "papa";
$connLocalhost = mysqli_connect($servidor, $usuarioBd, $passwordBd) or die(mysqli_error($connLocalhost));




// Definimos el cotejamiento para la conexion (igual al cotejamiento de la BD)
mysqli_query($connLocalhost, "SET NAMES 'utf8'");

// Seleccionamos la base de datos por defecto para el proyecto
mysqli_select_db($connLocalhost, $baseDatos);
return $connLocalhost;
}
?>