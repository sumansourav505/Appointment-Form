let currentUserId = null; // Store the user's _id if editing

function handleFormSubmit(event) {
  event.preventDefault();

  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };

  if (currentUserId) {
    // Update existing user with PUT request
    axios
      .put(
        `https://crudcrud.com/api/f5953500328a4ebda7cc35b0f1879d6d/appointmentData/${currentUserId}`,
        userDetails
      )
      .then((response) => {
        displayUserOnScreen(response.data);
        currentUserId = null; // Reset the ID after update
      })
      .catch((error) => console.log("Error updating user:", error));
  } else {
    // Add new user with POST request
    axios
      .post(
        "https://crudcrud.com/api/f5953500328a4ebda7cc35b0f1879d6d/appointmentData",
        userDetails
      )
      .then((response) => displayUserOnScreen(response.data))
      .catch((error) => console.log("Error adding user:", error));
  }

  // Clear the input fields
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  // Delete Button Event
  deleteBtn.addEventListener("click", function () {
    axios
      .delete(
        `https://crudcrud.com/api/f5953500328a4ebda7cc35b0f1879d6d/appointmentData/${userDetails._id}`
      )
      .then(() => {
        userList.removeChild(userItem); // Remove item from the DOM if delete was successful
      })
      .catch((error) => console.log("Error deleting user:", error));
  });

  // Edit Button Event
  editBtn.addEventListener("click", function () {
    currentUserId = userDetails._id; // Store the user's _id for update
    document.getElementById("username").value = userDetails.username;
    document.getElementById("email").value = userDetails.email;
    document.getElementById("phone").value = userDetails.phone;

    // Remove the item from the DOM for re-rendering after editing
    userList.removeChild(userItem);
  });
}

function showNewUserOnScreen(userDetails) {
  displayUserOnScreen(userDetails); // Reuse the same display function
}

// Fetch and display all users on page load
window.onload = function () {
  axios
    .get("https://crudcrud.com/api/f5953500328a4ebda7cc35b0f1879d6d/appointmentData")
    .then((response) => {
      response.data.forEach((user) => showNewUserOnScreen(user));
    })
    .catch((error) => console.log("Error fetching users:", error));
};

// Do not touch code below
module.exports = handleFormSubmit;
