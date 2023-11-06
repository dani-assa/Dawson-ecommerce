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
const contenedorTotal = document.querySelector('.carritoTotal');


function cargarProductosCarritos() {
  if (productEnCarrito && productEnCarrito.length > 0) {
    carritoVacio.classList.add('d-none');
  
    contenedorCarritoProductos.innerHTML = '';
  
    productEnCarrito.forEach(product => {
      const cardCarrito = document.createElement('div');
      cardCarrito.classList = 'card d-flex flex-row justify-content-between align-items-center border border-4 mt-2 rounded';
      cardCarrito.innerHTML = `
          <img src="${product.photo}" alt="${product.name}" style="width: 100px;">
          <div class="carritoProductoTitulo col-2">
            <small>Título</small>
            <h6>${product.name}</h6>
          </div>
          <div class="carritoProductoCantidad col-2">
            <small>Cantidad</small>
            <h6>${product.cantidad}</h6>
          </div>
          <div class="carritoProductoPrecio col-2">
            <small>Precio</small>
            <h6>$${product.price}</h6>
          </div>
          <div class="carritoProductoSubtotal col-2">
            <small>Subtotal</small>
            <h6>$${product.cantidad * product.price} </h6>
          </div>
          <a class="btnEliminarProd mb-auto mt-auto" id="${product.id}"><i class="bi bi-trash-fill"></i></a>
      `;
  
      contenedorCarritoProductos.appendChild(cardCarrito);
    });
  } else {
    carritoVacio.classList.remove('d-none');
    contenedorCarritoProductos.classList.add('d-none');
    contenedorCarritoAcciones.classList.add('d-none');
    contenedorTotal.classList.add('d-none');

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
