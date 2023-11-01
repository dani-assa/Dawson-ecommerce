import navbar from "../Components/navbar.js";
import footer1 from "../Components/footer.js";
import { endpoints } from "../utils/endpoints.js";
import { validateProduct } from "../validations/product-validations.js";
const $productForm = document.getElementById("productForm");
const $table = document.getElementById("admin");
const $tbody = document.getElementById("tbody");
const $inputId = document.getElementById("idHidden");
const $productModal = document.getElementById("productModal");

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
          <td><button class="btn btn-light lookPhoto" id="lookPhoto" data-productid="${
            product.id
          }"><i class="fa-solid fa-eye fa-xs" style="color: #d8aa54;"></i></button>
          </td>
          <td>${product.categories.join(" - ")}</td>
          <td>${product.stock}</td>
          <td>
              <button class="btn btn-danger" id="eliminar" data-productid="${
                product.id
              }"><i class="fa-solid fa-trash" style="color: #ffffff;"></i></button>
              <button class="btn btn-success editar" id="${
                product.id
              }" data-bs-toggle="modal"
              data-bs-target="#productModal"><i class="fa-solid fa-pen-to-square" style="color: #ffffff;"></i></button>
          </td>
      `;
      $tbody.append($tr);
    });
  } catch (error) {
    console.error(error);
  }
};

const postProduct = async (data) => {
  const { name, price, photo, category, season, description, stock } = data;

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
        description: description.value,
        stock: parseInt(stock.value),
        available: true,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const updateProduct = async (id, data) => {
  const { name, price, photo, category, season, description, stock } = data;

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
        description: description.value,
        stock: parseInt(stock.value),
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
  try {
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
      const response = await fetch(`${endpoints.products}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (response.ok) {
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
    }
  } catch (error) {
    console.error(error);
  }
};

const showDataFromProduct = async (id) => {
  try {
    const data = await getProducts();

    const productFiltered = data.filter((product) => product.id == id);

    console.log(productFiltered);

    Swal.fire({
      title: productFiltered[0].name,
      text: productFiltered[0].description,
      background: "#212529",
      color: "#d8aa54",
      imageUrl: productFiltered[0].photo,
      imageHeight: 300,
      imageAlt: productFiltered[0].name,
      confirmButtonText: "Ok",
    });
  } catch (error) {
    console.error(error);
  }
};

$productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.idHidden.dataset.id) {
    updateProduct(e.target.idHidden.dataset.id, e.target);
  } else {
    postProduct(e.target);
  }
});

$table.addEventListener("click", async (e) => {
  if (e.target.matches("#eliminar")) {
    try {
      const id = e.target.dataset.productid;
      deleteProduct(id);
    } catch (error) {
      console.error(error);
    }
  }

  if (e.target.matches(".editar")) {
    try {
      const $inputName = document.getElementById("name");
      const $inputPrice = document.getElementById("price");
      const $inputPhoto = document.getElementById("photo");
      const $selectCategory = document.getElementById("category");
      const $selectSeason = document.getElementById("season");
      const $inputDescription = document.getElementById("description");
      const $inputStock = document.getElementById("stock");
      const $modalTitle = document.querySelector(".modal-title");

      const id = e.target.id;
      const products = await getProducts();

      const productFiltered = products.filter((product) => product.id == id);

      console.log(productFiltered[0].name);

      $inputName.value = productFiltered[0].name;
      $inputPrice.value = productFiltered[0].price;
      $inputPhoto.value = productFiltered[0].photo;
      $inputDescription.value = productFiltered[0].description;
      $inputStock.value = productFiltered[0].stock;
      const selectedCategoryValue = productFiltered[0].categories[0];
      const selectedSeasonValue = productFiltered[0].categories[1];

      $selectCategory.value = selectedCategoryValue;
      $selectSeason.value = selectedSeasonValue;

      $modalTitle.textContent = `Editando ${productFiltered[0].name}`;

      $inputId.setAttribute("data-id", productFiltered[0].id);
    } catch (error) {
      console.error(error);
    }
  }

  if (e.target.matches("#lookPhoto")) {
    try {
      const id = e.target.dataset.productid;

      showDataFromProduct(id);
    } catch (error) {
      console.error(error);
    }
  }

  // * Solución para el problema que causaba al hacer click en el icono
  // * de fontawesome, lo que causaba que mostrara la imagen anterior al
  // * hacer click en otro elemento...

  /*  if (e.target.matches(".fa-eye")) {
    const $parentTr = e.target.closest("tr");
    const $productPhoto = $parentTr.querySelector(".lookPhoto");
    const url = $productPhoto.getAttribute("data-productPhoto");
    const name = $productPhoto.getAttribute("data-productName");
    addPhotoToModal(url, name);
  } */
});

$productModal.addEventListener("hidden.bs.modal", () => {
  const $inputName = document.getElementById("name");
  const $inputPrice = document.getElementById("price");
  const $inputPhoto = document.getElementById("photo");
  const $selectCategory = document.getElementById("category");
  const $selectSeason = document.getElementById("season");
  const $inputDescription = document.getElementById("description");
  const $inputStock = document.getElementById("stock");
  const $modalTitle = document.querySelector(".modal-title");

  $inputName.value = "";
  $inputPrice.value = "";
  $inputPhoto.value = "";
  $selectCategory.value = "";
  $selectSeason.value = "";
  $inputDescription.value = "";
  $inputStock.value = "";
  $modalTitle.textContent = "Crear nuevo producto";

  $inputId.setAttribute("data-id", "");
});

document.addEventListener("DOMContentLoaded", () => {
  navbar();
  footer1();
  renderProducts();
});
