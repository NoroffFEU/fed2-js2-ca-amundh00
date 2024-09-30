import { headers } from '../../api/headers.js'; 
import { API_SOCIAL_POSTS } from '../../api/constants.js'; 

/**
 * Handles the form submission for creating a new post.
 *
 * This function captures the form data, prompts the user for confirmation, 
 * and sends a POST request to the API to create the post. Upon successful creation, 
 * the user is redirected to the home page.
 *
 * @async
 * @function onCreatePost
 * @param {Event} event - The form submission event.
 * @returns {Promise<Object|void>} Returns the created post data if successful, or undefined if there is an error.
 * @throws {Error} Throws an error if the post creation fails.
 */
export async function onCreatePost(event) {
    event.preventDefault();  // Prevent the default form submission behavior

    // Confirmation dialog before creating the post
    const confirmation = window.confirm("Are you sure you want to create this post?");
    if (!confirmation) return;  // Exit if the user cancels

    // Capture form input values
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
    const media = {
        url: document.getElementById('mediaUrl').value,
        alt: document.getElementById('mediaAlt').value,
    };

    // Prepare post data object
    const postData = {
        title, 
        body: body || '', 
        tags: tags || [], 
        media: media || null, 
    };

    try {
        // Send POST request to create a new post
        const response = await fetch(API_SOCIAL_POSTS, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify(postData),
        });

        // Check if the response is successful
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error('Failed to create post');
        }

        const responseData = await response.json();
        
        // Redirect to home page after successful creation
        window.location.assign("/");  // Redirect to home page

        return responseData; 
    } catch (error) {
        // Handle any errors during post creation
        //console.error('Error creating post:', error.message);
    }
}

/**
 * Adds an event listener to the post form once the DOM is fully loaded.
 * 
 * This function checks if the post form exists and attaches the `onCreatePost` function
 * as a handler for the form's submission event.
 *
 * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', onCreatePost);
    } else {
        //console.error('Post form not found.');
    }
});
