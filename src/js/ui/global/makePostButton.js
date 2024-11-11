let accountDiv = document.getElementById("account");

/**
 * Creates and displays a "Make Post" button within the account section of the page.
 *
 * This function creates a new button element labeled "Make Post" and appends it to the 
 * `accountDiv` element. When the button is clicked, it redirects the user to the post creation page.
 *
 * @async
 * @function showMakePostButton
 * @returns {Promise<void>} Resolves after the button is created and added to the DOM.
 */
export async function showMakePostButton() {
    const makePostButton = document.createElement('button');
    makePostButton.textContent = '+ Create Post';
    
    // Add Tailwind classes for styling
    makePostButton.className = `
        group relative inline-flex items-center px-6 py-2 
        border-2 border-purple-500 rounded-lg 
        bg-gradient-to-r from-purple-600/50 to-purple-800/50 
        text-white font-semibold shadow-lg 
        transition-all duration-300 ease-in-out
        hover:from-purple-500/60 hover:to-purple-700/60
        hover:scale-105 hover:shadow-purple-500/25
        hover:border-purple-400
    `;

    // Keep existing click handler
    makePostButton.addEventListener('click', function() {
        window.location.href = '../post/create/';
    });

    // Create glow effect element
    const glowEffect = document.createElement('div');
    glowEffect.className = `
        absolute inset-0 rounded-lg opacity-0 
        group-hover:opacity-100 transition-opacity duration-300
        bg-gradient-to-r from-purple-600/10 to-blue-500/10
    `;
    makePostButton.appendChild(glowEffect);

    accountDiv.appendChild(makePostButton);
}