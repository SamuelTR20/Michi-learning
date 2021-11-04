<?php
function obtenerLecturas(){
    include_once("Conexion.php");

    $conexion = conexion();
    $consulta = "SELECT * FROM reading";
    $resultado = mysqli_query($conexion, $consulta);
    $lecturas = array();
    while($lectura = mysqli_fetch_assoc($resultado)){
        $lecturas[] = $lectura;
    }
    $conexion->close();;
    // echo json_encode($lecturas);
    return $lecturas;


}


function obtenerLectura($idLectura){
    include_once("Conexion.php");

    $conexion = conexion();
    $consulta = sprintf(
        "SELECT * FROM reading WHERE id = '%s' ",
        mysqli_real_escape_string($conexion, trim($idLectura))
        
      );
    $resultado = mysqli_query($conexion, $consulta);
    if (mysqli_num_rows($resultado) == 1) {
        $lectura = mysqli_fetch_assoc($resultado);
    }else{
        $lectura = null;
    }
    $conexion->close();
    // echo json_encode($lecturas);
    return $lectura;


}
?>