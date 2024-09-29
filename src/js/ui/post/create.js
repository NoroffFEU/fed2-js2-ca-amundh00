import { headers } from '../../api/headers.js'; 
import { API_SOCIAL_POSTS } from '../../api/constants.js'; 


export async function onCreatePost(event) {
  event.preventDefault(); 

  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
  const media = {
    url: document.getElementById('mediaUrl').value,
    alt: document.getElementById('mediaAlt').value,
  };

  const postData = {
    title, 
    body: body || '', 
    tags: tags || [], 
    media: media || null, 
  };

  //console.log('Sending post data:', postData); 

  try {
    const response = await fetch(API_SOCIAL_POSTS, {
      method: 'POST',
      headers: headers(), 
      body: JSON.stringify(postData), 
    });

    if (!response.ok) {
      const errorResponse = await response.json(); 
      //console.error('Response Status:', response.status); 
      //console.error('Error Response:', errorResponse); 
      throw new Error('Failed to create post');
    }

    const responseData = await response.json();
    //console.log('Post created successfully:', responseData);
    return responseData; 
  } catch (error) {
    //console.error('Error creating post:', error.message);
  }
}


document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', onCreatePost);
    } else {
        //console.error('Fant ikke post form.');
    }
});
