import navbar from "../Components/navbar.js";
import { getFormData } from "./utils.js";
import db from '../fakeDb/db.json' assert {type: 'json'};


document.addEventListener('DOMContentLoaded', () => navbar ());

const login = (e) => {
  e.preventDefault();

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  emailInput.classList.remove('is-invalid');
  passwordInput.classList.remove('is-invalid');


  const formData = getFormData(e)
  const userExist = db.users.find((user) => user.email === formData.email);
  if (!userExist) {
    emailInput.classList.add('is-invalid');
    passwordInput.classList.add('is-invalid');

    return;
  }
  if (formData.password !== userExist.password) {
    emailInput.classList.add('is-invalid');
    passwordInput.classList.add('is-invalid');
    return;
  }

  delete userExist.password;
  localStorage.setItem('user', JSON.stringify(userExist));
  window.location.replace('../index.html')
};


document.getElementById('loginForm').addEventListener('submit', login);


const pass = document.getElementById('password');
const icon = document.getElementById('showPassword');

const showPassword = () => {
  if (pass.type === "password") {
    pass.type = "text";
    icon.classList.add('bx-show-alt')
    icon.classList.remove('bxs-hide')
  } else {
    pass.type = "password";
    icon.classList.remove('bx-show-alt')
    icon.classList.add('bxs-hide')
  }
}

icon.addEventListener('click', showPassword);