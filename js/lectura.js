async function fetchGET(){

    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    const id = urlParams.get('id');
    let resultados;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    await fetch(`./apis/lectura.php?id=${id}`, requestOptions)
        .then(response => response.json())
        .then(result =>{ 
            resultados = result


            $cards = document.getElementById("body-lectura")
            const $contenedor = document.createElement("div");
            $contenedor.innerHTML=`
            <img src="${result.image}" alt="" class="img-fluid  col-md-8  p-5" style="width: 60%;">
            <div class="item-lectura p-5 col-xs-12 pt-9 card">
              
              <div class="sound text-left"><i class="fas fa-volume-up " id="listen-button"></i></div>
             <div class="iconos mb-2"> <i class="fas fa-hand-point-up"></i><span>Da clic</span>
              <i class="fas fa-headphones-alt"></i><span>Escucha</span>
              <i class="fab fa-leanpub"></i><span>Aprende</span></div>
           
            
            <h1 class="mb-5"><i>${result.title}</i></h1>
            <p class="pb-5 text-dark" id="lectura-texto">${result.body}</p>  
            `;
              $contenedor.classList.add("col-auto","col-xs-12", "p-5", "text-center","p-3");

             $cards.appendChild($contenedor);

            listen()


        })
        .catch(error => console.log('error', error));

        

        
}

fetchGET();


function listen(){

 const $botonEscuchar = document.getElementById("listen-button"),
 $texto = document.getElementById("lectura-texto").textContent ;
    
 const mensaje = new SpeechSynthesisUtterance();
 
 $botonEscuchar.addEventListener("click",()=>{
  const speech = window.speechSynthesis;
  
   $botonEscuchar.classList.toggle("volume-active");
  console.log($botonEscuchar)

    if($botonEscuchar.classList.contains( 'volume-active' )){
 
      
      console.log("Entra aqui")
    mensaje.lang ="en-US";
  
    mensaje.text = $texto;
    speech.speak(mensaje);
  
  }else{
    speech.pause()
  }
 })




}

