const $nameInput = document.getElementById("name");
const $priceInput = document.getElementById("price");
const $photoInput = document.getElementById("photo");
const $categoryInput = document.getElementById("category");
const $descriptionInput = document.getElementById("description");
const $stockInput = document.getElementById("stock");

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

const setValidationClass = ($element, isValid) => {
  if (isValid) {
    $element.classList.remove("is-invalid");
    $element.classList.add("is-valid");
  } else {
    $element.classList.remove("is-valid");
    $element.classList.add("is-invalid");
  }
};

export const validateProduct = (data) => {
  const name = data.name.value;
  const price = parseInt(data.price.value);
  const photo = data.photo.value;
  const category = data.category.value;
  const description = data.description.value;
  const stock = parseInt(data.stock.value);

  setValidationClass($nameInput, true);
  setValidationClass($priceInput, true);
  setValidationClass($photoInput, true);
  setValidationClass($categoryInput, true);
  setValidationClass($descriptionInput, true);
  setValidationClass($stockInput, true);

  if (!name || !photo || !category || !description || !stock) {
    alert("Todos los campos son obligatorios");
    setValidationClass($nameInput, false);
    setValidationClass($photoInput, false);
    setValidationClass($categoryInput, false);
    setValidationClass($descriptionInput, false);
    setValidationClass($stockInput, false);
    return false;
  }

  if (isNaN(price) || price < 0) {
    Toast.fire({
      icon: "error",
      title: "El precio no puede ser negativo",
      timer: 2000,
      position: "top",
    });
    setValidationClass($priceInput, false);
    return false;
  } else if (price > 1000000) {
    Toast.fire({
      icon: "error",
      title: "El precio no puede ser mayor a $1.000.000",
      timer: 2000,
      position: "top",
    });
    setValidationClass($priceInput, false);
    return false;
  }

  if (isNaN(stock) || stock < 0) {
    Toast.fire({
      icon: "error",
      title: "El stock no puede ser negativo",
      timer: 2000,
      position: "top",
    });
    setValidationClass($stockInput, false);
    return false;
  }

  const imageRegex = /\.(jpg|jpeg|png)$/i;

  if (!imageRegex.test(photo)) {
    Toast.fire({
      icon: "error",
      title: "La imagen debe ser JPG, JPEG o PNG",
      timer: 2000,
      position: "top",
    });
    setValidationClass($photoInput, false);
    return false;
  }

  if (description.length > 200) {
    Toast.fire({
      icon: "error",
      title: "La descripción no puede superar los 200 caracteres",
      timer: 2000,
      position: "top",
    });
    setValidationClass($descriptionInput, false);
    return false;
  }

  return true;
};
