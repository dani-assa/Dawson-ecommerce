import navbar from "../Components/navbar.js";
import { getFormData } from "./utils.js";
import { endpoints } from "../utils/endpoints.js";
import footer1 from "../Components/footer.js";

document.addEventListener('DOMContentLoaded', () => 
navbar (),
footer1());

const login = async(e) => {
  e.preventDefault();

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  emailInput.classList.remove('is-invalid');
  passwordInput.classList.remove('is-invalid');


  const formData = getFormData(e)
  try {
    const response = await fetch(`${endpoints.users}?email=${formData.email}`);
    const data = await response.json();
    const [user] = data;
    if (!user) {
      emailInput.classList.add('is-invalid');
      passwordInput.classList.add('is-invalid');
      return;
    }
    if (formData.password !== user.password) {
      emailInput.classList.add('is-invalid');
      passwordInput.classList.add('is-invalid');
      return;
    }
  
    delete user.password;
    localStorage.setItem('user', JSON.stringify(user));
    window.location.replace('../index.html')
  } catch (error) {
    console.error(error);
  }
};


document.getElementById('loginForm').addEventListener('submit', login);


const pass = document.getElementById('password');
const icon = document.getElementById('showPassword');

const showPassword = () => {
  if (pass.type === "password") {
    pass.type = "text";
  } else {
    pass.type = "password";
    
  }
}

icon.addEventListener('click', showPassword);