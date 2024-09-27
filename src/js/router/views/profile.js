import { authGuard } from "../../utilities/authGuard";
authGuard(); 

// profile.js
import { readProfile } from '../../api/profile/read.js'; 

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const username = params.get('username');

  if (username) {
    readProfile(username);
  } else {
    console.error('No username found in URL');
    alert('Please log in to view your profile.');
    window.location.href = '/auth/login/';
  }
});
