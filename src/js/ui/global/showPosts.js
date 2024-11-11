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
      postElement.classList.add(
        'group', 'relative', 'bg-gradient-to-br', 'from-gray-800', 'via-gray-900', 'to-gray-800',
        'border-2', 'border-purple-600', 'rounded-lg', 'overflow-hidden', 'shadow-lg',
        'transition-all', 'duration-300', 'ease-in-out',
        'hover:scale-[1.02]', 'hover:shadow-2xl', 'hover:shadow-purple-500/20',
        'hover:border-purple-400'
      );

      const mediaUrl = post.media ? post.media.url : 'https://via.placeholder.com/150';
      const mediaAlt = post.media ? post.media.alt : 'Default Alt Text';

      postElement.innerHTML = `
        <!-- Glow effect -->
        <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    bg-gradient-to-r from-purple-600/10 to-blue-500/10"></div>

        <!-- Image container with fixed dimensions -->
        <div class="relative w-full h-[200px] overflow-hidden border-b border-purple-600/30">
          <img src="${mediaUrl}" 
               alt="${mediaAlt}" 
               class="w-full h-full object-cover max-w-[400px] max-h-[200px] mx-auto transition-transform duration-300 group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        </div>

        <!-- Content with fixed height and truncation -->
        <div class="p-6 relative bg-gradient-to-b from-gray-800/50 to-gray-900/50 h-[200px] flex flex-col">
          <h2 class="text-xl font-bold text-purple-400 mb-3 transition-colors duration-300 group-hover:text-purple-300 truncate">
            ${post.title}
          </h2>
          
          <p class="text-sm text-purple-200/80 mb-4 line-clamp-3 flex-grow">
            ${post.body}
          </p>
          
          <div class="text-xs text-purple-400/60">
            <p class="truncate mb-2">Tags: ${post.tags.join(', ')}</p>
            
            <div class="flex justify-between items-center text-xs text-purple-400/60 border-t border-purple-600/20 pt-4 mt-4">
              <span>Created: ${new Date(post.created).toLocaleDateString()}</span>
              <span>Updated: ${new Date(post.updated).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      `;
      
      const postLink = document.createElement('a');
      postLink.href = `/post/?id=${post.id}`;
      postLink.classList.add('block', 'h-full');  // Make entire card clickable
      
      postLink.appendChild(postElement);
      postsContainer.appendChild(postLink);
    });
}

// Fetch and display all posts when the page loads
fetchAllPosts();
