import { headers } from '../../api/headers.js'; 
import { API_SOCIAL_POSTS } from '../../api/constants.js'; 

export async function onCreatePost({ title, body, tags, media }) {
  const postData = {
    title, 
    body: body || '', 
    tags: tags || [], 
    media: media || null, 
  };

  try {
    console.log('Sending post data:', postData); // Log post data being sent

    const response = await fetch(API_SOCIAL_POSTS, {
      method: 'POST',
      headers: headers(), 
      body: JSON.stringify(postData), 
    });

    if (!response.ok) {
      const errorResponse = await response.json(); // Get error details
      console.error('Response Status:', response.status); // Log response status
      console.error('Error Response:', errorResponse); // Log error response
      throw new Error('Failed to create post');
    }

    const responseData = await response.json();
    console.log('Post created successfully:', responseData);
    return responseData; 
  } catch (error) {
    console.error('Error creating post:', error.message);
  }
}

// Function to handle the form submission
export async function onCreatePost(event) {
  event.preventDefault(); // Prevent the default form submission

  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
  const media = {
    url: document.getElementById('mediaUrl').value,
    alt: document.getElementById('mediaAlt').value,
  };

  console.log('Form data before creating post:', { title, body, tags, media }); // Log form data

  await createPost({ title, body, tags, media }); // Call createPost with collected data
}

// Event listener for the form submission
document.getElementById('postForm').addEventListener('submit', onCreatePost);

