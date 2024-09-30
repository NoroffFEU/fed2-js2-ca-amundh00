import { headers } from '../../api/headers.js'; 

/**
 * Get the post ID from the URL query string.
 * 
 * This function extracts the `id` parameter from the current URL.
 * 
 * @returns {string} The post ID from the URL.
 */
function getPostIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');  // Returns the 'id' from the URL
}

/**
 * Fetches a single post by ID from the API.
 * 
 * @async
 * @function fetchPostById
 * @param {string} postId - The ID of the post to fetch.
 * @returns {Promise<void>} Resolves after the post is fetched and displayed.
 * @throws {Error} Throws an error if the request to fetch the post fails.
 */
async function fetchPostById(postId) {
    const apiUrl = `https://v2.api.noroff.dev/social/posts/${postId}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers(),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch the post');
        }

        const post = await response.json();
        console.log('Fetched Post:', post);  // Check the structure of the data again
        displayPost(post.data);  // Access the data field of the fetched post
    } catch (error) {
        console.error('Error fetching the post:', error);
    }
}

/**
 * Displays the fetched post in the DOM.
 * 
 * This function updates the DOM to show the details of the fetched post.
 * 
 * @function displayPost
 * @param {Object} post - The post object containing details like title, body, media, etc.
 */
function displayPost(post) {
    const postDetailsContainer = document.getElementById('post-details');

    // Determine the media URL and alt text (fallback to placeholder if no media exists)
    const mediaUrl = post.media ? post.media.url : 'https://via.placeholder.com/150'; 
    const mediaAlt = post.media ? post.media.alt || 'No description available' : 'Image Not Available'; 

    // Check if tags exist and are an array, otherwise fallback to an empty array
    const tags = Array.isArray(post.tags) && post.tags.length > 0 ? post.tags.join(', ') : 'No tags available';

    // Check if _count exists and has the necessary properties (comments, reactions)
    const commentsCount = post._count && post._count.comments !== undefined ? post._count.comments : 0;
    const reactionsCount = post._count && post._count.reactions !== undefined ? post._count.reactions : 0;

    // Create the HTML structure for the post
    postDetailsContainer.innerHTML = `
        <div>
            <div>
                <h2>${post.title}</h2>
                <img src="${mediaUrl}" alt="${mediaAlt}" class="post-image" />
            </div>
            
            <div>
                <p>Description: ${post.body}</p>
                <p><strong>Tags:</strong> ${tags}</p>
                <p><strong>Created:</strong> ${new Date(post.created).toLocaleDateString()}</p>
                <p><strong>Updated:</strong> ${new Date(post.updated).toLocaleDateString()}</p>
            </div>
        </div>
    `;
}



// When the page loads, get the post ID from the URL and fetch the post
const postId = getPostIdFromUrl();
if (postId) {
    fetchPostById(postId);
} else {
    console.error('No post ID found in the URL');
}
