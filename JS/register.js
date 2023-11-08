// TOMANDO LOS DATOS PARA JSON
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

// VALIDANDO LOS DATOS DEL REGISTRO 
const $formulario = document.getElementById("formulario");
const $inputs = document.querySelectorAll("#formulario input")

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,8}$/, 
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,8}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 
    password: /^.{4,8}$/
}

// FORMULARIO
const campos = {
    nombre: false,
    apellido: false,
    correo: false,
    password: false
}


// ---------LOS INPUTS ---------------
const validarFormulario = (e) => {
    switch(e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, "nombre");
        break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, "apellido");
        break;
        case "correo":
            validarCampo(expresiones.correo, e.target, "correo");
        break;
        case "password":
            validarCampo(expresiones.password, e.target, "password");
            validarPassword2();
        break;
        case "password2":
            validarPassword2();
        break;
    }
}


// -------------- VALIDAR INPUTS ------------------------
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-times-circle");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos[campo] = true;
        console.log("Funciona");
    } else {
           document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
           document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
           document.querySelector(`#grupo__${campo} i`).classList.add("fa-times-circle");
           document.querySelector(`#grupo__${campo} i`).classList.remove("fa-check-circle");
           document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
           campos[campo] = false;
           console.log("Funciona");
        }
}


// --------- LAS CONTRASEÑAS ---------------
const validarPassword2 = () => {
    let inputPassword1 = document.getElementById("password");
    let inptPassword2 = document.getElementById("password2");

    if (inputPassword1.value !== inptPassword2.value) {
        document.getElementById(`grupo__password2`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__password2 i`).classList.add("fa-times-circle");
        document.querySelector(`#grupo__password2 i`).classList.remove("fa-check-circle");
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add("formulario__input-error-activo");
        campos[password] = false;
        console.log("Funciona");
    } else {
        document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__password2`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__password2 i`).classList.remove("fa-times-circle");
        document.querySelector(`#grupo__password2 i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos[password] = true;
        console.log("Funciona");
    }
}


// --------- DATOS INGRESADOS POR EL USUARIO Y VALIDAR ---------------
$inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

$formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const $terminos = document.getElementById("terminos");
    if(campos.nombre && campos.apellido && campos.correo && campos.password && $terminos.checked) {
        // formulario.reset();

        document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
        setTimeout(() => {
            document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");
            document.getElementById("formulario__grupo-terminos").style.display = "none";
            
        }, 3000);
        
        document.querySelectorAll(".formulario__grupo--correcto").forEach ((icono) => {
            icono.classList.remove("formulario__grupo--correcto");
        });
        
        setTimeout(() => {
            location.reload();
        }, 5000);

    } else {
        document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
    }
});