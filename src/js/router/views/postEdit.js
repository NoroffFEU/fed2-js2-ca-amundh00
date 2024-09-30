import { fetchPostById } from '../../api/post/update';
import { populateEditForm, onEditPost } from '../../ui/post/update.js'; 

/**
 * Extracts the post ID from the current URL's query parameters.
 *
 * @function getPostIdFromUrl
 * @returns {string|null} The post ID if present in the URL, otherwise null.
 */
function getPostIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id'); 
}

/**
 * Initializes the edit post form by fetching the post data using the post ID from the URL
 * and populating the form with the post data. Adds an event listener to handle the form submission.
 *
 * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    const postId = getPostIdFromUrl();
    
    // If the post ID is available, fetch the post and populate the form
    if (postId) {
        fetchPostById(postId) 
            .then(post => populateEditForm(post)) // Populate form with post data
            .catch(error => console.error('Error loading post:', error)); // Log any error during post fetch
    }

    // Get the edit form and attach the event listener for form submission
    const editForm = document.getElementById('editPostForm'); 
    if (editForm) {
        editForm.addEventListener('submit', onEditPost); // Add submit event listener to edit the post
    } else {
        console.error('Edit form not found.');
    }
});
