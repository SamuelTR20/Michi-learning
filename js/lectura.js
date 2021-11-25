async function fetchGET() {
  const valores = window.location.search;
  const urlParams = new URLSearchParams(valores);
  const id = urlParams.get("id");
  let resultados;

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  await fetch(`./apis/lectura.php?id=${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      resultados = result;

      $cards = document.getElementById("body-lectura");
      const $contenedor = document.createElement("div");
      $contenedor.innerHTML = `
            <img src="${result.image}" alt="" class="img-fluid  col-md-8  p-5" style="width: 60%;">
            <div id="all-data" class="item-lectura p-5 col-xs-12 pt-9 card">
              
              <div class="sound text-left"><i class="fas fa-volume-up " id="listen-button"></i></div>
             <div class="iconos mb-2"> <i class="fas fa-hand-point-up"></i><span>Da clic</span>
              <i class="fas fa-headphones-alt"></i><span>Escucha</span>
              <i class="fab fa-leanpub"></i><span>Aprende</span></div>
           
            
            <h1 class="mb-5"><i>${result.title}</i></h1>
             <p class="pb-5 text-dark" id="lectura-texto">${result.body}</p>
            `;
      $contenedor.classList.add(
        "col-auto",
        "col-xs-12",
        "p-5",
        "text-center",
        "p-3"
      );

      $cards.appendChild($contenedor);

      listen();
      dividirPalabras();
    })
    .catch((error) => console.log("error", error));
}

fetchGET();

function listen() {
  const $botonEscuchar = document.getElementById("listen-button"),
    $texto = document.getElementById("lectura-texto").textContent;

  const mensaje = new SpeechSynthesisUtterance();

  $botonEscuchar.addEventListener("click", () => {
    const speech = window.speechSynthesis;

    $botonEscuchar.classList.toggle("volume-active");
   

    if ($botonEscuchar.classList.contains("volume-active")) {
      mensaje.lang = "en-US";

      mensaje.text = $texto;
      speech.speak(mensaje);
    } else {
      speech.cancel();
    }
  });
}

function dividirPalabras() {
  const $divPalabras = document.getElementById("lectura-texto");

  $divPalabras.addEventListener("mouseover", () => {
    if (!$divPalabras.classList.contains("palabras-divididas")) {
      $divPalabras.classList.add("palabras-divididas");
     
      palabras = $divPalabras.textContent.split(" ");
      $divPalabras.textContent = "";
      palabras.forEach((palabra) => {
        $palabra = document.createElement("span");

        $palabra.textContent = palabra;
        $divPalabras.appendChild($palabra);
        espacio = document.createTextNode(" ");
        $divPalabras.appendChild(espacio);
      });

      seleccionarPalabra();
    }
  });
}

function seleccionarPalabra() {
  const $divPalabras = document.getElementById("lectura-texto");

  $divPalabras.addEventListener("click", (e) => {
    if (e.target.tagName == "SPAN") {
      //Imprime en consola palabra que le diste clic
      console.log(e.target.textContent);
      word = e.target.textContent
      async function request() {
        const dataRequest = {};
        let response = await fetch(
          `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20211115T234516Z.538c8dcd0d7bf036.20c785ca3b58f4c6e85e29fae9465c53067ae760&lang=en-es&text=${word}`,
          dataRequest
        );

        let data = await response.json();
        
        palabra = data.text[0]
       

        //Aqui abrir el pop up
        //create a div
      
        const $div = document.createElement("div");

        let popupAbierto = true;
        $div.classList.add("popup");
        $div.setAttribute("id","pop-up-word")
        $div.innerHTML = `<i id="listen-word" class="fas fa-headphones-alt oido" ></i> <i id="save-book" class="far fa-save libro"> </i> <i class="fas fa-times cerrar"></i> <p id="palabraTraducida"> ${palabra} </p>`;
        $div.style.position = "absolute";
        $div.style.top = (e.pageY - 90) + "px";
        $div.style.left = (e.pageX - 100)   + "px";
        // $div.style.zIndex = "1";
        $div.style.boxShadow = "0px 0px 5px black";
        $div.style.fontSize = "20px";
        $div.style.fontWeight = "bold";
        
        const $currentDiv = document.getElementById("page-top");
        $currentDiv.appendChild($div)
        // Escuchar palabra seleccionada
        $escucharPalabra= document.getElementById("listen-word");
        $escucharPalabra.addEventListener("click",(e)=>{
        

          const palabraTraduccion = new SpeechSynthesisUtterance();
          const speech = window.speechSynthesis;
          palabraTraduccion.lang = "en-US";
          palabraTraduccion.text = word;
          speech.speak(palabraTraduccion);


        })


        $guardarPalabra= document.getElementById("save-book");

        $guardarPalabra.addEventListener("click",(e)=>{
        

          
          async function guardar() {
            let formdata = new FormData();
            formdata.append("user", user_id);
            formdata.append("word", word);

            let requestOptions = {
                method: 'POST',
                body: formdata,
            };
            let response = await fetch(
              `./apis/guardarPalabra.php`,
              requestOptions
            );

           if (response.ok) {
            $guardarPalabra.classList.remove("fa-save") 
            $guardarPalabra.classList.add("fa-check-circle");
            $guardarPalabra.style.color = "#0DC143";

            

            }
          
          }

          guardar();
        })



        $buttonCerrar = document.querySelector(".cerrar");
        $buttonGuardar = document.getElementById("save-book");
        $palabraTraducida = document.getElementById("palabraTraducida")
        document.addEventListener("click",(clickE)=>{
        
        if(clickE.target != $div && popupAbierto && clickE.target != $escucharPalabra && $buttonGuardar != clickE.target && clickE.target != $palabraTraducida){
          console.log(clickE.target)
          popupAbierto = false
          $currentDiv.removeChild($div)
        }
        
         
        })
        

        //Aqui cerrar el pop up

      }

      request();

      
      
    }
  });
}
