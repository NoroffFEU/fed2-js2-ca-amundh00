import { authGuard } from "../../utilities/authGuard";

authGuard();

export function onLogout() {
    try {
        // Remove the items from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        
        // Optional: Redirect the user to the login page or home page
        ///window.location.href = '../auth/login/index.html';
        
        console.log('User logged out successfully');
    } catch (error) {
        console.error('Error during logout:', error);
    }
}

document.getElementById('logOutButton').addEventListener('click', onLogout);
