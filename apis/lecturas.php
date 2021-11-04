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

if($_SERVER["REQUEST_METHOD"] != "GET"){
    $returnData = msg(0,404,'Pagina no encontrada');

}else{
        

        include $_SERVER["DOCUMENT_ROOT"]."/Persistencia/LecturaDAO.php";
        $lecturas = obtenerLecturas();
        
        header("HTTP/1.1 200 OK");
        echo json_encode($lecturas);
        exit();

    }
    
    echo json_encode($returnData);  
    ?>