// Function to get the active user's username from local storage
export function getActiveUser() {
    const username = localStorage.getItem('userName');
    if (!username) {
      //console.error('No username found in local storage.');
    }
    return username; // Return the username or null
  }
  