import "./css/style.css";

import router from "./js/router";

async function init() {
    await router(window.location.pathname);
  }

init();

console.log(localStorage)


