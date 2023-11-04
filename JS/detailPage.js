import navbar from "../Components/navbar.js";
import { endpoints } from "../utils/endpoints.js";
import footer1 from "../Components/footer.js";
const $content = document.getElementById("content");
const $imgDetail = document.getElementById("imgDetail");
const $containerDetail = document.getElementById("containerDetail");

// document.addEventListener('DOMContentLoaded', () => navbar ());
// document.addEventListener('DOMContentLoaded', () => footer1 ());

const getProducts = async () => {
  try {
    const response = await fetch(`${endpoints.products}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const cardDetailProducts = document.getElementById("containerDetail");

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

    /* const detailProduct = document.createElement("div");
    detailProduct.classList = "card";
    detailProduct.innerHTML = `<div class="card" style="width: 18rem;">
    <img src="${productFiltered[0].photo}" class="card-img-top" alt="Foto del producto">
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title">${productFiltered[0].name}</h5>
      <h6 class="card-title">$${productFiltered[0].price}</h6>
      <a href="#" class="btn btn-primary btn-sm">Agregar al carrito</a>
    </div>
  </div>
  ` */

    const $img = document.createElement("img");
    $img.src = productFiltered[0].photo;
    $img.classList = "card-img-top img-fluid";
    $img.style.height = "500px";
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
      "mt-5",
      "text-center"
    );

    const $pOtrosDetalles = document.createElement("p");
    $pOtrosDetalles.innerHTML = `Precio: $${productFiltered[0].price} <br>
    Categoría: ${productFiltered[0].categories} <br>
    Stock: ${productFiltered[0].stock}`;
    $pOtrosDetalles.classList.add(
      "card-text",
      "text-center",
      "mt-2",
      "fs-2",
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
});
