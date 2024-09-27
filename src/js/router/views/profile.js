import { authGuard } from "../../utilities/authGuard";
import { readProfile } from '../../api/profile/read';

// Event listener for the "My Profile" button
document.addEventListener('DOMContentLoaded', () => {
    const profileButton = document.getElementById('myProfile');
    
    if (profileButton) {
      profileButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const username = localStorage.getItem('userName');
        if (!username) {
          alert('No username found. Please log in.');
          return;
        }
        window.location.href = `/profile/?username=${username}`;
      });
    }
  });

readProfile();
authGuard();


