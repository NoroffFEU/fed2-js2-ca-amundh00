// readProfile.js
import { API_SOCIAL_PROFILES } from "../constants.js";
import { API_KEY } from "../constants";
import { headers } from "../../api/headers";

// read.js
export async function readProfile(userName) {
    const apiUrl = `https://v2.api.noroff.dev/social/profiles/${userName}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers(), // Use the headers function
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
  
      const profileData = await response.json();
      displayProfileInfo(profileData.data);
    } catch (error) {
      console.error('Error fetching profile data:', error.message);
    }
  }
  
    
  // Function to display profile information on the page
  function displayProfileInfo(data) {
    document.getElementById('profile-info').innerHTML = `
      <h2>${data.name}</h2>
      <img src="${data.banner.url}" alt="${data.banner.alt}" />
      <img src="${data.avatar.url}" alt="${data.avatar.alt}" />
      <p>${data.bio}</p>
      <p>Followers: ${data._count.followers}</p>
      <p>Following: ${data._count.following}</p>
      <p>Posts: ${data._count.posts}</p>
    `;
  }

  