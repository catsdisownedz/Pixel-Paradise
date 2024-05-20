// Assuming you have this button elsewhere
// Make AJAX request to get status
function getStatus() {
  const statusxhr = new XMLHttpRequest();
  statusxhr.open("GET", "fetchStatus.php", true);

  statusxhr.onload = function () {
    if (this.status == 200) {
      var logged_in = this.responseText === "1" ? true : false;
      console.log(logged_in);
    }
  };

  statusxhr.send();
}

getStatus();

document.getElementById("logoutButton").addEventListener("click", handleLogout);

const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    handleLogout();
  }
});

function handleLogout() {
  console.log("nooooooooo");
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "logout_process.php", true);
  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);
      if (response.status === "success") {
        console.log("Logout successful!");
        window.location.reload(); // Redirect to the login page or update UI as needed
      } else {
        console.log("Logout failed: " + response.message);
      }
    }
  };
  xhr.send();
}

document.addEventListener("DOMContentLoaded", function () {
  const usernameLabel = document.getElementById("usernameLabel");
  const loginForm = document.getElementById("loginForm");
  const popup = document.getElementById("loginPopup");
  const continueGuestLink = document.getElementById("continue");

  if (popup) {
    console.log("md5lnash");
    setTimeout(function () {
      console.log("d5lna");
      popup.classList.add("visible");
      console.log("eshta8alna?");
    }, 3000);
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission
      console.log("we innnn");
      //getting the form data ayoyyyy
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      //making an instance of the formData object

      let formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      function updateLevelDisplay() {
        var level = sessionStorage.getItem("userLevel");
        if (level) {
          document.getElementById("wow").textContent = level;
        }
      }

      //we create the ajax request yay
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "login_process.php", true);

      // Handle the response
      xhr.onload = function () {
        if (this.status == 200) {
          const messageElement = document.getElementById("message");
          const response = JSON.parse(this.responseText);
          if (response.status === "success") {
            console.log("Login successful!");
            messageElement.textContent = "Login successful!";
            usernameLabel.textContent = username;
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";

            sessionStorage.setItem("isLoggedIn", "true"); // Set the login status to true

            // Make an AJAX request to update the level
            const levelXhr = new XMLHttpRequest();
            levelXhr.open("GET", "calculateLevel.php", true);
            levelXhr.onload = function () {
              // if (this.status == 200) {
              //   document.getElementById("wow").textContent = this.responseText;
              // }

              if (this.status == 200) {
                var level = this.responseText;
                sessionStorage.setItem("userLevel", level); // Store the level in sessionStorage
                updateLevelDisplay(); // Update the level display
                console.log("Retrieved level: " + level);
              }

              setTimeout(getStatus, 1000);
            };
            levelXhr.send();

            setTimeout(function () {
              document.getElementById("loginPopup").classList.remove("visible");
              document.getElementById("loginPopup").classList.add("hidden");
            }, 2000);
          } else {
            messageElement.textContent = "Invalid password or username.";
            console.log("Login failed: " + response.message);
          }
        }
      };
      xhr.send(formData);
    });
  }

  if (continueGuestLink) {
    continueGuestLink.addEventListener("click", () => {
      if (popup) {
        popup.classList.remove("visible");
        popup.classList.add("hidden");
      }
    });
  }

  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      sessionStorage.setItem("userLevel", "Leader Board"); // Set the level to "Leader Board"
      sessionStorage.setItem("isLoggedIn", "false"); // Set the login status to false
      updateLevelDisplay(); // Update the level display
    });
  }
});

// const popup = document.getElementById("loginPopup");
// document.addEventListener("DOMContentLoaded", function () {
//   const usernameLabel = document.getElementById("usernameLabel");

//   // if (usernameLabel.textContent === "Guest User") {
//   console.log("md5lnash");
//   setTimeout(function () {
//     console.log("d5lna");
//     //popup.classList.remove("hidden");
//     popup.classList.add("visible");
//     console.log("eshta8alna?");
//   }, 3000);
//   //}
// });

// // Handle form submission (assuming successful login)
// const loginForm = document.getElementById("loginForm");
// loginForm.addEventListener("submit", function (event) {
//   event.preventDefault(); // Prevent default form submission
//   console.log("we innnn");
//   //getting the form data ayoyyyy
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   //making an instance of the formData object

//   let formData = new FormData();
//   formData.append("username", username);
//   formData.append("password", password);

//   function updateLevelDisplay() {
//     var level = sessionStorage.getItem("userLevel");
//     if (level) {
//       document.getElementById("wow").textContent = level;
//     }
//   }

//   //we create the ajax request yay
//   const xhr = new XMLHttpRequest();
//   xhr.open("POST", "login_process.php", true);

//   // Handle the response
//   xhr.onload = function () {
//     if (this.status == 200) {
//       const messageElement = document.getElementById("message");
//       const response = JSON.parse(this.responseText);
//       if (response.status === "success") {
//         console.log("Login successful!");
//         messageElement.textContent = "Login successful!";
//         usernameLabel.textContent = username;
//         document.getElementById("username").value = "";
//         document.getElementById("password").value = "";

//         // Make an AJAX request to update the level
//         const levelXhr = new XMLHttpRequest();
//         levelXhr.open("GET", "calculateLevel.php", true);
//         levelXhr.onload = function () {
//           // if (this.status == 200) {
//           //   document.getElementById("wow").textContent = this.responseText;
//           // }

//           if (this.status == 200) {
//             var level = this.responseText;
//             sessionStorage.setItem("userLevel", level); // Store the level in sessionStorage
//             updateLevelDisplay(); // Update the level display
//             console.log("Retrieved level: " + level);
//           }

//           setTimeout(getStatus, 1000);
//         };
//         levelXhr.send();

//         setTimeout(function () {
//           document.getElementById("loginPopup").classList.remove("visible");
//           document.getElementById("loginPopup").classList.add("hidden");
//         }, 2000);
//       } else {
//         messageElement.textContent = "Invalid password or username.";
//         console.log("Login failed: " + response.message);
//       }
//     }
//   };
//   xhr.send(formData);
// });

// // On page load, update the level display
// updateUserLevelDisplay();
// window.onload = updateLevelDisplay;

// const continueGuestLink = document.getElementById("continue");

// continueGuestLink.addEventListener("click", () => {
//   const loginPopup = document.getElementById("loginPopup");
//   document.getElementById("loginPopup").classList.remove("visible");
//   document.getElementById("loginPopup").classList.add("hidden");
// });

const gameContainer = document.querySelector(".game-container");
const games = document.querySelectorAll(".game");

gameContainer.addEventListener("scroll", () => {
  games.forEach((game) => {
    const gameCenterX = game.offsetLeft + game.offsetWidth / 2;
    const containerCenterX =
      gameContainer.scrollLeft + gameContainer.offsetWidth / 2;

    // Check if game center is within a tolerance range of container center
    const isCentered = Math.abs(gameCenterX - containerCenterX) < 10; // Adjust tolerance as needed

    game.classList.toggle("game-in-view", isCentered);
  });
});
//   const sounds = {};

// Preload game sounds
// const soundElements = document.querySelectorAll(".game[data-sound]");
// soundElements.forEach((game) => {
//   const soundPath = game.dataset.sound;
//   const audio = new Audio(soundPath);
//   sounds[soundPath] = audio;
// });

// Duplicate the games for a looping effect
gameContainer.innerHTML += gameContainer.innerHTML;

let ticking = false;

function resetScroll() {
  const contentWidth = gameContainer.scrollWidth / 2;
  // If the user has scrolled through 75% of the games, duplicate them
  if (gameContainer.scrollLeft >= contentWidth * 0.75) {
    gameContainer.innerHTML += gameContainer.innerHTML;
  }
  // If the user has scrolled past the end of the original games, reset the scroll position
  if (gameContainer.scrollLeft >= contentWidth) {
    gameContainer.scrollLeft = 0;
  }
  ticking = false;
}

// Add scroll event listener to call resetScroll
gameContainer.addEventListener("scroll", function () {
  if (!ticking) {
    window.requestAnimationFrame(resetScroll);
    ticking = true;
  }
});

// // Add mouseover event listener to play sounds
// gameContainer.addEventListener("mouseover", function (event) {
//   if (event.target.classList.contains("game")) {
//     const soundPath = event.target.dataset.sound;
//     sounds[soundPath].play();
//   }
// });

function loadScript(src, callback) {
  var script = document.createElement("script");
  script.src = src;
  script.onload = function () {
    callback();
  };
  document.head.appendChild(script);
}

document.getElementById("singleplayer").addEventListener("click", function () {
  loadScript("Pong/pong.js", function () {
    // Call a function defined in pong.js here
    startSinglePlayerGame();
  });
});

document.getElementById("multiplayer").addEventListener("click", function () {
  loadScript("Pong/pong-multi.js", function () {
    // Call a function defined in pong-multi.js here
    startMultiPlayerGame();
  });
});

document.querySelectorAll(".game").forEach((game) => {
  const img = game.querySelector("img");
  const video = game.querySelector("video");
  img.addEventListener("mouseover", () => {
    video = game.querySelector("video").style.display = "block";
    video.play();
  });

  img.addEventListener("mouseout", () => {
    video.pause();
    video.currentTime = 0; // This will rewind the video to the start
  });
});

const levels = [
  { name: "Lv. 1 Lazy Panda", threshold: 0 },
  { name: "Lv. 2 Grasshopper", threshold: 1000 },
  { name: "Lv. 3 Dragon Warrior", threshold: 2000 },
  { name: "Lv. 4 Mantis", threshold: 3000 },
  { name: "Lv. 5 Viper", threshold: 4000 },
  { name: "Lv. 6 Monkey", threshold: 5000 },
  { name: "Lv. 7 Tigress", threshold: 6000 },
  { name: "Lv. 8 Crane", threshold: 7000 },
  { name: "Lv. 9 Po", threshold: 8000 },
  { name: "Lv. 10 Shifu", threshold: 9000 },
  { name: "Lv. 11 Master Oogway", threshold: 10000 },
  { name: "Lv. 12 Dragon Warrior", threshold: 20000 },
  // ... add more levels as needed
];

function updateUserLevel(score) {
  let currentLevel = levels[0]; // Default to Lv. 1
  for (const level of levels) {
    if (score >= level.threshold) {
      currentLevel = level;
    } else {
      break; // Exit loop if score doesn't meet threshold
    }
  }
  document.getElementById("usernameLabel").textContent = `${currentLevel.name}`;
}

// Create the AJAX request for updating the leaderboard
const leaderboardXhr = new XMLHttpRequest();
leaderboardXhr.open("POST", "updateLeaderboard.php", true);

// Handle the response
leaderboardXhr.onload = function () {
  if (this.status == 200) {
    // Assuming the server responds with the updated leaderboard content
    const response = JSON.parse(this.responseText);
    if (response.status === "success") {
      // Update the leaderboard display element with the new content
      document.getElementById("leaderboard").innerHTML =
        response.newLeaderboardHtml;
      console.log("Leaderboard updated successfully!");
    } else {
      console.log("Failed to update leaderboard: " + response.message);
    }
  }
};

// Add an event listener to the button that triggers the leaderboard update
document.getElementById("submit").addEventListener("click", function () {
  // Send the AJAX request
  leaderboardXhr.send();
});
