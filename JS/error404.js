const returnToHome = () => {
  const $message = document.querySelector(".message");
  $message.classList.add("text-light", "fs-3", "fw-bold", "text-center");
  let countdown = 20;
  /* $message.innerHTML = `Serás redirigido a la página principal en <p class="text-danger">${countdown}</p> segundos.`; */

  const timer = setInterval(() => {
    countdown--;
    if (countdown <= 0) {
      clearInterval(timer);
      window.location.href = "../index.html";
    } else {
      $message.innerHTML = `Serás redirigido a la página principal en <div class="text-danger d-inline">${countdown}</div> segundos.`;
    }
  }, 1000);
};

returnToHome();
