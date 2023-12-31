import navbar from "../Components/navbar.js";
import footer1 from "../Components/footer.js";
import { endpoints } from "../utils/endpoints.js";

const cardsProducts = document.getElementById("cardsProducts");
const btnCategorie = document.querySelectorAll(".btnCategorie");
const title = document.querySelector("#title");
let btnAgregar = document.querySelectorAll(".btnAgregar");
const numeritoCarrito = document.querySelector(".numeritoCarrito");

document.addEventListener("DOMContentLoaded", () => navbar(), footer1());

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const getProducts = async () => {
  try {
    const response = await fetch(`${endpoints.products}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
const products = await getProducts();

const printProducts = async (filterProducts) => {
  try {
    cardsProducts.innerHTML = "";
    filterProducts.forEach((product) => {
      if (product.available === false) {
        return;
      }
      const card = document.createElement("div");
      card.classList = "card m-3 col-4 col-lg-2 g-0 cardProduct";
      card.innerHTML = `
        <a href="views/detailPage.html?id=${product.id}">
        <img src="${product.photo}" class="card-img-top" alt="foto prductos">
        </a>
        <div class="card-body d-flex flex-column justify-content-between">
          <h6 class="card-title">${product.name}</h6>
          <h6 class="card-title">$${product.price}</h6>
          <a href="#" class="btn btn-primary btn-sm btnAgregar" id="${product.id}">Agregar al carrito</a>
        </div>
      `;
      cardsProducts.append(card);
      actualizaBtnAgregar();
    });
  } catch (error) {
    console.error(error);
  }
};
printProducts(products);

btnCategorie.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btnCategorie.forEach((btn) => btn.classList.remove("active"));
    e.currentTarget.classList.add("active");
    console.log(e);
    if (e.target.id != "Todos") {
      const productCategories = products.find(
        (product) => product.categories === e.target.id
      );
      title.innerText = productCategories.categories;

      const productFiltered = products.filter(
        (product) => product.categories === e.target.id
      );
      printProducts(productFiltered);
      console.log(productFiltered);
    } else {
      title.innerText = "Todos los productos";
      printProducts(products);
    }
  });
});

function actualizaBtnAgregar() {
  btnAgregar = document.querySelectorAll(".btnAgregar");

  btnAgregar.forEach((btn) => {
    btn.addEventListener("click", agregarAlCarrito);
  });
}

let productEnCarrito;
let productEnCarritoLS = localStorage.getItem("productosEnCarrito");
if (productEnCarritoLS) {
  productEnCarrito = JSON.parse(productEnCarritoLS);
  actualiarNumeritoCarrito();
} else {
  productEnCarrito = [];
}

function agregarAlCarrito(e) {
  e.preventDefault();
  const idBtn = e.target.id;
  const productAgregado = products.find((product) => product.id == idBtn);
  if (productEnCarrito.some((product) => product.id == idBtn)) {
    const index = productEnCarrito.findIndex((product) => product.id == idBtn);
    productEnCarrito[index].cantidad++;
  } else {
    productAgregado.cantidad = 1;
    productEnCarrito.push(productAgregado);
  }

  actualiarNumeritoCarrito();

  localStorage.setItem("productosEnCarrito", JSON.stringify(productEnCarrito));
  
  Toast.fire({
    icon: "success",
    title: "Producto agregado al carrito",
  });
}
// -- Funcion para modificar el nro del carrito

function actualiarNumeritoCarrito() {
  let nuevoNumerito = productEnCarrito.reduce(
    (acc, product) => acc + product.cantidad,
    0
  );
  numeritoCarrito.innerText = nuevoNumerito;
}
