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
          <a class="btnEliminarProd mb-auto mt-auto me-2" id="${product.id}"><i class="bi bi-trash-fill"></i></a>
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

async function eliminarDelCarrito(e) {
  const confirmResult = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción eliminará el producto. ¿Deseas continuar?",
    icon: "warning",
    background: "#212529",
    color: "#d8aa54",
    confirmButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    showCancelButton: true,
    cancelButtonColor: "#3085d6",
    cancelButtonText: "Cancelar",
  });
  if (confirmResult.isConfirmed) {
    const idBtn = await e.target.id;
    const index = productEnCarrito.findIndex(product => product.id == idBtn);
  
    productEnCarrito.splice(index, 1);
    cargarProductosCarritos();
    actualizarTotal();
    localStorage.setItem('productosEnCarrito', JSON.stringify(productEnCarrito));

    if (!idBtn.ok) {
      await Swal.fire({
        title: "Eliminado",
        text: "El producto ha sido eliminado.",
        icon: "success",
        confirmButtonText: "Ok",
        background: "#212529",
        color: "#d8aa54",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      await Swal.fire(
        "Error",
        "Ha ocurrido un error al eliminar el producto.",
        "error"
      );
    }
  };

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
