<?php 
function agregarPalabraUsuario($idUser){
    include_once("Conexion.php");

    $conexion= conexion();


    $sql = "SELECT MAX(id) FROM word";

    $id = mysqli_query($conexion, $sql) or trigger_error("No se encontraron palabras");
    
    $id = mysqli_fetch_array($id);
    $id = $id[0];

    
  
    $sqluserword = "SELECT MAX(id) FROM userword";
    $idUserWord = mysqli_query($conexion, $sqluserword) or trigger_error("La inserción de usuarios falló");
    
    $idUserWord = mysqli_fetch_array($idUserWord);
    $idUserWord = $idUserWord[0];
    $idUserWord = $idUserWord + 1;



    $consulta = sprintf(
        "INSERT INTO userword (id, id_user, id_words) VALUES ($idUserWord, '%d', $id)",
        mysqli_real_escape_string($conexion, trim($idUser))
      );
    $resultado = mysqli_query($conexion, $consulta) or trigger_error("La inserción de palaba fallo falló");

    if ($resultado) {
    $conexion->close();
    return true;
    } else {
    $conexion->close();
    return false;
  }
}

function agregarPalabra($word){
    include_once("Conexion.php");

    $conexion= conexion();

    $sql = "SELECT MAX(id) FROM word";

    $id = mysqli_query($conexion, $sql) or trigger_error("La inserción de usuarios falló");
    
    $id = mysqli_fetch_array($id);
    $id = $id[0];
    $id = $id + 1;

  
  
    $consulta = sprintf(
        "INSERT INTO word (id, word, learned) VALUES ($id, '%s', 'false')",
        mysqli_real_escape_string($conexion, trim($word))
      );
    $resultado = mysqli_query($conexion, $consulta) or trigger_error("La inserción de palaba fallo falló");

    if ($resultado) {
    $conexion->close();
    return true;
    } else {
    $conexion->close();
    return false;
  }
}