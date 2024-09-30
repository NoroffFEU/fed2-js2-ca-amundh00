import { fetchPostById, updatePost } from '../../api/post/update';

/**
 * Extracts the post ID from the URL query parameters.
 *
 * @function getPostIdFromUrl
 * @returns {string|null} The post ID if present in the URL, otherwise null.
 */
function getPostIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

/**
 * Populates the edit form fields with the post data.
 *
 * This function fills in the form fields with the post's title, body, tags, and media data.
 *
 * @function populateEditForm
 * @param {Object} post - The post object containing the post data.
 * @param {string} post.title - The title of the post.
 * @param {string} post.body - The body content of the post.
 * @param {Array<string>} post.tags - An array of tags associated with the post.
 * @param {Object} [post.media] - An object containing media information, if available.
 * @param {string} [post.media.url] - The URL of the media.
 * @param {string} [post.media.alt] - The alt text for the media.
 */
export function populateEditForm(post) {
    document.getElementById('editTitle').value = post.title || '';
    document.getElementById('editBody').value = post.body || '';
    document.getElementById('editTags').value = post.tags.join(', ') || '';
    document.getElementById('editMediaUrl').value = post.media?.url || '';
    document.getElementById('editMediaAlt').value = post.media?.alt || '';
}

/**
 * Handles the form submission for editing a post.
 *
 * This function captures the form data, validates it, and sends an update request to the API.
 * Upon successful update, the user is redirected to the profile page.
 *
 * @async
 * @function onEditPost
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} Resolves after the post is successfully updated or displays an error message.
 * @throws {Error} Throws an error if the post update fails.
 */
export async function onEditPost(event) {
    event.preventDefault();

    // Confirmation before saving the changes
    const confirmation = window.confirm("Are you sure you want to save the changes?");
    if (!confirmation) return;

    const postId = getPostIdFromUrl();
    const title = document.getElementById('editTitle').value;
    const body = document.getElementById('editBody').value;
    const tags = document.getElementById('editTags').value.split(',').map(tag => tag.trim());
    const mediaUrl = document.getElementById('editMediaUrl').value;
    const mediaAlt = document.getElementById('editMediaAlt').value;

    // Validate media URL if present
    let media = null;
    if (mediaUrl) {
        if (!mediaUrl.startsWith('http://') && !mediaUrl.startsWith('https://')) {
            alert('Media URL must be a valid, fully formed URL (e.g., https://example.com/image.jpg).');
            return;
        }
        media = { url: mediaUrl, alt: mediaAlt || '' };
    }

    const updatedPostData = {
        title,
        body: body || '',
        tags: tags.length > 0 ? tags : [],
        media: media || null,
    };

    try {
        const responseData = await updatePost(postId, updatedPostData);
        //console.log('Post updated successfully:', responseData);
        window.location.href = "/profile/";
    } catch (error) {
        // Handle error during post update
        //console.error('Error updating post:', error);
    }
}

/**
 * Initializes the edit post form on page load by fetching the post data and populating the form.
 *
 * This function listens for the `DOMContentLoaded` event and checks for a post ID in the URL.
 * If a post ID is found, it fetches the post data and populates the form with the data.
 * It also adds an event listener to handle the form submission for editing the post.
 *
 * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    const postId = getPostIdFromUrl();
    if (postId) {
        fetchPostById(postId)
            .then(post => populateEditForm(post))
            .catch(error => console.error('Error loading post:', error));
    }

    const editForm = document.getElementById('editPostForm');
    if (editForm) {
        editForm.addEventListener('submit', onEditPost);
    } else {
        //console.error('Edit form not found.');
    }
});
