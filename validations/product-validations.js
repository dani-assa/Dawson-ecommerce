export const validateProduct = (data) => {
  const name = data.name.value;
  const price = parseInt(data.price.value);
  const photo = data.photo.value;
  const category = data.category.value;
  const description = data.description.value;
  const stock = parseInt(data.stock.value);

  if (!name || !photo || !category || !description || !stock) {
    alert("Todos los campos son obligatorios");
    return false;
  }

  if (isNaN(price) || price < 0) {
    alert("El precio no es válido o es negativo");
    return false;
  } else if (price > 1000000) {
    alert("El precio no puede ser mayor a 1000000");
    return false;
  }

  if (isNaN(stock) || stock < 0) {
    alert("El stock no es válido o es negativo");
    return false;
  }

  const imageRegex = /\.(jpg|jpeg|png)$/i;

  if (!imageRegex.test(photo)) {
    alert("La URL de la imagen no es válida");
    return false;
  }

  return true;
};
