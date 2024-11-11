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

    document.getElementById('profile-info').innerHTML = displayProfile(profileData);
}

function displayProfile(profileData) {
    return `
        <div class="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-lg shadow-xl overflow-hidden">
            <!-- Banner Image - taller and full width -->
            <div class="w-full h-[300px] relative overflow-hidden">
                <img src="${profileData.banner.url}" 
                     alt="${profileData.banner.alt}"
                     class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-gray-900"></div>
            </div>
            
            <!-- Avatar - larger and better positioned -->
            <div class="absolute left-1/2 transform -translate-x-1/2 -mt-28">
                <div class="relative">
                    <div class="absolute inset-0 rounded-full bg-purple-600/30 blur-md transform scale-110"></div>
                    <img src="${profileData.avatar.url}" 
                         alt="${profileData.avatar.alt}"
                         class="relative w-40 h-40 rounded-full border-4 border-purple-600 shadow-2xl object-cover" />
                </div>
            </div>

            <!-- Profile Info -->
            <div class="text-center mt-16 p-8">
                <h2 class="text-3xl font-bold text-purple-400 mb-4">${profileData.name}</h2>
                
                <p class="text-purple-300 mb-2">${profileData.email}</p>
                <p class="text-purple-300 mb-6 max-w-2xl mx-auto">${profileData.bio}</p>
                
                <!-- Stats Grid -->
                <div class="grid grid-cols-3 gap-4 text-center border-t border-purple-600/30 pt-6 max-w-2xl mx-auto">
                    <div class="p-4 hover:bg-purple-600/10 rounded-lg transition-colors duration-300">
                        <p class="text-2xl font-bold text-purple-400">${profileData._count.followers}</p>
                        <p class="text-sm text-purple-300">Followers</p>
                    </div>
                    <div class="p-4 hover:bg-purple-600/10 rounded-lg transition-colors duration-300">
                        <p class="text-2xl font-bold text-purple-400">${profileData._count.following}</p>
                        <p class="text-sm text-purple-300">Following</p>
                    </div>
                    <div class="p-4 hover:bg-purple-600/10 rounded-lg transition-colors duration-300">
                        <p class="text-2xl font-bold text-purple-400">${profileData._count.posts}</p>
                        <p class="text-sm text-purple-300">Posts</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function displayProfilePosts(postsData) {
    let postsHtml = '';
    postsData.forEach(post => {
        const mediaUrl = post.media ? post.media.url : 'https://via.placeholder.com/150'; 
        const mediaAlt = post.media ? post.media.alt : 'Default Alt Text';

        postsHtml += `
            <div class="group relative bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 
                        border-2 border-purple-600 rounded-lg overflow-hidden shadow-lg 
                        transition-all duration-300 ease-in-out
                        hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20
                        hover:border-purple-400" id="post-${post.id}">
                
                <!-- Glow effect -->
                <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            bg-gradient-to-r from-purple-600/10 to-blue-500/10"></div>

                <!-- Image container -->
                <div class="relative w-full h-[200px] overflow-hidden border-b border-purple-600/30">
                    <img src="${mediaUrl}" 
                         alt="${mediaAlt}" 
                         class="w-full h-full object-cover max-w-[400px] max-h-[200px] mx-auto transition-transform duration-300 group-hover:scale-110" />
                    <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                </div>

                <!-- Content -->
                <div class="p-6 relative bg-gradient-to-b from-gray-800/50 to-gray-900/50">
                    <h3 class="text-xl font-bold text-purple-400 mb-3 truncate">${post.title || 'Untitled post'}</h3>
                    <p class="text-sm text-purple-200/80 mb-4 line-clamp-3">${post.body || 'No content available'}</p>
                    
                    <!-- Meta info -->
                    <div class="text-xs text-purple-400/60 border-t border-purple-600/20 pt-4 mt-4">
                        <div class="flex justify-between mb-2">
                            <span>Created: ${new Date(post.created).toLocaleDateString()}</span>
                            <span>Updated: ${new Date(post.updated).toLocaleDateString()}</span>
                        </div>
                        
                        <!-- Actions -->
                        <div class="flex justify-end space-x-4 mt-4">
                            <a href="/post/edit/?id=${post.id}" 
                               class="text-purple-400 hover:text-purple-300 transition-colors duration-300">Edit Post</a>
                            <button class="delete-post text-red-400 hover:text-red-300 transition-colors duration-300" 
                                    data-post-id="${post.id}">Delete Post</button>
                        </div>
                    </div>
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
