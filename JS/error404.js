const returnToHome = () => {
  const $message = document.querySelector(".message");
  $message.classList.add("text-light", "fs-5", "fw-bold", "text-center");
  let countdown = 7;
  $message.innerHTML = `Serás redirigido a la página principal en ${countdown} segundos.`;

  const timer = setInterval(() => {
    countdown--;
    if (countdown <= 0) {
      clearInterval(timer);
      window.location.href = "../index.html";
    } else {
      $message.innerHTML = `Serás redirigido a la página principal en ${countdown} segundos.`;
    }
  }, 1000);
};

returnToHome();
