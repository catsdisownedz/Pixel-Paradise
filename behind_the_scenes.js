{/* <script src="/path/to/flickity.pkgd.min.js"></script> */}
const gameList = document.querySelector('.game-container');
const sounds = {};

// Preload game sounds
const soundElements = document.querySelectorAll('.game[data-sound]');
soundElements.forEach(game => {
  const soundPath = game.dataset.sound;
  const audio = new Audio(soundPath);
  sounds[soundPath] = audio;
});

gameList.addEventListener('scroll', () => {
  // Disable scroll snapping at the end of the list
  if (gameList.scrollWidth <= gameList.scrollLeft + gameList.clientWidth) {
    gameList.style.scrollSnapType = 'none';
  } else {
    gameList.style.scrollSnapType = 'x mandatory';
  }
});

gameList.addEventListener('mouseover', function(event) {
  if (event.target.classList.contains('game')) {
    const soundPath = event.target.dataset.sound;
    
  }
});