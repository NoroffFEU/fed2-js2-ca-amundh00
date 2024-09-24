import { onLogin } from "../../ui/auth/login";
import { login } from "../../api/auth/login";

const form = document.forms.login;

form.addEventListener("submit", onLogin, login);
