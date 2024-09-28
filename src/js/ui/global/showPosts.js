import { headers } from '../../api/headers.js'; 

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
  
      // consoll logge hentede poster
      //console.log('Fetched Posts:', data.data.map(post => ({
        //title: post.title,
        //url: post.media ? post.media.url : 'No media',
        //created: post.created,
      //})));
  
      displayPosts(data.data);
    } catch (error) {
    }
  }
  
  
  function displayPosts(posts) {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
  
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
  

      const mediaUrl = post.media ? post.media.url : 'https://via.placeholder.com/150'; 
      const mediaAlt = post.media ? post.media.alt : 'Default Alt Text'; 
  
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
      
      postsContainer.appendChild(postElement);
    });
  }
  
  fetchAllPosts();