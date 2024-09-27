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

document.addEventListener('DOMContentLoaded', () => {
  const profileButton = document.getElementById('myProfile');
  
  if (profileButton) {
    profileButton.addEventListener('click', (event) => {
      event.preventDefault();
      const username = localStorage.getItem('userName');
      if (!username) {
        alert('No username found. Please log in.');
        return;
      }
      // Redirect to profile page with username in URL
      window.location.href = `/profile/index.html?username=${username}`;
    });
  }
});