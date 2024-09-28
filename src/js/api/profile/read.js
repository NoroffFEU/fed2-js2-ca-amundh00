import { headers } from '../../api/headers.js'; 
import { API_SOCIAL_PROFILES } from '../../api/constants.js'; 
import { getActiveUser } from "../../utilities/activeUser.js"; 

export async function fetchProfileData() {
    const username = getActiveUser(); 
    //console.log('Active user:', username); 

    if (!username) {
        //console.error('Ingen username funnet. Kan ikke hente profil.');
        return null;
    }

    const apiUrl = `${API_SOCIAL_PROFILES}/${username}`; 
    //console.log('Henter profil fra:', apiUrl); 

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers(), 
        });

        if (!response.ok) {
            //console.error('Response status:', response.status); 
            throw new Error('Failed to fetch user profile');
        }

        const profileData = await response.json();
        //console.log('Hentet profil data:', profileData); 
        return profileData.data; 
    } catch (error) {
        //console.error('Error fetching user profile:', error.message);
    }
}

export function displayProfileInfo(profileData) {
    //console.log('Profil vises:', profileData);

    if (!profileData) {
        //console.error('Profile data is undefined.'); 
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
