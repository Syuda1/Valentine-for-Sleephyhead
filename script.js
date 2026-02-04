document.addEventListener('DOMContentLoaded', function() { 
    const noButton = document.getElementById("no"); 
    const yesButton = document.getElementById("yes");
    const gifDiv = document.getElementById("gif"); 
    const bgMusic = document.getElementById("bgMusic");
    
    // Function to move the "No" button away from the interaction point
    function moveAwayFromPoint(x, y) {
        const btnWidth = noButton.offsetWidth;
        const btnHeight = noButton.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Calculate a position at least 100px away from (x, y)
        let newX, newY;
        let attempts = 0;
        do {
            // Random direction but ensure distance
            const angle = Math.random() * 2 * Math.PI; // Random angle
            const distance = 100 + Math.random() * 200; // At least 100px away
            newX = x + Math.cos(angle) * distance;
            newY = y + Math.sin(angle) * distance;
            attempts++;
        } while ((newX < 0 || newX > windowWidth - btnWidth || newY < 0 || newY > windowHeight - btnHeight) && attempts < 10);
        
        // Fallback to random if too many attempts
        if (attempts >= 10) {
            newX = Math.random() * (windowWidth - btnWidth);
            newY = Math.random() * (windowHeight - btnHeight);
        }
        
        // Apply position
        noButton.style.position = 'fixed';
        noButton.style.left = newX + 'px';
        noButton.style.top = newY + 'px';
        noButton.style.transform = 'translate(0, 0)'; // Reset any transforms
    }
    
    // No button moves away on hover (desktop)
    noButton.addEventListener("mouseover", function(e) {
        moveAwayFromPoint(e.clientX, e.clientY);
    });
    
    // No button moves away on touch (mobile)
    noButton.addEventListener("touchstart", function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        moveAwayFromPoint(touch.clientX, touch.clientY);
    });
    
    // Yes button shows surprise
    yesButton.addEventListener("click", function() { 
        gifDiv.style.display = "block"; 
        yesButton.textContent = "YES! 💖🎉"; 
        yesButton.style.background = "linear-gradient(45deg, #ff0066, #ff3399)"; 
        noButton.style.display = "none"; 
        // Start celebrations 
        createConfetti(); 
        createKisses(); 
        startHearts(); 
        // Try to play music 
        bgMusic.play().catch(function(e) { 
            console.log("Audio play failed - user needs to click first"); 
        }); 
    }); 
    
    // Floating hearts 
    function createHeart() { 
        const heart = document.createElement("div"); 
        heart.className = "heart"; 
        heart.innerHTML = "❤️"; 
        heart.style.left = Math.random() * 100 + "vw"; 
        heart.style.fontSize = (15 + Math.random() * 25) + "px"; 
        heart.style.zIndex = "1"; // Behind buttons 
        document.body.appendChild(heart); 
        setTimeout(function() { 
            if (heart.parentNode) { 
                heart.remove(); 
            } 
        }, 6000); 
    } 
    
    function startHearts() { 
        // Create initial hearts 
        for (let i = 0; i < 10; i++) { 
            setTimeout(createHeart, i * 300); 
        } 
        // Keep creating hearts 
        setInterval(createHeart, 800); 
    } 
    
    // Confetti 
    function createConfetti() { 
        const emojis = ["💖", "💕", "💘", "💝", "💓", "💗"]; 
        for(let i = 0; i < 60; i++) { 
            setTimeout(function() { 
                const conf = document.createElement("div"); 
                conf.innerHTML = emojis[Math.floor(Math.random() * emojis.length)]; 
                conf.style.position = "fixed"; 
                conf.style.left = Math.random() * 100 + "vw"; 
                conf.style.top = "10vh"; 
                conf.style.fontSize = "20px"; 
                conf.style.zIndex = "2"; 
                conf.style.animation = "float 3s linear forwards"; 
                document.body.appendChild(conf); 
                setTimeout(function() { 
                    if (conf.parentNode) conf.remove(); 
                }, 3000); 
            }, i * 30); 
        } 
    } 
    
    // Kisses 
    function createKisses() { 
        for(let i = 0; i < 15; i++) { 
            setTimeout(function() { 
                const kiss = document.createElement("div"); 
                kiss.className = "kiss"; 
                kiss.innerHTML = "💋"; 
                kiss.style.left = (window.innerWidth/2 + Math.random()*300 -150) + "px"; 
                kiss.style.top = (window.innerHeight/2) + "px"; 
                kiss.style.zIndex = "3"; 
                document.body.appendChild(kiss); 
                setTimeout(function() { 
                    if (kiss.parentNode) kiss.remove(); 
                }, 2000); 
            }, i * 100); 
        } 
    } 
    
    // Countdown timer 
    function updateCountdown() { 
        const now = new Date(); 
        const currentYear = now.getFullYear(); 
        let valentine = new Date(currentYear, 1, 14); // Feb is month 1 (0-indexed) 
        // If Valentine's has passed this year, target next year 
        if (now > valentine) { 
            valentine = new Date(currentYear + 1, 1, 14); 
        } 
        const diff = valentine - now; 
        const days = Math.floor(diff / (1000 * 60 * 60 * 24)); 
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24); 
        const mins = Math.floor((diff / (1000 * 60)) % 60); 
        document.getElementById("countdown").innerHTML = `⏳ ${days} days ${hours}h ${mins}m until Valentine's Day 💝`; 
    } 
    
    // Start everything 
    updateCountdown(); 
    setInterval(updateCountdown, 60000); // Update every minute 
    startHearts(); 
    
    // Click anywhere to start music (only needed once) 
    let musicStarted = false; 
    document.body.addEventListener("click", function() { 
        if (!musicStarted) { 
            bgMusic.play().catch(function(e) { 
                console.log("User needs to interact first"); 
            }); 
            musicStarted = true; 
        } 
    }); 
});