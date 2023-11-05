import navbar from "../Components/navbar.js";
import { endpoints } from "../utils/endpoints.js";
import footer1 from "../Components/footer.js";

document.addEventListener('DOMContentLoaded', () => 
navbar (),
footer1());

const nombre = document.getElementById('NombreApellido');
const email = document.getElementById('email');
const contraseña = document.getElementById('conraseña');
const repetirContraseña = document.getElementById('repetirContraseña');

const formulario = (e) => {
     e.preventDefault()
}