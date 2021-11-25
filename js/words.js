function obtenerPalabras() {
  const $cards = document.getElementById("cards-words");
  const formdata = new FormData();
  formdata.append("idUser", user_id);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch("./apis/obtenerPalabras.php", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      result.forEach((element) => {
        if (element.aprendida == 0) {
          const $contenedor = document.createElement("div");
          $contenedor.innerHTML = `
        <div class="card shadow border-start-primary py-2 ">
            <div class="card-body">
                <div class="row align-items-center no-gutters">
                    <div class="col me-2">
                        <div class="text-uppercase text-primary fw-bold text-md mb-1" data-word="${element.word_id}" data-eng="${element.word}" ><span class= "card-title">${element.word}</span></div>
                        
                        <div class="text-uppercase text-primary fw-bold text-md mb-1 censura" data-esp="${element.esp}" ><span class="censura" data-esp="${element.esp}">Clic para ver</span></div>
                        
                        <div class="text-dark fw-bold h5 listen-word" data-eng="${element.word}" ><i class="fas fa-headphones p-2 pb-0  listen-word" data-eng="${element.word}"></i><span class="listen-word" data-eng="${element.word}">Escuchar</span></div>
                    </div>
                    <div class="col-auto"><i class="far fa-check-square fa-3x text-gray-300 revisar" data-word="${element.word_id}" role="button"></i></div>
                </div>
            </div>
        </div>
    

        `;
          $contenedor.classList.add("col-md-6", "col-xl-3", "col-xl-4","card-lectura", "mb-5", `word-${element.word_id}`);

          $cards.appendChild($contenedor);
        }
      });
    })
    .catch((error) => console.log("error", error));

  escuchar();
}
obtenerPalabras();

function escuchar() {
  document.addEventListener("click", (e) => {
    console.log(e.target);

    if (e.target.classList.contains("listen-word")) {
      const palabraTraduccion = new SpeechSynthesisUtterance();
      const speech = window.speechSynthesis;
      palabraTraduccion.lang = "en-US";
      palabraTraduccion.text = e.target.dataset.eng;
      speech.speak(palabraTraduccion);
    } else if (e.target.classList.contains("censura")) {
      e.target.textContent = e.target.dataset.esp;
      console.log(e.target.dataset.esp);
    } else if (e.target.classList.contains("revisar")) {

      const formdata = new FormData();
      formdata.append("idWord", e.target.dataset.word);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch("http://localhost:3000/apis/aprenderPalabra.php", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if(result.success == 1){
                $eliminarDiv =document.querySelector(`div .word-${e.target.dataset.word}`);
                $eliminarDiv.style.display="none";


            }
        })
        .catch((error) => console.log("error", error));
    }
  });
}



document.addEventListener("DOMContentLoaded",()=>{
  const $input = document.getElementById("button-search");
  $input.addEventListener("keyup", ()=>{
    $tarjetas = document.querySelectorAll(".card-lectura");

    $tarjetas.forEach($t=>{
      const $titulo = $t.querySelector(".card-title").textContent;
      if(!$titulo.toLowerCase().match($input.value.toLowerCase()) ){
        $t.setAttribute("hidden", "")
      }else if($titulo.toLowerCase().match($input.value.toLowerCase())){
        $t.removeAttribute("hidden");
     }
    if($input.value==""){
      $t.removeAttribute("hidden");
    }   
    })
  })
})
// console.log(e.target.dataset.eng)
// const palabraTraduccion = new SpeechSynthesisUtterance();
// const speech = window.speechSynthesis;
// palabraTraduccion.lang = "en-US";
// palabraTraduccion.text = e.target.dataset.eng;
// speech.speak(palabraTraduccion);
