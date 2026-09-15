const canvas = 
document.getElementById("sparkleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
let sparkles = [];
function createSparkle() {
    const sparkle = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.8 + 0.2,
        opacity: 1,
        twinkle: Math.random() * 0.02 + 0.005,
   
    };
    sparkles.push(sparkle);
}
createSparkle();
setInterval(createSparkle, 100);
console.log(sparkles);
function drawSparkles() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
sparkles.forEach(sparkle=> {
    ctx.beginPath();
    ctx.moveTo(sparkle.x, sparkle.y - sparkle.size * 3);
    ctx.lineTo(sparkle.x + sparkle.size, sparkle.y - sparkle.size);
    ctx.lineTo(sparkle.x + sparkle.size * 3, sparkle.y);
    ctx.lineTo(sparkle.x + sparkle.size, sparkle.y + sparkle.size);
    ctx.lineTo(sparkle.x, sparkle.y + sparkle.size * 3);
    ctx.lineTo(sparkle.x - sparkle.size, sparkle.y + sparkle.size);
    ctx.lineTo(sparkle.x - sparkle.size * 3, sparkle.y);
    ctx.lineTo(sparkle.x - sparkle.size, sparkle.y - sparkle.size);
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(200, 144, 32, ${sparkle.opacity})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgb(200, 144, 32)";
    ctx.stroke();
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgb(200, 144, 32)";
    
    sparkle.y -= sparkle.speed;
    sparkle.x+= Math.sin(sparkle.y * 0.01) * 0.2;
    sparkle.opacity -= sparkle.twinkle;
    if(sparkle.opacity <= 0.2) sparkle.twinkle= 
-Math.abs(sparkle.twinkle);
    if(sparkle.opacity >= 1) sparkle.twinkle= 
Math.abs(sparkle.twinkle);
});
}
drawSparkles();
function animate() {
    drawSparkles();
    requestAnimationFrame(animate);
}
animate();
console.log(sparkles);

const ghostButton = document.getElementById("ghostButton");
const introMessage = document.getElementById("intro-message");
const balloonContainer = document.getElementById("balloonContainer");
const cardDeck = document.getElementById("cardDeck");
const scene = document.getElementById("scene");
const memoryCards = document.querySelectorAll(".memory-card");
const ghostNextButton = document.getElementById("ghostNextButton");
const nextThings = document.getElementById("nextThings");

ghostButton.addEventListener("click", function() {
ghostButton.style.display = "none";
introMessage.style.display = "none";
    balloonContainer.classList.add("hidden");
    cardDeck.classList.add("active");
    ghostNextButton.classList.add("visible");
    setTimeout(() => {
        memoryCards.forEach((card) => card.classList.add("revealed"));
    }, 1400);
    setTimeout(() => {
        balloonContainer.innerHTML = "";
    }, 500);
});

memoryCards.forEach((card) => {
    card.addEventListener("click", () => {
        const wasOpen = card.classList.contains("open");
        memoryCards.forEach((item) => item.classList.remove("open"));
        scene.classList.toggle("card-focus", !wasOpen);
        card.classList.toggle("open", !wasOpen);
    });
});

ghostNextButton.addEventListener("click", () => {
    const cardExitDelay = 950;
    const nextSectionScrollDuration = 1200;

    scene.classList.remove("card-focus");
    memoryCards.forEach((card) => card.classList.remove("open"));
    cardDeck.classList.add("leaving");
    ghostNextButton.classList.remove("visible");

    setTimeout(() => {
        nextThings.classList.add("visible");
        smoothScrollTo(nextThings.offsetTop, nextSectionScrollDuration);
    }, cardExitDelay);
});

function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, startY + distance * easedProgress);

        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
}

const words = ["Happy", "Birthday", "Spooky!"];
const colors = ["#632024", "#2b1007", "#9d4946"];
let currentBalloon = 0;
function createBalloon(index) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    const startX = Math.random() * 180 + 50;
    const startY = window.innerHeight * (0.7 + Math.random() * 0.2);
    balloon.style.left = `${startX}%`;
    balloon.style.top = `${startY}%`;
    balloon.style.backgroundColor = colors[index];
    balloonContainer.appendChild(balloon);
    setTimeout(() => {
        balloon.style.left = `${25 + index * 25}%`;
        balloon.style.top = "30%";
    }, 100);

    setTimeout(() => {
        balloon.classList.add("floating");
    }, 1700);

    setTimeout(() => {
        balloon.classList.add("sway");
    }, 100);

    balloon.addEventListener("click", () => {
        balloon.classList.remove("floating");
        balloon.classList.add("popped");
        const message = document.createElement("div");
        message.textContent = words[index];
        message.classList.add("balloonWord");
        message.style.left = balloon.style.left;
        message.style.top = "150px";
        balloonContainer.appendChild(message);
        setTimeout(() => {
            balloon.remove();
        }, 300);
        currentBalloon++;
        if (currentBalloon < words.length) {
            setTimeout(() => {
                createBalloon(currentBalloon);
            }, 700);
        }
    });
}
createBalloon(0);