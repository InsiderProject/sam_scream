const startButton = document.getElementById('start-button');

startButton.addEventListener('click', () => {
  // Add your button click logic here
  // For example, you can redirect to your game page
window.location.href = 'index.html';
});

// Add your interactive button animations here
// For example, you can add a pulsing effect
startButton.addEventListener('mouseover', () => {
startButton.classList.add('pulse');
});

startButton.addEventListener('mouseout', () => {
startButton.classList.remove('pulse');
});