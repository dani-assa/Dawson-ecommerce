import navbar from "../Components/navbar.js";
import footer1 from "../Components/footer.js";
import { endpoints } from "../utils/endpoints.js";


document.addEventListener('DOMContentLoaded', () => 
navbar (),
footer1());


const getProducts = async () => {
  try {
    const response = await fetch(`${endpoints.products}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);    
  }
};

const cardsProducts = document.getElementById('cardsProducts');
const btnCategory = document.querySelectorAll('.btnCategory')

const printProducts = async () => {
  try {
    const products = await getProducts();
    products.forEach((product) => {
      const card = document.createElement('div');
      card.classList = 'card m-3 col-9 col-lg-2 g-0';
      card.innerHTML = `
        <img src="${product.photo}" class="card-img-top" alt="foto prductos">
        <div class="card-body d-flex flex-column justify-content-between">
          <h6 class="card-title">${product.name}</h6>
          <h6 class="card-title">$${product.price}</h6>
          <a href="#" class="btn btn-primary btn-sm" id="${product.id}">Agregar al carrito</a>
        </div>
      `
      cardsProducts.append(card);
    })
  } catch (error) {
    console.error(error);
  }
};

btnCategory.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.currentTarget.classList.add('active');
  })
})

document.addEventListener('DOMContentLoaded', printProducts);