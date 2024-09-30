import { authGuard } from "../../utilities/authGuard";
import { fetchProfileData, displayProfileInfo } from "../../api/profile/read.js"; 

/**
 * This script ensures that the user is authenticated before accessing their profile page.
 * Once authenticated, it fetches the user's profile data and displays it on the page.
 *
 * - The `authGuard()` function ensures the user is logged in.
 * - The `fetchProfileData()` function retrieves the user's profile data from the API.
 * - The `displayProfileInfo()` function displays the user's profile information on the page.
 */

// Ensure the user is authenticated before loading the profile data
authGuard(); 

/**
 * Once the DOM is fully loaded, this event handler fetches the profile data and displays it.
 * 
 * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch the profile data after DOM is ready
    const profileData = await fetchProfileData(); 

    if (profileData) {
        // If profile data is available, display it
        displayProfileInfo(profileData); 
    } else {
        // Log an error message if profile data could not be retrieved
        //console.error('Failed to retrieve profile data.');
    }
});
