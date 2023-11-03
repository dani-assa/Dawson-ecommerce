import navbar from "../Components/navbar.js";
import footer1 from "../Components/footer.js";

document.addEventListener('DOMContentLoaded', () => 
navbar (),
footer1());

const productEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito'));
const carritoVacio = document.querySelector('.carritoVacio');
const contenedorCarritoProductos = document.querySelector('.carritoProductos');
const contenedorCarritoAcciones = document.querySelector('.carritoAcciones');
const vaciarCarrito = document.querySelector('#vaciarCarrito');
const total = document.querySelector('#total');


console.log(productEnCarrito);
if (productEnCarrito) {
  carritoVacio.classList.add('d-none');
} else {
  
}