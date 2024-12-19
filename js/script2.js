
var cardContainer = document.getElementsByClassName('flex_container');
const limit=10;

fetch(`https://dummyjson.com/products?limit=${limit}`)
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta de la API", data);
        if (data.products.length > 0) {
            data.products.forEach((photo) => {
                
                const randomPrice = Math.floor(Math.random() * 900) + 100; // Precio aleatorio
                
                var cardDiv = document.createElement('div');
                cardDiv.innerHTML = `
                    <div class="card item_flex" style="width: 15rem">
                        <img src="${photo.thumbnail}" class="card-img-top" alt="${photo.title}">
                        <div class="card-body">
                            <h5 class="card-title">${photo.title}</h5>
                            <p class="card-text" style="font-size: 15px;">Descripcion: ${photo.category}</p>
                            <p class="card-text">Precio: $${randomPrice}</p> 
                            <button class="btn btn-success">Agregar al Carrito</button>   
                        </div>    
                    </div>
                `;

                
                cardContainer[0].appendChild(cardDiv); //Card al contenedor

                var addButton = cardDiv.querySelector('button');
                addButton.addEventListener("click", () => {
                    let q=prompt("Ingrese la cantidad a comprar de este producto");
                    if (!isNaN(q) && q !== null && q.trim() !== "" && Number(q) > 0) {
                        q = Number(q);
                    addToCart(photo, randomPrice,q);
                    } else {
                        alert('Cantidad invalilda, ingresa nuevamente');
                    }
                });

                function addToCart(photo, randomPrice, q) {
                    let vagon = JSON.parse(localStorage.getItem("vagon")) || [];
                    let price = JSON.parse(localStorage.getItem("price")) || [];
                    let cant = JSON.parse(localStorage.getItem("cant")) || [];
                    vagon.push(photo);
                    price.push(randomPrice);
                    cant.push(q)
                    localStorage.setItem("vagon", JSON.stringify(vagon));
                    localStorage.setItem("price", JSON.stringify(price));
                    localStorage.setItem("cant", JSON.stringify(cant));
                    alert(`${photo.title} ha sido agregado al Carro de compra con precio unitario: $${randomPrice}.`);
                };
            });
        } else {
            console.log("No se encontraron imágenes.");
        };
        }
    )
    .catch(error => console.error("Error en la solicitud:", error));




