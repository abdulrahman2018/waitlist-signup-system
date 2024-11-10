// scripts.js

document.getElementById("waitlist-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent default form submission

    const email = document.getElementById("email").value;

    if (email) {
        subscribeToBackend(email);
    } else {
        alert("Please enter a valid email.");
    }
});

// Function to handle sending email to backend
function subscribeToBackend(email) {
    const data = { email };

    fetch('http://localhost:3000/api/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            document.getElementById("response-message").textContent = data.message;
            document.getElementById("waitlist-form").reset();
        } else {
            throw new Error('No message returned from backend');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById("response-message").textContent = 'There was an issue signing up. Please try again.';
    });
}
