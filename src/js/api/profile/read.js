import { headers } from '../../api/headers.js'; 
import { API_SOCIAL_PROFILES } from '../../api/constants.js'; 
import { getActiveUser } from "../../utilities/activeUser.js"; 
import { deletePost } from '../../api/post/delete';  // Import the delete function

export async function fetchProfileData() {
    const username = getActiveUser(); 
    if (!username) {
        console.error('No username found in local storage. Cannot fetch profile.');
        return null;
    }

    const apiUrl = `${API_SOCIAL_PROFILES}/${username}`; 

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers(),  
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const profileData = await response.json();
        return profileData.data;  
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
    }
}

export async function fetchProfilePosts() {
    const username = getActiveUser(); 
    if (!username) {
        console.error('No username found in local storage. Cannot fetch posts.');
        return null;
    }

    const apiUrl = `${API_SOCIAL_PROFILES}/${username}/posts`; 

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers(), 
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user posts');
        }

        const postsData = await response.json();
        return postsData.data; 
    } catch (error) {
        console.error('Error fetching user posts:', error.message);
    }
}

export function displayProfileInfo(profileData) {
    if (!profileData) {
        console.error('Profile data is undefined.');
        return; 
    }

    document.getElementById('profile-info').innerHTML = `
        <div>
            <h2>${profileData.name}</h2>
            <div id="profileBanner">
                <img src="${profileData.banner.url}" alt="${profileData.banner.alt}" />
            </div>
            <img id="profilePhoto" src="${profileData.avatar.url}" alt="${profileData.avatar.alt}" />
            <p>Email: ${profileData.email}</p>
            <p>Bio: ${profileData.bio}</p>
            <p>Followers: ${profileData._count.followers}</p>
            <p>Following: ${profileData._count.following}</p>
            <p>Posts: ${profileData._count.posts}</p>
        </div>
    `;
}

export function displayProfilePosts(postsData) {
    let postsHtml = '';
    postsData.forEach(post => {
        const mediaUrl = post.media ? post.media.url : 'https://via.placeholder.com/150'; 
        const mediaAlt = post.media ? post.media.alt : 'Default Alt Text';

        postsHtml += `
            <div class="post" id="post-${post.id}">
                <h3>${post.title || 'Untitled post'}</h3>
                <p>${post.body || 'No content available'}</p>
                <img src="${mediaUrl}" alt="${mediaAlt}" />
                <p>Created: ${new Date(post.created).toLocaleDateString()}</p>
                <p>Updated: ${new Date(post.updated).toLocaleDateString()}</p>
                <div>
                    <a href="/post/edit/?id=${post.id}" class="edit-post" data-post-id="${post.id}">Edit Post</a>
                    <button class="delete-post" data-post-id="${post.id}">Delete Post</button>
                </div>
            </div>
        `;
    });

    const postsContainer = document.querySelector('.posts');
    postsContainer.innerHTML = postsHtml;

    // Add event listeners for delete buttons
    const deleteButtons = document.querySelectorAll('.delete-post');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const postId = event.target.getAttribute('data-post-id');
            const confirmation = window.confirm("Are you sure you want to delete this post?");
            if (confirmation) {
                await deletePost(postId);
                location.reload();  // Reload the page after deletion
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const postsData = await fetchProfilePosts();  
    displayProfilePosts(postsData);  
});
