import { headers } from '../../api/headers.js'; 

/**
 * Fetches all posts from the API and displays the latest 12 on the page.
 *
 * This function sends a GET request to the API to retrieve all posts.
 * If successful, it calls `displayPosts()` to render the posts on the page.
 * 
 * @async
 * @function fetchAllPosts
 * @returns {Promise<void>} Resolves after the posts are fetched and displayed.
 * @throws {Error} Throws an error if the request to fetch posts fails.
 */
export async function fetchAllPosts() {
    const apiUrl = 'https://v2.api.noroff.dev/social/posts';
  
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers(),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
  
      const data = await response.json();
  
      // Display only the latest 12 posts
      const latestPosts = data.data.slice(0, 12);
      displayPosts(latestPosts);
    } catch (error) {
      // Handle the error (could log it or display an error message in the UI)
      console.error('Error fetching posts:', error);
    }
}

/**
 * Displays the list of posts in the DOM.
 *
 * This function takes an array of post objects, creates a new DOM element for each post,
 * and appends them to the `.posts` container. It includes information like the post's title,
 * body, media, tags, comments count, reactions count, and created/updated dates.
 *
 * @function displayPosts
 * @param {Array<Object>} posts - An array of post objects to display.
 */
function displayPosts(posts) {
    const postsContainer = document.querySelector('.posts');  // Using querySelector for an element with a class

    // Clear any existing content in the posts container
    postsContainer.innerHTML = '';
  
    // Loop through the posts and create DOM elements for each
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
  
      // Determine the media URL and alt text (fallback to placeholder if no media exists)
      const mediaUrl = post.media ? post.media.url : 'https://via.placeholder.com/150'; 
      const mediaAlt = post.media ? post.media.alt : 'Default Alt Text'; 
  
      // Create the inner HTML structure for each post (keeping the original structure and classes)
      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <img src="${mediaUrl}" alt="${mediaAlt}" />
        <p>Tags: ${post.tags.join(', ')}</p>
        <p>Comments: ${post._count.comments}</p>
        <p>Reactions: ${post._count.reactions}</p>
        <p>Created: ${new Date(post.created).toLocaleDateString()}</p>
        <p>Updated: ${new Date(post.updated).toLocaleDateString()}</p>
      `;
      
      // Wrap the post content inside a clickable link (without changing existing classes)
      const postLink = document.createElement('a');
      postLink.href = `/post/?id=${post.id}`;
      postLink.classList.add('post-link');  // Add this class for styling the clickable area
      
      postLink.appendChild(postElement);  // Wrap the post element in the link
      
      // Append the post element to the container
      postsContainer.appendChild(postLink);
    });
}

// Fetch and display all posts when the page loads
fetchAllPosts();
