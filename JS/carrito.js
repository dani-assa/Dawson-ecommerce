import navbar from "../Components/navbar.js";
import footer1 from "../Components/footer.js";

document.addEventListener('DOMContentLoaded', () => 
navbar (),
footer1());

let productEnCarrito = localStorage.getItem('productosEnCarrito');
productEnCarrito = JSON.parse(productEnCarrito);
const carritoVacio = document.querySelector('.carritoVacio');
const contenedorCarritoProductos = document.querySelector('.carritoProductos');
const contenedorCarritoAcciones = document.querySelector('.carritoAcciones');
let btnEliminarProd = document.querySelector('.btnEliminarProd');
const btnVaciarCarrito = document.querySelector('#vaciarCarrito');
const total = document.querySelector('#total');


function cargarProductosCarritos() {
  if (productEnCarrito && productEnCarrito.length > 0) {
    carritoVacio.classList.add('d-none');
  
    contenedorCarritoProductos.innerHTML = '';
  
    productEnCarrito.forEach(product => {
      const cardCarrito = document.createElement('div');
      cardCarrito.classList = 'card d-flex flex-row justify-content-between';
      cardCarrito.innerHTML = `
          <img src="${product.photo}" alt="${product.name}" style="width: 100px;">
          <div class="carritoProductoTitulo">
            <small>Título</small>
            <h4>${product.name}</h4>
          </div>
          <div class="carritoProductoCantidad">
            <small>Cantidad</small>
            <h4>${product.cantidad}</h4>
          </div>
          <div class="carritoProductoPrecio">
            <small>Precio</small>
            <h4>${product.price}</h4>
          </div>
          <div class="carritoProductoSubtotal">
            <small>Subtotal</small>
            <h4>${product.cantidad * product.price} </h4>
          </div>
          <a class="btnEliminarProd" id="${product.id}"><i class="bi bi-trash-fill"></i></a>
      `;
  
      contenedorCarritoProductos.appendChild(cardCarrito);
    });
  } else {
    carritoVacio.classList.remove('d-none');
    contenedorCarritoProductos.classList.add('d-none');
    contenedorCarritoAcciones.classList.add('d-none');

  };
  actualizaBtnEliminar();
};

cargarProductosCarritos();
actualizarTotal();

function actualizaBtnEliminar() {
  btnEliminarProd = document.querySelectorAll('.btnEliminarProd');

  btnEliminarProd.forEach(btn =>{
    btn.addEventListener('click', eliminarDelCarrito);
  })
};

function eliminarDelCarrito(e) {
  const idBtn = e.currentTarget.id;
  const index = productEnCarrito.findIndex(product => product.id == idBtn);

  productEnCarrito.splice(index, 1);
  cargarProductosCarritos();
  actualizarTotal();

  localStorage.setItem('productosEnCarrito', JSON.stringify(productEnCarrito));
};

btnVaciarCarrito.addEventListener('click', vaciarCarrito);
function vaciarCarrito() {
  productEnCarrito.length = 0;
  localStorage.setItem('productosEnCarrito', JSON.stringify(productEnCarrito));
  cargarProductosCarritos();
  actualizarTotal();
};

function actualizarTotal() {
  const totalCalculado = productEnCarrito.reduce((acc, product) => acc + (product.price * product.cantidad), 0); 
  total.innerText = `${totalCalculado}`;
};
