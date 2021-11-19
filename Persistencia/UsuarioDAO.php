<?php

function agregarUsuario($name, $email, $contrasenia){
    include_once("Conexion.php");

    $conexion= conexion();
    // get highest id in the table user
    $sql = "SELECT MAX(id) FROM user";

    $id = mysqli_query($conexion, $sql) or trigger_error("La inserción de usuarios falló");
    
    $id = mysqli_fetch_array($id);
    $id = $id[0];
    $id = $id + 1;

 
    $consulta = sprintf(
        "INSERT INTO user (id, name, email, password) VALUES ($id, '%s', '%s',  aes_encrypt('%s', 'key'))",
        mysqli_real_escape_string($conexion, trim($name)),
        mysqli_real_escape_string($conexion, trim($email)),
        mysqli_real_escape_string($conexion, trim($contrasenia)),
      
      );
    $resultado = mysqli_query($conexion, $consulta) or trigger_error("La inserción de usuarios falló");

    if ($resultado) {
    $conexion->close();
    return true;
    } else {
    $conexion->close();
    return false;
  }
}

function iniciarSesion($email, $contrasenia){
    include_once("Conexion.php");

    $conexion= conexion();
    $permitido = false;

  $consulta = sprintf(
    "SELECT id, name, email, password FROM user WHERE email = '%s' AND aes_decrypt(password, 'key') = '%s'",
    mysqli_real_escape_string($conexion, trim($email)),
    mysqli_real_escape_string($conexion, trim($contrasenia))
  );

  $resultado = mysqli_query($conexion, $consulta) or trigger_error("El login de usuario falló");

  
  if (mysqli_num_rows($resultado) == 1) {

    $usuario = $resultado->fetch_assoc();
    $conexion->close();
    return $usuario;

  } else {
    $conexion->close();
    return $permitido;
  }
   
}
?>