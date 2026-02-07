const yesBtnWrapper = document.querySelector('.yesBtn');
const noBtnWrapper = document.querySelector('.noBtn');
const yesButton = document.getElementById('yes');
const noButton = document.getElementById('no');
const initialContainer = document.getElementById('initial-question');

let heartInterval;

// 1. PHASE TRANSITIONS

/**
 * Moves from Phase 1 (Question) to Phase 2 (Envelope)
 */
function yesButtonClicked() {
    initialContainer.style.display = 'none';
    document.getElementById('reveal-screen').style.display = 'flex';
}

/**
 * Moves from Phase 2 (Envelope) to Phase 3 (Letter + Heart Rain)
 */
function openLetter() {
    const audio = document.getElementById("loveSong"); // Find the player
    
    document.getElementById('reveal-screen').style.display = 'none';
    document.getElementById('letter-container').style.display = 'flex';
    
    audio.play(); // This starts the music!
    
    heartInterval = setInterval(createHeart, 300);
}
/**
 * Moves from Phase 3 (Letter) to Phase 4 (Carousel + Sparkles)
 */
function showFinalPage() {
    // Stop the hearts from the letter page
    clearInterval(heartInterval);
    document.getElementById('letter-container').style.display = 'none';
    
    // Show the Photo Carousel
    document.getElementById('bg-grid').style.display = 'flex';
    
    // Create the final "I Love You" card dynamically
    const finalCard = document.createElement('div');
    finalCard.className = 'container';
    finalCard.style.zIndex = "20"; // Keep it above the carousel
    finalCard.innerHTML = `
        <img src="https://gifdb.com/images/thumb/milk-and-mocha-bears-squish-hugs-toube8peg2r7wdw0.gif" style="height: 400px;" />
        <div><p style="font-size: 24px;">AYEEEEEE!!!! I loveeeee youu mere patidev ❤️❤️❤️ </p></div>
    `;
    document.body.appendChild(finalCard);

    // Start Sparkle effect for the final page
    setInterval(createSparkle, 150);
}

// 2. ANIMATION EFFECTS

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-fall');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's'; 
    heart.style.fontSize = Math.random() * 20 + 15 + 'px';
    document.body.appendChild(heart);

    setTimeout(() => { heart.remove(); }, 5000);
}

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    document.body.appendChild(sparkle);

    setTimeout(() => { sparkle.remove(); }, 1000);
}

// 3. ORIGINAL BUTTON LOGIC

function centerButtons() {
    if (!initialContainer || initialContainer.style.display === 'none') return;
    
    const containerWidth = initialContainer.clientWidth;
    const containerHeight = initialContainer.clientHeight;
    const buttonWidth = yesButton.offsetWidth;
    const buttonHeight = yesButton.offsetHeight;
    const spaceBetweenButtons = 20;

    const totalButtonWidth = buttonWidth * 2 + spaceBetweenButtons;
    const initialTop = containerHeight - buttonHeight - 30; 

    yesBtnWrapper.style.left = `${(containerWidth - totalButtonWidth) / 2}px`;
    yesBtnWrapper.style.top = `${initialTop}px`;

    noBtnWrapper.style.left = `${(containerWidth - totalButtonWidth) / 2 + buttonWidth + spaceBetweenButtons}px`;
    noBtnWrapper.style.top = `${initialTop}px`;
}

function moveNoButton() {
    const containerRect = initialContainer.getBoundingClientRect();
    const buttonRect = noBtnWrapper.getBoundingClientRect();

    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtnWrapper.style.left = `${randomX}px`;
    noBtnWrapper.style.top = `${randomY}px`;
}

// 4. EVENT LISTENERS
yesButton.addEventListener('click', yesButtonClicked);
noBtnWrapper.addEventListener('mouseover', moveNoButton);

window.addEventListener('load', centerButtons);
window.addEventListener('resize', centerButtons);