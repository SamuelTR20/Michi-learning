<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
}

if($_SERVER["REQUEST_METHOD"] != "POST"){
    $returnData = msg(0,404,'Pagina no encontrada');

}else{
    $data = $_POST;
    if(!isset($data["idUser"]) 
    || empty(trim($data["idUser"]))
    ){
        $returnData = msg(0,400,'Por favor ingrese todos los campos');
    }else{

    
    include $_SERVER["DOCUMENT_ROOT"]."/Persistencia/Palabra.php";
    $palabras = obtenerPalabras($_POST["idUser"]);
        
        if ($palabras == null){
            $returnData = msg(0,404,'No se encontraron lecturas');
            echo json_encode($returnData);
            return false;
        }
        header("HTTP/1.1 200 OK");
        echo json_encode($palabras);
        exit();
    }
}

echo json_encode($returnData);  

?>