import navbar from "../Components/navbar.js";
import { endpoints } from "../utils/endpoints.js";
import footer1 from "../Components/footer.js";

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

const printCardDetail = async (id) => {
  try {
    const data = await getProducts();
    const productFiltered = data.filter((product) => product.id == id);
    console.log(productFiltered);
    const detailProduct = document.createElement("div");
    detailProduct.classList = "card";
    detailProduct.innerHTML = `
    <img src="${productFiltered[0].photo}" class="card-img-top" alt="foto prductos">
        <div class="card-body d-flex flex-column justify-content-between">
        <h6 class="card-title">${productFiltered[0].name}</h6>
        <h6 class="card-title">$${productFiltered[0].price}</h6>
        <a href="#" class="btn btn-primary btn-sm">Agregar al carrito</a>
        </div>
    `;
    cardDetailProducts.appendChild(detailProduct);
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener("DOMContentLoaded", () => navbar(), footer1());
