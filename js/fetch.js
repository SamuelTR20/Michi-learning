function fetchGET(){
    async function getData(){

        $cards = document.getElementById("Tarjetas")
        try{
            let res = await fetch("./apis/lecturas.php");
            let json = await res.json();

            // if(!res.ok) throw new Error("ocurrio un error al solicitar los datos")
            if(!res.ok) throw {status: res.status, statusText: res.message}
            
            json.forEach(element => {

                if(element.sinopsis.length > 150) element.sinopsis = element.sinopsis.substring(0,150) + "...";
                const $contenedor = document.createElement("div");
                 $contenedor.innerHTML=`
                 <div class="card">
                   <img src=${element.image} class="card-img-top" alt="..." style="height: 525px"/>
                   <div class="card-body">
                     <h5 class="card-title text-dark"><strong>${element.title}</strong></h5>
                     <p class="card-text text-dark">${element.sinopsis}</p>
                     <a href="lectura.html?id=${element.id}" class="btn btn-primary btn-leer float-end">Leer libro</a>
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


