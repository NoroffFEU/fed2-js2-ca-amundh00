import { headers } from '../../api/headers.js'; 

// src/js/api/profile/update.js

export async function fetchPostById(postId) {
    try {
        const response = await fetch(`/social/posts/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add any authorization headers if needed
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch post data');
        }
        const post = await response.json();
        return post.data;
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
}



export async function updatePost(postId, postData) {
    try {
        const response = await fetch(`/social/posts/${postId}`, {
            method: 'PUT', 
            headers: headers(), 
            body: JSON.stringify(postData),
        });
        if (!response.ok) {
            throw new Error('Failed to update post');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
}
