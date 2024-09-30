import { updatePost } from "../../api/profile/update"; 

export async function onUpdatePost(event) {
    event.preventDefault(); 

    const postId = new URLSearchParams(window.location.search).get('id'); 

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

    try {
        const response = await updatePost(postId, postData); 
        console.log('Post updated successfully:', response);
       
    } catch (error) {
        console.error('Error updating post:', error);
    }
}
