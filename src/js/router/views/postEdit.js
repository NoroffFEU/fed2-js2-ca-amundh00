console.log('postEdit.js loaded');

import { authGuard } from "../../utilities/authGuard";
import { fetchPostById } from "../../api/profile/update";
import { onUpdatePost } from "../../ui/post/update";  

authGuard(); 


function getPostIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id'); 
}

const postId = getPostIdFromUrl();
console.log('Post ID:', postId);  

async function populateEditForm() {
    console.log('populateEditForm called');  
    try {
        console.log('Fetching post data...');
        const post = await fetchPostById(postId);  
        console.log('Fetched post data:', post);  
        
        if (post) {
            console.log('Populating form with post data...');
            document.getElementById('title').value = post.title || '';
            document.getElementById('body').value = post.body || '';
            document.getElementById('tags').value = post.tags.join(', ') || '';
            document.getElementById('mediaUrl').value = post.media?.url || '';
            document.getElementById('mediaAlt').value = post.media?.alt || '';
        }
    } catch (error) {
        console.error('Error populating the form:', error);
    }
}



window.onload = function() {
    console.log('Window loaded, calling populateEditForm');  
    populateEditForm();
};

