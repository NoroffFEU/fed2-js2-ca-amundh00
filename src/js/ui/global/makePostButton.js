let accountDiv = document.getElementById("account");

export async function showMakePostButton() {
    const makePostButton = document.createElement('button');
    makePostButton.textContent = 'Make Post';
    makePostButton.addEventListener('click', function() {
        window.location.href = '../post/create/'
    })
    accountDiv.appendChild(makePostButton)
}