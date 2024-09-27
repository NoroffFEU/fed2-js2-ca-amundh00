// Function to fetch profile data
export async function readProfile(userName) {
    const apiUrl = `https://v2.api.noroff.dev/social/profiles/${userName}`;
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
  
      const profileData = await response.json();
      displayProfileInfo(profileData); // Call display function with profile data
    } catch (error) {
      console.error('Error fetching profile data:', error.message);
      alert('Failed to load profile information.');
    }
  }
  
  // Function to display profile information on the page
  function displayProfileInfo(data) {
    document.getElementById('profile-info').innerHTML = `
      <h2>${data.name}</h2>
      <img src="${data.avatar.url}" alt="${data.avatar.alt}" />
      <p>${data.bio}</p>
      <p>Followers: ${data._count.followers}</p>
      <p>Following: ${data._count.following}</p>
      <p>Posts: ${data._count.posts}</p>
    `;
  }
  
  // Usage example
  const username = localStorage.getItem('userName');
  if (username) {
    readProfile(username);
  }
  
  // Placeholder for readProfiles function
  export async function readProfiles(limit, page) {
    // Functionality to be implemented
  }
  