import { authGuard } from "../../utilities/authGuard";
import { fetchProfileData, displayProfileInfo } from "../../api/profile/read.js"; 

authGuard(); 

document.addEventListener('DOMContentLoaded', async () => {
    //console.log('DOM fully loaded and parsed');
    const profileData = await fetchProfileData(); 

    if (profileData) {
        //console.log('Profile data found:', profileData); 
        displayProfileInfo(profileData); // Call display only if profileData exists
    } else {
        //console.error('Failed to retrieve profile data.'); 
    }
});
