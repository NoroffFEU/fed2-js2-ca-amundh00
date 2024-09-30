import { authGuard } from "../../utilities/authGuard";
import { fetchAllPosts } from '../../ui/global/showPosts.js';
import { showMakePostButton } from "../../ui/global/makePostButton.js";
const accessToken = localStorage.getItem('token');

/**
 * This script is responsible for managing the user session, fetching posts, and showing the "Make Post" button if the user is authenticated.
 *
 * - The `authGuard()` function checks whether the user is authenticated.
 * - The `fetchAllPosts()` function fetches and displays all posts.
 * - If the user is authenticated (i.e., an access token exists), the `showMakePostButton()` is called to display the button for creating a new post.
 */

// Ensure the user is authenticated before accessing the page
authGuard();

// Fetch and display all posts
fetchAllPosts();

// If the user has an access token (i.e., is logged in), show the "Make Post" button
if (accessToken) {
  showMakePostButton();
}
