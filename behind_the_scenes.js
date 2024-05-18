// document.addEventListener("DOMContentLoaded", function () {
// Assuming you have this button elsewhere


const usernameLabel = document.getElementById("usernameLabel");
//this isnt working lol
if (usernameLabel !== "Guest User") {
  setTimeout(function () {
    document.getElementById("loginPopup").classList.remove("hidden");
    document.getElementById("loginPopup").classList.add("visible");
  }, 5000);
}

// Handle form submission (assuming successful login)
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  //getting the form data ayoyyyy
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  //making an instance of the formData object 

  let formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

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
        document.getElementById("username").value = '';
        document.getElementById("password").value = '';
        setTimeout(function () {
          document.getElementById("loginPopup").classList.remove("visible");
          document.getElementById("loginPopup").classList.add("hidden");
        }, 2000);
      } else {
        messageElement.textContent = "Invalid password or username."
        console.log("Login failed: " + response.message);
      }
    }
  };
  xhr.send(formData);
});


document.getElementById('logoutButton').addEventListener('click', handleLogout);

const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    handleLogout();
  }
});

function handleLogout() {
  console.log("nooooooooo");
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'logout_process.php', true);
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


const continueGuestLink = document.getElementById('continue');

continueGuestLink.addEventListener('click', () => {
  const loginPopup = document.getElementById('loginPopup');
  document.getElementById("loginPopup").classList.remove("visible");
  document.getElementById("loginPopup").classList.add("hidden");
});

const gameContainer = document.querySelector(".game-container");
const games = document.querySelectorAll('.game');

gameContainer.addEventListener('scroll', () => {
  games.forEach(game => {
    const gameCenterX = game.offsetLeft + game.offsetWidth / 2;
    const containerCenterX = gameContainer.scrollLeft + gameContainer.offsetWidth / 2;

    // Check if game center is within a tolerance range of container center
    const isCentered = Math.abs(gameCenterX - containerCenterX) < 10; // Adjust tolerance as needed

    game.classList.toggle('game-in-view', isCentered);
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

document
  .getElementById("singleplayer")
  .addEventListener("click", function () {
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


document.querySelectorAll('.game').forEach(game => {
  const img = game.querySelector('img');
  const video = game.querySelector('video');
  img.addEventListener('mouseover', () => {

    video = game.querySelector('video').style.display = 'block';
    video.play();
  });

  img.addEventListener('mouseout', () => {
    video.pause();
    video.currentTime = 0; // This will rewind the video to the start
  });
});


