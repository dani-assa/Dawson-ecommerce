import navbar from "../Components/navbar.js";
import footer1 from "../Components/footer.js";
import { endpoints } from "../utils/endpoints.js";
const $tbody = document.getElementById("tbody");

const getProducts = async () => {
  const response = await fetch(`${endpoints.products}`);
  const json = await response.json();
  return json;
};

const renderProducts = async () => {
  const products = await getProducts();
  products.forEach((product) => {
    const $tr = document.createElement("tr");
    $tr.innerHTML = `
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td><img src="${product.photo}" style="width: 100px; height: 50px"></td>
        <td>${product.categories.join(" - ")}</td>
        <td>
            <button class="btn btn-danger" id="${product.id}">Borrar</button>
            <button class="btn btn-success" id="${product.id}">Editar</button>
        </td>
    `;
    $tbody.append($tr);
  });
};

const postProduct = async (data) => {
  const { name, price, photo, category, season } = data;

  try {
    const response = await fetch(`${endpoints.products}`, {
      method: "POST",
      body: JSON.stringify({
        name: name.value,
        price: parseInt(price.value),
        photo: photo.value,
        categories: [category.value, season.value],
        available: true,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener("submit", (e) => {
  e.preventDefault();

  postProduct(e.target);
});

document.addEventListener("DOMContentLoaded", () => {
  navbar();
  footer1();
  renderProducts();
});
