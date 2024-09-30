import { headers } from '../../api/headers.js'; 
import { API_SOCIAL_POSTS } from '../../api/constants.js';

/**
 * Fetches a post by its ID from the API.
 *
 * This function sends a GET request to retrieve the post data by the given post ID.
 * If the request is successful, it returns the post data. If the request fails, an error is thrown.
 *
 * @async
 * @function fetchPostById
 * @param {string} postId - The ID of the post to fetch.
 * @returns {Promise<Object>} A promise that resolves to the post data object.
 * @throws {Error} Will throw an error if the request fails or the response is not OK.
 */
export async function fetchPostById(postId) {
    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
            method: 'GET',
            headers: headers(),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch post data');
        }

        const post = await response.json();
        return post.data;
    } catch (error) {
        // Handle error while fetching post data
        //console.error('Error fetching post:', error);
        throw error;  
    }
}

/**
 * Updates a post by its ID with new data.
 *
 * This function sends a PUT request to update the post with the given post ID and new data.
 * If the update is successful, the updated post data is returned. If the request fails, an error is thrown.
 *
 * @async
 * @function updatePost
 * @param {string} postId - The ID of the post to update.
 * @param {Object} updatedPostData - The new data to update the post with.
 * @returns {Promise<Object>} A promise that resolves to the updated post data.
 * @throws {Error} Will throw an error if the update request fails or the response is not OK.
 */
export async function updatePost(postId, updatedPostData) {
    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
            method: 'PUT',
            headers: headers(), 
            body: JSON.stringify(updatedPostData),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            //console.error('Error Response:', errorResponse);
            throw new Error('Failed to update post');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        // Handle error while updating post
        //console.error('Error updating post:', error);
        throw error;
    }
}
