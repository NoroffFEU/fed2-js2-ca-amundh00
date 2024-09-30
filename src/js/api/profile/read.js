import { headers } from '../../api/headers.js'; 
import { API_SOCIAL_PROFILES } from '../../api/constants.js'; 
import { getActiveUser } from "../../utilities/activeUser.js"; 

// Fetch profile data for the logged-in user
export async function fetchProfileData() {
    const username = getActiveUser();  // Retrieve the active user's username from local storage
    if (!username) {
        console.error('No username found in local storage. Cannot fetch profile.');
        return null;
    }

    const apiUrl = `${API_SOCIAL_PROFILES}/${username}`;  // API endpoint for fetching the user's profile

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers(),  // Send appropriate headers (auth token, etc.)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const profileData = await response.json();
        return profileData.data;  // Assuming profile data is in 'data' field
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
    }
}

// Fetch profile's posts for the logged-in user
export async function fetchProfilePosts() {
    const username = getActiveUser();  // Retrieve the active user's username from local storage
    if (!username) {
        console.error('No username found in local storage. Cannot fetch posts.');
        return null;
    }

    const apiUrl = `${API_SOCIAL_PROFILES}/${username}/posts`;  // API endpoint for fetching the user's posts

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers(),  // Send appropriate headers (auth token, etc.)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user posts');
        }

        const postsData = await response.json();
        return postsData.data;  // Assuming posts data is in 'data' field
    } catch (error) {
        console.error('Error fetching user posts:', error.message);
    }
}

// Display profile information
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

// Display profile posts with checks for media existence
export function displayProfilePosts(postsData) {
    let postsHtml = '';
    postsData.forEach(post => {
        // Check if the media exists before displaying it
        const mediaUrl = post.media ? post.media.url : 'https://via.placeholder.com/150'; 
        const mediaAlt = post.media ? post.media.alt : 'Default Alt Text';

        // Construct the HTML for each post, including an "Edit Post" button with the post ID in the href
        postsHtml += `
            <div class="post">
                <h3>${post.title || 'Untitled post'}</h3>
                <p>${post.body || 'No content available'}</p>
                <img src="${mediaUrl}" alt="${mediaAlt}" />
                <p>Created: ${new Date(post.created).toLocaleDateString()}</p>
                <p>Updated: ${new Date(post.updated).toLocaleDateString()}</p>
                <div>
                    <a href="/post/edit/?id=${post.id}" class="edit-post" data-post-id="${post.id}">Edit Post</a>
                </div>
            </div>
        `;
    });

    const postsContainer = document.querySelector('.posts');
    postsContainer.innerHTML = postsHtml;
}


// Load and display profile and posts on DOM content loaded
document.addEventListener('DOMContentLoaded', async () => {
    const postsData = await fetchProfilePosts();  // Fetch posts for the logged-in user
    displayProfilePosts(postsData);  // Display the posts
});

