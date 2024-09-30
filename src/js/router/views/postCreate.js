import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

/**
 * This script ensures that the user is authenticated before allowing them to create a post.
 * 
 * - The `authGuard()` function checks whether the user is authenticated.
 * - The form submission is handled by the `onCreatePost()` function, which is triggered when the user submits the "Create Post" form.
 */

// Ensure the user is authenticated before accessing the create post form
authGuard();

// Add event listener to the "Create Post" form
const form = document.forms.createPost;
form.addEventListener("submit", onCreatePost);
