// DOM Elements
const targetBox = document.getElementById('targetBox');
const gameContainer = document.querySelector('.game-container');
const results = document.getElementById('results');
const currentTimeDisplay = document.querySelector('.current-time');
const bestTimeDisplay = document.getElementById('bestTime');
const attemptsDisplay = document.getElementById('attempts');
const averageTimeDisplay = document.getElementById('averageTime');

// Game State Variables
let gameStarted = false;
let startTime;
let timeoutId;
let attempts = 0;
let totalReactionTime = 0;
let bestTime = null;

// Game dimensions
const containerWidth = gameContainer.clientWidth;
const containerHeight = gameContainer.clientHeight;
const boxWidth = targetBox.clientWidth;
const boxHeight = targetBox.clientHeight;

// Initial setup - hide the box
targetBox.style.display = 'none';

/**
 * Starts the game by showing the target box after a random delay
 */
function startGame() {
    // Reset box appearance
    targetBox.style.display = 'flex';
    targetBox.style.backgroundColor = '#e74c3c';
    targetBox.textContent = 'Click Me!';
    
    // Calculate random delay (1-3 seconds)
    const delay = Math.random() * 2000 + 1000;
    
    // Set timeout to show the box after delay
    timeoutId = setTimeout(() => {
        positionBox();
        startTime = Date.now();
        gameStarted = true;
    }, delay);
}

/**
 * Positions the box randomly within the game container
 */
function positionBox() {
    const maxX = containerWidth - boxWidth;
    const maxY = containerHeight - boxHeight;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    targetBox.style.left = `${randomX}px`;
    targetBox.style.top = `${randomY}px`;
}

/**
 * Handles the target box click event
 */
function handleClick() {
    if (!gameStarted) return;
    
    // Calculate reaction time
    const reactionTime = Date.now() - startTime;
    gameStarted = false;
    
    // Update game stats
    attempts++;
    totalReactionTime += reactionTime;
    const averageTime = Math.round(totalReactionTime / attempts);
    
    // Update best time if applicable
    if (!bestTime || reactionTime < bestTime) {
        bestTime = reactionTime;
        bestTimeDisplay.textContent = `Best Time: ${bestTime}ms`;
    }
    
    // Update UI
    targetBox.style.backgroundColor = '#2ecc71';
    targetBox.textContent = '✓';
    currentTimeDisplay.textContent = `Your reaction time: ${reactionTime}ms`;
    attemptsDisplay.textContent = attempts;
    averageTimeDisplay.textContent = averageTime;
    
    // Prepare for next round after 1.5 seconds
    setTimeout(startGame, 1500);
}

// Event Listeners
targetBox.addEventListener('click', handleClick);
gameContainer.addEventListener('click', () => {
    if (!gameStarted && attempts === 0) {
        // Start game on first container click
        startGame();
    }
});

// Initialize the game
startGame();