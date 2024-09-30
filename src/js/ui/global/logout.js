/**
 * Logs out the user by removing their token and username from local storage and reloading the page.
 *
 * This function performs the following actions:
 * - Removes the 'token' and 'userName' from local storage, effectively logging out the user.
 * - Reloads the page to reflect the logout state.
 *
 * @function logOut
 * @returns {void} Does not return a value.
 */
export function logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  window.location.reload();
}