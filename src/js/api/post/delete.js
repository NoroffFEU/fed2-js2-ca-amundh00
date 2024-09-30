import { headers } from '../../api/headers.js'; 
import { API_SOCIAL_POSTS } from '../../api/constants.js';

/**
 * Deletes a post by sending a DELETE request to the API.
 *
 * This function sends a DELETE request to the API with the provided post ID.
 * If the deletion is successful, the post is removed; otherwise, an error is thrown.
 *
 * @async
 * @function deletePost
 * @param {string} postId - The ID of the post to be deleted.
 * @returns {Promise<void>} Resolves when the post is successfully deleted, or throws an error if the deletion fails.
 * @throws {Error} Will throw an error if the delete request fails or the response is not OK.
 */
export async function deletePost(postId) {
    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
            method: 'DELETE',
            headers: headers(), 
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            //console.error('Error Response:', errorResponse);
            throw new Error('Failed to delete post');
        }

        //console.log('Post deleted successfully');
    } catch (error) {
        // Handle error while trying to delete the post
        //console.error('Error deleting post:', error);
    }
}
