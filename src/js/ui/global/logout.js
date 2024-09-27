export function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.reload();
  }