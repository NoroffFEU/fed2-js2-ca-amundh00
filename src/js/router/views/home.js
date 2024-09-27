import { authGuard } from "../../utilities/authGuard";
import { headers } from '../api/headers.js'; // Adjust path based on the structure


authGuard();


async function fetchAllPosts() {
  const apiUrl = 'https://v2.api.noroff.dev/social/posts';

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: headers(), // Use headers function here
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const data = await response.json();
    displayPosts(data.data);
  } catch (error) {
    console.error('Error fetching posts:', error.message);
  }
}

// Function to display posts on the page
function displayPosts(posts) {
  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = ''; // Clear existing posts

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <img src="${post.media.url}" alt="${post.media.alt}" />
      <p>Tags: ${post.tags.join(', ')}</p>
      <p>Comments: ${post._count.comments}</p>
      <p>Reactions: ${post._count.reactions}</p>
      <p>Created: ${new Date(post.created).toLocaleDateString()}</p>
      <p>Updated: ${new Date(post.updated).toLocaleDateString()}</p>
    `;
    postsContainer.appendChild(postElement);
  });
}

// Call the function to fetch and display posts
fetchAllPosts();






