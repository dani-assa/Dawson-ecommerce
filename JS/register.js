import navbar from "../Components/navbar.js";
import { endpoints } from "../utils/endpoints.js";
import footer1 from "../Components/footer.js";

document.addEventListener('DOMContentLoaded', () => 
navbar (),
footer1());


const form = document.getElementById('formulario-register');



const getUsers = async () => {
  try {
    const response = await fetch(`${endpoints.users}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const formulario = async (e) => {
  e.preventDefault()

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const email = document.getElementById('email').value;
  const contraseña = document.getElementById('contraseña').value;
  const repetirContraseña = document.getElementById('repetirContraseña').value;

  const user = {
    nombre,
    apellido,
    email,
    contraseña,
  };
console.log(user);
  try {
    const response = await fetch(`${endpoints.users}`, {
      method: "POST",
      body: JSON.stringify({
        name: nombre,
        lastName: apellido,
        email: email,
        password: contraseña,
        role: 'CLIENT',
        status: true
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  };
  
};

form.addEventListener('submit', formulario);