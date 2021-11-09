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
    if(!isset($data["email"]) 
    || !isset($data["password"])
    || empty(trim($data["email"]))
    || empty(trim($data["password"]))
    ){
        $returnData = msg(0,400,'Por favor ingrese todos los campos');
    }else{

    
    include $_SERVER["DOCUMENT_ROOT"]."/Persistencia/UsuarioDAO.php";
    $iniciar = iniciarSesion($_POST["email"],$_POST["password"]);
        
        if ($iniciar == null){
            $returnData = msg(0,404,'No se encontro usuario');
            echo json_encode($returnData);
            return false;
        }
        $returnData = [
            'success' => 1,
            'message' => 'Se ha logueado con exito'
        ];
        header("HTTP/1.1 200 OK");
        echo json_encode($returnData);
        exit();
    }
}

echo json_encode($returnData);  

?>