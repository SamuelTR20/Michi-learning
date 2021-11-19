$buttonLogin = document.getElementById("button-login")


async function apiRegistro( email, password, $loginError){

 
    let formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    let requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("./apis/login.php", requestOptions)
    .then(response => response.json())
    .then(result =>{

      if(result.success==0){
        $loginError.style.display="block";
        
      }else{

        //create a session
        sessionStorage.setItem("user_id", result.user);
        sessionStorage.setItem("user_name", result.name);
        window.location.href = "base.html";

      }


    })
  .catch(error => console.log('error', error)); 


}



$buttonLogin.addEventListener("click",(e)=>{
    e.preventDefault();
   const $email = document.getElementById("exampleInputEmail").value.trim(),
    $password =  document.getElementById("exampleInputPassword").value.trim(),
    $loginError = document.getElementById("login-error");

   if($email =="" || $password ==""){
       console.log("Llena todos los campos requeridos")
   }else{
        apiRegistro($email,$password, $loginError);

   }

})