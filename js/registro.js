$buttonRegistro = document.getElementById("button-registro")


async function apiRegistro(name, email, password){

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

    fetch("http://localhost:3000/apis/registro.php", requestOptions)
    .then(response => response.json())
    .then(result =>{
      exito =  await true;
      console.log("si entra")
    })
  .catch(error => console.log('error', error)); 

return exito;
}



$buttonRegistro.addEventListener("click",(e)=>{
    e.preventDefault();
   const $name = document.getElementById("exampleInputName").value.trim();
   const $email = document.getElementById("exampleInputEmail").value.trim();
   const $password =  document.getElementById("exampleInputPassword").value.trim();

   if($name.trim == "" || $email =="" || $password ==""){
       console.log("Llena todos los campos requeridos")
   }else{
       let registro = apiRegistro($name, $email,$password);

       if(!registro){
           console.log("ALGO TA MAL AQUI")
       }else{
           console.log("TA BIEN")
       }
            

   }

})


