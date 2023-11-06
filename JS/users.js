import navbar from "../Components/navbar.js";
import footer1 from "../Components/footer.js";
import { endpoints } from "../utils/endpoints.js";
const $tbody = document.getElementById("tbody");

const getUsers = async () => {
  try {
    const response = await fetch(`${endpoints.users}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const renderUsers = async () => {
  try {
    const users = await getUsers();
    const usersFiltered = users.filter((user) => user.role !== "ADMIN");
    usersFiltered.forEach((user) => {
      const $tr = document.createElement("tr");
      $tr.innerHTML = `
            <td>${user.email}</td>
            <td>${user.name}</td>
            <td>${user.lastName}</td>
            <td>${user.role}</td>
            <td>${user.status === true ? "Activo" : "Inactivo"}</td>
            <td>
                <input class="form-check-input" type="checkbox" data-userid="${
                  user.id
                }"
                role="switch" id="checkUserStatus" ${
                  user.status === true ? "checked" : ""
                }>
            </td>
        `;
      $tbody.append($tr);
    });
  } catch (error) {
    console.error(error);
  }
};

const changeStatus = async (id) => {
  const response = await fetch(`${endpoints.users}/${id}`);
  const getUser = await response.json();

  if (getUser.status == true) {
    await fetch(`${endpoints.users}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } else {
    await fetch(`${endpoints.users}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: true,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }
};

document.addEventListener("click", async (e) => {
  if (e.target.matches("#checkUserStatus")) {
    const id = e.target.dataset.userid;
    await changeStatus(id);
  }
});

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
  renderUsers();
  isAdmin();
});
