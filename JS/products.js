import navbar from "../Components/navbar.js";
import footer1 from "../Components/footer.js";
import { endpoints } from "../utils/endpoints.js";
import { validateProduct } from "../validations/product-validations.js";
const $tbody = document.getElementById("tbody");
const $inputId = document.getElementById("idHidden");
const $productModal = document.getElementById("productModal");


//! To do:
//* 1)
//! Dependiendo si agrego o edito un producto, cambiar el titulo de ventana
//! modal para que diga Crear o Editar producto.
//* 2)
//! Agregar los iconos a los botones de borrar y editar.
//* 3)
//! Implementar SweetAlert2.

const getProducts = async () => {
  try {
    const response = await fetch(`${endpoints.products}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const renderProducts = async () => {
  try {
    const products = await getProducts();
    products.forEach((product) => {
      const $tr = document.createElement("tr");
      $tr.innerHTML = `
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td><button class="btn btn-light lookPhoto" data-bs-toggle="modal" data-bs-target="#photoModal" id="lookPhoto" data-productPhoto="${
            product.photo
          }" data-productName="${
        product.name
      }"><i class="fa-solid fa-eye" style="color: #d8aa54;"></i></button>
          </td>
          <td>${product.categories.join(" - ")}</td>
          <td>
              <button class="btn btn-danger" id="eliminar" data-productid="${
                product.id
              }">Borrar</button>
              <button class="btn btn-success editar" id="${
                product.id
              }" data-bs-toggle="modal"
              data-bs-target="#productModal">Editar</button>
          </td>
      `;
      $tbody.append($tr);
    });
  } catch (error) {
    console.error(error);
  }
};

const addPhotoToModal = (url, name) => {
  const $photoModal = document.getElementById("productPhoto");
  const $photoModalTitle = document.getElementById("photoModalTitle");
  $photoModalTitle.innerText = name;
  $photoModal.removeAttribute("src");
  $photoModal.setAttribute("src", url);
};

const postProduct = async (data) => {
  const { name, price, photo, category, season } = data;

  const resp = validateProduct(data);
  if (!resp) {
    return;
  }
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

const updateProduct = async (id, data) => {
  const { name, price, photo, category, season } = data;

  const resp = validateProduct(data);
  if (!resp) {
    return;
  }

  try {
    const response = await fetch(`${endpoints.products}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: name.value,
        price: parseInt(price.value),
        photo: photo.value,
        categories: [category.value, season.value],
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (id) => {
  const confirmDelete = confirm("¿Estás seguro de borrar este producto?");

  if (!confirmDelete) return;
  try {
    const response = await fetch(`${endpoints.products}/${id}`, {
      method: "DELETE",
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
document.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.idHidden.dataset.id) {
    updateProduct(e.target.idHidden.dataset.id, e.target);
  } else {
    postProduct(e.target);
  }
});

document.addEventListener("click", async (e) => {
  if (e.target.matches("#eliminar")) {
    const id = e.target.dataset.productid;
    deleteProduct(id);
  }

  if (e.target.matches(".editar")) {
    try {
      const $inputName = document.getElementById("name");
      const $inputPrice = document.getElementById("price");
      const $inputPhoto = document.getElementById("photo");
      const $selectCategory = document.getElementById("category");
      const $selectSeason = document.getElementById("season");

      const id = e.target.id;
      const products = await getProducts();

      const productFiltered = products.filter((product) => product.id == id);

      console.log(productFiltered[0].name);

      $inputName.value = productFiltered[0].name;
      $inputPrice.value = productFiltered[0].price;
      $inputPhoto.value = productFiltered[0].photo;
      const selectedCategoryValue = productFiltered[0].categories[0];
      const selectedSeasonValue = productFiltered[0].categories[1];

      $selectCategory.value = selectedCategoryValue;
      $selectSeason.value = selectedSeasonValue;

      $inputId.setAttribute("data-id", productFiltered[0].id);
    } catch (error) {
      console.error(error);
    }
  }

  if (e.target.matches("#lookPhoto")) {
    const url = e.target.dataset.productphoto;
    const name = e.target.dataset.productname;
    addPhotoToModal(url, name);
  }

  // * Solución para el problema que causaba al hacer click en el icono
  // * de fontawesome, lo que causaba que mostrara la imagen anterior al
  // * hacer click en otro elemento...

  if (e.target.matches(".fa-eye")) {
    const $parentTr = e.target.closest("tr");
    const $productPhoto = $parentTr.querySelector(".lookPhoto");
    const url = $productPhoto.getAttribute("data-productPhoto");
    const name = $productPhoto.getAttribute("data-productName");
    addPhotoToModal(url, name);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  navbar();
  footer1();
  renderProducts();
});

$productModal.addEventListener("hidden.bs.modal", () => {
  const $inputName = document.getElementById("name");
  const $inputPrice = document.getElementById("price");
  const $inputPhoto = document.getElementById("photo");
  const $selectCategory = document.getElementById("category");
  const $selectSeason = document.getElementById("season");

  $inputName.value = "";
  $inputPrice.value = "";
  $inputPhoto.value = "";
  $selectCategory.value = "";
  $selectSeason.value = "";

  $inputId.setAttribute("data-id", "");
});
