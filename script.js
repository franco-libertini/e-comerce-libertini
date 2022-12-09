

//PRODUCTOS

let products = [];

let getProduct = async () => {
  try {
    let response = await fetch('https://fakestoreapi.com/products')
    let data = await response.json();
    showProducts(data);
    products.push(...data);

    let btnCompra = document.querySelectorAll(".botonCompra");

    for (let boton of btnCompra) {
      boton.addEventListener("click", addCart);
    }
  } 
  catch (error) {
    console.log(error)
  }
}
getProduct();



//formato items

let cards = document.getElementById("cardsContainer");

function showProducts(products) {

  cards.innerHTML = "";

  products.forEach(element => {
    cards.innerHTML += `
    <div class="col">
      <div class="card text-bg-light border-dark h-100">
        <img src="${element.image}"style="height:250px;" class="card-img-top" alt="${element.description}">
        <div class="card-body ">
          <h3>${element.price}$</h3>
          <h4 class="card-title">${element.title}</h4>
          <button class="btn btn-primary botonCompra">Agregar al carrito</button>
        </div>
      </div>
    </div>
    `;
  });
}

showProducts(products);


//agregar carrito

let carrito = [];

function addCart(e) {
  let hijo = e.target;
  let padre = hijo.parentNode;
  let abuelo = padre.parentNode;

  let nombreProducto = padre.querySelector("h4").textContent;

  let precio = padre.querySelector("h3").textContent;

  let img = abuelo.querySelector("img").src;

  let producto = {
    nombre: nombreProducto,
    img: img,
    precio: precio
    
  };
  let fila = document.createElement("tr");
    
  fila.innerHTML = `
  
  <tr scope="row">
  <th scope="col">Precio:</th>
  <td class="test">${producto.precio}</td>
  <th scope="col">Producto:</th>
  <td>${producto.nombre}</td>
  <th scope="col"></th>
  </tr> 
  <td><button class="btn-danger borrarElemento">Borrar</button></td>
  `;
  let tabla = document.getElementById("tbody");
  tabla.append(fila);
  carrito.push(producto);

  let arregloJSON = JSON.stringify(carrito);
  localStorage.setItem("carrito", arregloJSON);

  Toastify({
    text: "item agregado",
    duration: 300,
  }).showToast();

  // carrito display y borrar

}

function mostrarCarrito() {
  console.log(carrito)
  
  let botonesBorrar = document.querySelectorAll(".borrarElemento");
  
  for (let boton of botonesBorrar) {
    boton.addEventListener("click", borrarProducto);
  }
  
}

let icon = document.querySelector("#iconCart");
icon.addEventListener("click", mostrarCarrito,);

function borrarProducto(e) {
  let abuelo = e.target.parentNode.parentNode;

  abuelo.remove();

  // carrito.pop();  
  

  
  Toastify({
    text: "Producto eliminado",
    duration: 700,
    
  }).showToast();
}


// checkout

let botoncheckout = document.getElementById("checkout");

function checkoutoperacion(){
  const suma=carrito.reduce((prevval,currenval)=>{
    return (Number.parseInt(prevval))+(Number.parseInt(currenval.precio))
  },0);
  const preciotot=suma;


  Swal.fire({
    title: 'seguro?',
    text: ('su total es:'+" "+suma+" "+'$'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'si ,comprar!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'carrito comprado!',
        console.log('$'+preciotot)
      )
      setTimeout(function(){
        window.location.reload();
     }, 1500);
    }
  })
return
}


checkout.addEventListener("click", checkoutoperacion);



//buscador
let search = document.querySelector("#input");

search.addEventListener("keyup", (e) => {

  const input = e.target.value.toLowerCase()

  let productFilter = products.filter(product => product.title.toLowerCase().includes(input)) || (product => product.category.toLowerCase().includes(input));

  console.log(productFilter);
  console.log("input", input);

  showProducts(productFilter);
})



// filtros

 let women = document.querySelector(".women");
 women.addEventListener("click", (e) => {
   e.preventDefault()

   let productFilter = products.filter(product => product.category === "women's clothing")

   showProducts(productFilter);
 }
 )

 let mens = document.querySelector(".men");
 mens.addEventListener("click", (e) => {
   e.preventDefault()

   let productFilter = products.filter(product => product.category === "men's clothing")

   showProducts(productFilter);
 }
 )

 let tech = document.querySelector(".tech");
 tech.addEventListener("click", (e) => {
   e.preventDefault()

   let productFilter = products.filter(product => product.category === "electronics")

   showProducts(productFilter);
 }
 )

 let jewelery = document.querySelector(".jewelery");
 jewelery.addEventListener("click", (e) => {
   e.preventDefault()

   let productFilter = products.filter(product => product.category === "jewelery")

   showProducts(productFilter);
 }
 )
