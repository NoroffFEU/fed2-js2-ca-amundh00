import "./css/style.css";

import router from "./js/router";

async function init() {
    await router(window.location.pathname);
  }

init();

console.log(localStorage)

//Kode for å hente logout funtionsnen fra global/logout så den kan brukes på flere steder
import { logOut } from "./js/ui/global/logout";

document.addEventListener('DOMContentLoaded', () => {
  const logOutButton = document.getElementById('logOutButton');
  if (logOutButton) {
    logOutButton.addEventListener('click', logOut);
  }
});