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
    makePostButton.textContent = 'Make Post';

    // Redirect to post creation page on button click
    makePostButton.addEventListener('click', function() {
        window.location.href = '../post/create/';
    });

    // Append the button to the accountDiv
    accountDiv.appendChild(makePostButton);
}