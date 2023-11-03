import navbar from "../Components/navbar.js";
import footer1 from "../Components/footer.js";
import { endpoints } from "../utils/endpoints.js";

const cardsProducts = document.getElementById('cardsProducts');
const btnCategory = document.querySelectorAll('.btnCategory')
const title = document.querySelector('#title');


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
const products = await getProducts();


const printProducts = async (filterProducts) => {
  try {
    cardsProducts.innerHTML = '';
    filterProducts.forEach((product) => {
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
printProducts(products);


btnCategory.forEach(btn => {
  btn.addEventListener('click', (e) => {
    btnCategory.forEach(btn => btn.classList.remove('active'))
    e.currentTarget.classList.add('active');
    console.log(e);
    if (e.target.id != 'Todos') {
      const productCategories = products.find(product => product.categories === e.target.id);
      title.innerText = productCategories.categories;

      const productFiltered = products.filter((product) => product.categories === e.target.id)
      printProducts(productFiltered);
      console.log(productFiltered);
    } else {
      title.innerText = 'Todos los productos';
      printProducts(products);
      
    }
  })
})

// document.addEventListener('DOMContentLoaded', printProducts);