import navbar from "../Components/navbar.js";
import { endpoints } from "../utils/endpoints.js";
import footer1 from "../Components/footer.js";
const $content = document.getElementById("content");
const $imgDetail = document.getElementById("imgDetail");
const $containerDetail = document.getElementById("containerDetail");

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

const getURLParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  id || (window.location.href = "../views/error404.html");
  printCardDetail(id);
};

const printCardDetail = async (id) => {
  try {
    const data = await getProducts();
    const productFiltered = data.filter((product) => product.id == id);

    //! Crear una funcion para validar que exista el producto
    if (productFiltered.length == 0) {
      window.location.href = "../views/error404.html";
    }

    const $img = document.createElement("img");
    $img.src = productFiltered[0].photo;
    $img.classList = "card-img-top";
    $img.style.minHeight = "600px";
    $img.style.height = "100vh";
    $img.alt = "Foto del producto";

    const $h1TituloProducto = document.createElement("h1");
    $h1TituloProducto.textContent = productFiltered[0].name;
    $h1TituloProducto.classList.add(
      "card-title",
      "fw-bold",
      "mt-1",
      "text-center"
    );
    const $pDescripcion = document.createElement("p");
    $pDescripcion.textContent = `${productFiltered[0].description}`;
    $pDescripcion.classList.add(
      "card-text",
      "text-center",
      "mt-2",
      "fs-3",
      "text-dark",
      "w-75",
      "mx-auto"
    );

    const $h2OtrosDetalles = document.createElement("h2");
    $h2OtrosDetalles.textContent = "Otros detalles";
    $h2OtrosDetalles.classList.add(
      "card-title",
      "fw-bold",
      "mt-4",
      "text-center"
    );

    const $pOtrosDetalles = document.createElement("p");
    $pOtrosDetalles.innerHTML = `Precio: $${productFiltered[0].price} <br>
    Categoría: ${productFiltered[0].categories} <br>
    Stock: ${productFiltered[0].stock} <br>
    ID: ${productFiltered[0].id} <br>
    <button class="btn btn-primary border-2 border-dark btnAddToCart" id="${productFiltered[0].id}">Agregar al carrito</button>
    `;
    $pOtrosDetalles.classList.add(
      "card-text",
      "text-center",
      "mt-2",
      "fs-3",
      "text-dark",
      "w-75",
      "mx-auto"
    );

    $imgDetail.append($img);
    $containerDetail.append(
      $h1TituloProducto,
      $pDescripcion,
      $h2OtrosDetalles,
      $pOtrosDetalles
    );
    $content.append($containerDetail);

    /* cardDetailProducts.appendChild(detailProduct); */
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  navbar();
  footer1();
  getURLParams();
  numeritoCarrito();
});

const $numeritoCarrito = document.getElementById("numeritoCarrito");

let carrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];

const numeritoCarrito = () => {
  let nuevoNumerito = carrito.reduce(
    (acc, product) => acc + product.cantidad,
    0
  );
  $numeritoCarrito.innerText = nuevoNumerito;
};

console.log($numeritoCarrito);
document.addEventListener("click", async (e) => {
  if (e.target.matches(".btnAddToCart")) {
    const id = e.target.id;
    const products = await getProducts();

    const productAgregado = products.find((product) => product.id == id);
    console.log(productAgregado.id);

    if (carrito.some((product) => product.id == productAgregado.id)) {
      const index = carrito.findIndex(
        (product) => product.id == productAgregado.id
      );
      carrito[index].cantidad++;
    } else {
      productAgregado.cantidad = 1;
      carrito = [...carrito, productAgregado];
    }

    localStorage.setItem("productosEnCarrito", JSON.stringify(carrito));
    numeritoCarrito();

    Toast.fire({
      icon: "success",
      title: "Producto agregado al carrito",
    });
  }
});
