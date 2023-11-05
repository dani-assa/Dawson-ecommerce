const header = document.querySelector("header");

const navbar = () => {
  const user = JSON.parse(localStorage.getItem("user")) || undefined;
  return (header.innerHTML = `
  <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div class="container-fluid ">
      <a class="navbar-brand" id="logoDawson" href="#" onclick="window.location.pathname = './index.html'"><img src="../Resources/LogoDawson.png" style="width: 100px;"  alt="LogoDawson">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <img src="../Resources/logoMinuatura.jpg" alt="logoMenu" style="width: 30px;">
      </button>
      <div class="collapse navbar-collapse justify-content-lg-start" id="navbarContent">
        <ul class="navbar-nav mb-2 mb-lg-0 ">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#" onclick="window.location.pathname = './index.html'">Página principal</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Sobre nosotros</a>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0 d-lg-none">
          ${
            user
              ? `
              <li class="nav-item">
                <b class="mb-3">Bienvenid@ ${user.name}</b>
              </li>
              <li class="nav-item">
                <a class="btn btn-success btn-sm mb-2 mt-3 btnCerrarSesion" onclick= "
                  localStorage.clear(),
                  window.location.reload()
                  window.location.pathname = './index.html'"
                  href="#">Cerrar sesión</a>
              </li>
              `
              : `
              <li class="nav-item">
                <a class="btn btn-success mx-2 btn-sm btnLogin" onclick="window.location.pathname = './views/login.html'">Ingresar</a>
                <a class="btnRegister" href="../views/register.html">Registrate</a>
              </li>`
          }
          ${
            user?.role === "ADMIN"
              ? ` <li class="nav-item">
                <a class="btn btn-success btn-sm mb-2 btnAdmin" onclick="window.location.pathname = './views/admin.html'">Panel Admin</a>
              </li>
          `
              : ``
          }
        </ul>
      </div>
    </div>
    <ul class="navbar-nav mb-2 mb-lg-0 d-none d-lg-flex w-50 justify-content-lg-center align-items-lg-center" id="navbar-nav">
          ${
            user
              ? `
            <div>
              <li class="nav-item">
              <b class="mb-3 mx-lg-3">Bienvenid@ ${user.name}</b>
              </li>
            </div>
            <div>
              <li class="nav-item">
                <a class="btn btn-success btn-sm mb-2 mx-2 btnCerrarSesion" onclick= "
                  localStorage.clear(),
                  window.location.reload()
                  window.location.pathname = './index.html'"
                  href="#">Cerrar sesión</a>
              </li>
            </div>
              `
              : `
              <li class="nav-item">
                <a class="btn btn-success mx-2 btn-sm btnLogin" onclick="window.location.pathname = './views/login.html'" >Ingresar</a>
                <a class="btnRegister" href="../views/register.html">Registrate</a>
              </li>`
          }
          ${
            user?.role === "ADMIN"
              ? ` <li class="nav-item">
                <a class="btn btn-success btn-sm mb-2 btnAdmin" onclick="window.location.pathname = './views/admin.html'">Panel Admin</a>
              </li>
          `
              : ``
          }
        </ul>
  </nav>
  `);
};

export default navbar;
