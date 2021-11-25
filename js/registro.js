$buttonRegistro = document.getElementById("button-registro")


 function apiRegistro(name, email, password, $registerError){

    var exito = false;
    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("name", name);
    formdata.append("password", password);

    let requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("./apis/registro.php", requestOptions)
    .then(response => response.json())
    .then(result =>{
      if(result.success == 0){
        $registerError.style.display="block";
        $registerError.innerHTML = result.message;
      }else{
        window.location.href = "login.html";
      }  
      
    })
  .catch(error => console.log('error', error)); 

return exito;
}



$buttonRegistro.addEventListener("click",(e)=>{
    e.preventDefault();
   const $name = document.getElementById("exampleInputName").value.trim(),
    $email = document.getElementById("exampleInputEmail").value.trim(),
    $password =  document.getElementById("exampleInputPassword").value.trim(),
   $registerError = document.getElementById("register-error");

   if($name.trim == "" || $email =="" || $password ==""){
       console.log("Llena todos los campos requeridos")
   }else{
        apiRegistro($name, $email,$password,$registerError);

      
            

   }

})


