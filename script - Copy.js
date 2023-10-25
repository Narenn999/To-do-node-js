// Selecting DOM elements
const signupForm = document.getElementById('signupForm');
const userList = document.getElementById('userList');
const imagePreview = document.getElementById('imagePreview');

// Event listener for form submission
signupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const image = document.getElementById('image').files[0];

    // Validate email format (you can add more validation as needed)
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Create user card
    const userCard = document.createElement('div');
    userCard.classList.add('user-card');

    // Create and display user information
    userCard.innerHTML = `
        <h3>${name}</h3>
        <p>Email: ${email}</p>
    `;

    // Display user image if available
    if (image) {
        const imgElement = document.createElement('img');
        imgElement.src = URL.createObjectURL(image);
        userCard.appendChild(imgElement);
    }

    // Create update and delete buttons
    const updateButton = document.createElement('button');
    updateButton.innerText = 'Update';
    updateButton.addEventListener('click', function () {
        makeUserEditable(userCard);
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', function () {
        // Remove user card on delete
        userList.removeChild(userCard);
    });

    // Append buttons to user card
    userCard.appendChild(updateButton);
    userCard.appendChild(deleteButton);

    // Append user card to user list
    userList.appendChild(userCard);

    // Clear form fields
    signupForm.reset();
    imagePreview.innerHTML = ''; // Clear image preview
});

// Function to preview selected image

function previewImage(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.alt = 'Image Preview';

            // Set a fixed width for the image (adjust as needed)
            imgElement.style.width = '200px'; // Change to your preferred size

            // Replace the content of imagePreview
            imagePreview.innerHTML = '';
            imagePreview.appendChild(imgElement);
        };

        reader.readAsDataURL(file);
    }
}

// Function to validate email format
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Function to make user information editable
function makeUserEditable(userCard) {
    const nameElement = userCard.querySelector('h3');
    const emailElement = userCard.querySelector('p');

    // Create input fields for name and email
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = nameElement.innerText;

    const emailInput = document.createElement('input');
    emailInput.type = 'text';
    emailInput.value = emailElement.innerText.replace('Email: ', '');

    // Replace text with input fields
    nameElement.replaceWith(nameInput);
    emailElement.replaceWith(emailInput);

    // Create save button
    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.addEventListener('click', function () {
        saveUserInfo(userCard, nameInput.value, emailInput.value);
    });

    // Append save button
    userCard.appendChild(saveButton);
}

// Function to save edited user information
function saveUserInfo(userCard, newName, newEmail) {
    const nameElement = document.createElement('h3');
    nameElement.innerText = newName;

    const emailElement = document.createElement('p');
    emailElement.innerText = `Email: ${newEmail}`;

    // Replace input fields with new user information
    userCard.querySelector('input[type="text"]').replaceWith(nameElement);
    userCard.querySelector('input[type="text"]').replaceWith(emailElement);

    // Remove save button
    userCard.querySelector('button').remove();
}
