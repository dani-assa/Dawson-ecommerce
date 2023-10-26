import navbar from "../Components/navbar.js";
import footer1 from "../Components/footer.js";
const $tbody = document.getElementById("tbody");

const URL_PRODUCTS = "http://localhost:3000/products";

const getProducts = async () => {
  const response = await fetch(`${URL_PRODUCTS}`);
  const json = await response.json();
  return json;
};

//!Sin imagen por ahora - Estoy con datos
const renderProducts = async () => {
  const products = await getProducts();
  products.forEach((product) => {
    const $tr = document.createElement("tr");
    $tr.innerHTML = `
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td><img src="-" style="width: 100px; height: 50px"></td>
        <td>${product.categories.join(" - ")}</td>
        <td>
            <button class="btn btn-danger" id="${product.id}">Borrar</button>
            <button class="btn btn-success" id="${product.id}">Editar</button>
        </td>
    `;
    $tbody.append($tr);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  navbar();
  footer1();
  renderProducts();
});
