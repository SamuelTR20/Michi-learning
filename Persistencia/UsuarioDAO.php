<?php

function agregarUsuario($name, $email, $contrasenia){
    include_once("Conexion.php");

    $conexion= conexion();
    $consulta = sprintf(
        "INSERT INTO user (name, email, passsword) VALUES ( '%s', '%s',  aes_encrypt('%s', 'key'))",
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
    "SELECT id, name, email, passsword FROM user WHERE email = '%s' AND aes_decrypt(password, 'key') = '%s'",
    mysqli_real_escape_string($conexion, trim($email)),
    mysqli_real_escape_string($conexion, trim($contrasenia))
  );

  $resultado = mysqli_query($conexion, $consulta) or trigger_error("El login de usuario falló");

  
  if (mysqli_num_rows($resultado) == 1) {

    $permitido = true;
    $conexion->close();
    return $permitido;

  } else {
    $conexion->close();
    return $permitido;
  }
   
}
?>