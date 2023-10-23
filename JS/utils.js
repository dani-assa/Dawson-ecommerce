/** 
* @author Daniel Federico Assa
* @param {Event} e Recibe el evento del formulario
* @returns {object} Retorna un objeto con clave valor con la informacion de los input
*/

export const getFormData = (e) => {
  const formData = new FormData(e.target); 
  const formObject = {};
  for (const [key, value] of formData.entries()) {
    formObject[key] = value;
  }
  return formObject
};