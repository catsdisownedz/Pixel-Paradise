// document.addEventListener("DOMContentLoaded", function () {
  const gameContainer = document.querySelector(".game-container");
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
    
    video = game.querySelector('video').style.display= 'block';
    video.play();
  });

  img.addEventListener('mouseout', () => {
    video.pause();
    video.currentTime = 0; // This will rewind the video to the start
  });
});

