function obtenerPalabras(){
const $cards = document.getElementById("cards-words");
const formdata = new FormData();
formdata.append("idUser", user_id);

const requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("./apis/obtenerPalabras.php", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    result.forEach(element => {
        

        const $contenedor = document.createElement("div");
        $contenedor.innerHTML=`
        <div class="card shadow border-start-primary py-2">
            <div class="card-body">
                <div class="row align-items-center no-gutters">
                    <div class="col me-2">
                        <div class="text-uppercase text-primary fw-bold text-md mb-1"><span>${element.word}</span></div>
                        
                        <div class="text-uppercase text-primary fw-bold text-md mb-1 censura"><span>Click para ver</span></div>
                        
                        <div class="text-dark fw-bold h5"><i class="fas fa-headphones p-2 pb-0"></i><span>Escuchar</span></div>
                    </div>
                    <div class="col-auto"><i class="far fa-check-square fa-2x text-gray-300 revisar" role="button"></i></div>
                </div>
            </div>
        </div>
    

        `;
    $contenedor.classList.add("col-md-6", "col-xl-3","col-xl-4","mb-5");
    $contenedor.setAttribute("id",`word-${element.word_id}`)

   $cards.appendChild($contenedor);



    });
  }
  
  
  )
  .catch(error => console.log('error', error));
}
obtenerPalabras()