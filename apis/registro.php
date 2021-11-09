<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
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
    || !isset($data["name"])
    || empty(trim($data["email"]))
    || empty(trim($data["name"]))
    || empty(trim($data["password"]))
    ){

        $fields = ['fields' => ['email','password', 'name']];
        $returnData = msg(0,422,'Por favor llene todos los recuadros',$fields);
    }else{

        include $_SERVER["DOCUMENT_ROOT"]."/Persistencia/UsuarioDAO.php";
        $registro = agregarUsuario($_POST["name"],$_POST["email"],$_POST["password"]);
        
        if ($registro == null){
            $returnData = msg(0,404,'No se registro correctamente');
            echo json_encode($returnData);
            return false;
        }else{
            $returnData = [
                'success' => 1,
                'message' => 'Se ha registrado con exito'
            ];
            header("HTTP/1.1 200 OK");
            echo json_encode($returnData);
        }

        
        exit();
    }
    }

    echo json_encode($returnData);  
    
    ?>