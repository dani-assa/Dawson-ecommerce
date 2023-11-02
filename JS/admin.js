import navbar from "../Components/navbar.js";
import footer1 from "../Components/footer.js";

const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const isAdmin = () => {
  const user = getUserFromStorage();

  if (!user || user.role !== "ADMIN") {
    window.location.replace("./error404.html");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  navbar();
  footer1();
  isAdmin();
});
