<?php 
function obtenerPalabras($idUsuario){
  include_once("Conexion.php");

  $conexion = conexion();
  $consulta =  sprintf("SELECT  DISTINCTROW word.id as word_id, word.learned as aprendida, word.word as word, 
  userword.id_user as usuario, userword.id_words from word as word join userword as userword on userword.id_user = '%d' and word.id = userword.id_words",
  mysqli_real_escape_string($conexion, $idUsuario));
  $resultado = mysqli_query($conexion, $consulta);
  $palabras = array();
  while($palabra = mysqli_fetch_assoc($resultado)){
      $palabras[] = $palabra;
  }
  $conexion->close();
  // echo json_encode($lecturas);
  return $palabras;


}

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

function agregarPalabra($word,$esp){


    include_once("Conexion.php");

    $conexion= conexion();

    $sql = "SELECT MAX(id) FROM word";

    $id = mysqli_query($conexion, $sql) or trigger_error("La inserción de usuarios falló");
    
    $id = mysqli_fetch_array($id);
    $id = $id[0];
    $id = $id + 1;

  
  
    $consulta = sprintf(
        "INSERT INTO word (id, word, learned, esp) VALUES ($id, '%s', 0, '%s')",
        mysqli_real_escape_string($conexion, trim($word)),
        mysqli_real_escape_string($conexion, trim($esp))
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




// final class ServerLogger {

//   /**
//    * send a log message to the STDOUT stream.
//    *
//    * @param array<int, mixed> $args
//    *
//    * @return void
//    */
//   public static function log(...$args): void {
//       foreach ($args as $arg) {
//           if (is_object($arg) || is_array($arg) || is_resource($arg)) {
//               $output = print_r($arg, true);
//           } else {
//               $output = (string) $arg;
//           }

//           fwrite(STDOUT, $output . "\n");
//        }
//   }
// }