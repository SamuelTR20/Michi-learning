function fetchGET(){
    async function getData(){

        $cards = document.getElementById("Tarjetas")
        try{
            let res = await fetch("./apis/lecturas.php");
            let json = await res.json();

            // if(!res.ok) throw new Error("ocurrio un error al solicitar los datos")
            if(!res.ok) throw {status: res.status, statusText: res.message}
            
            json.forEach(element => {

               
                const $contenedor = document.createElement("div");
                 $contenedor.innerHTML=`
                 <div class="card">
                   <img src=${element.image} class="card-img-top" alt="..."/>
                   <div class="card-body">
                     <h5 class="card-title">${element.title}</h5>
                     <p class="card-text">${element.sinopsis}</p>
                     <a href="lectura.html?id=${element.id}" class="btn btn-primary btn-leer">Leer libro</a>
                   </div>
                 </div>
                 `;
             $contenedor.classList.add("col-lg-4");
    
            $cards.appendChild($contenedor);


             });
         
            
           
        }catch(err){
         let message = res.status || "Ocurrió un error";
          console.log (`Error ${err.status}: ${message}`)

        }finally{

        }
    
    }

    getData();
}

fetchGET();

