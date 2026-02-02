document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });



    // 'Why I Love You' Generator Logic
    const reasons = [
        "Magnifique",
        "Intelligente",
        "Douce",
        "Brillante",
        "Généreuse",
        "Drôle",
        "Unique",
        "Attentive",
        "Passionnée",
        "Rayonnante",
        "Chaleureuse",
        "Gentille",
        "Belle",
        "Rayonnante",
        "Parfaite"
    ];

    window.generateReason = function () {
        const display = document.getElementById('reason-display');
        const randomIndex = Math.floor(Math.random() * reasons.length);

        // Simple fade effect
        display.style.opacity = '0';
        setTimeout(() => {
            display.innerText = reasons[randomIndex];
            display.style.opacity = '1';
        }, 300);
    };

    // Password Protection Logic
    window.checkPassword = function () {
        const input = document.getElementById('password-input').value;
        const errorMsg = document.getElementById('error-msg');

        if (input === '130825') {
            document.getElementById('login-overlay').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('login-overlay').style.display = 'none';
            }, 500);
            sessionStorage.setItem('authorized', 'true');
        } else {
            errorMsg.style.display = 'block';
            // Shake effect
            const loginBox = document.querySelector('.login-box');
            loginBox.style.transform = 'translateX(10px)';
            setTimeout(() => {
                loginBox.style.transform = 'translateX(-10px)';
                setTimeout(() => {
                    loginBox.style.transform = 'translateX(0)';
                }, 100);
            }, 100);
        }
    };

    // Check if already authorized
    if (sessionStorage.getItem('authorized') === 'true') {
        document.getElementById('login-overlay').style.display = 'none';
    }

    // Scratch Card Logic
    const canvas = document.getElementById('scratch-canvas');
    let ctx;

    if (canvas) {
        ctx = canvas.getContext('2d');
        // Initial setup moved to openScratch to ensure it draws effectively when visible
    }

    window.openScratch = function () {
        const overlay = document.getElementById('scratch-overlay');
        overlay.style.display = 'flex';
        // Force reflow
        void overlay.offsetWidth;
        overlay.style.opacity = '1';

        // Re-initialize canvas here to ensure size/rendering is correct
        if (canvas && ctx) {
            // Initialize Canvas
            ctx.fillStyle = '#fbcfe8'; // Pink cover
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add text "Gratte ici"
            ctx.fillStyle = '#db2777';
            ctx.font = '20px Dancing Script';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText("Gratte ici pour découvrir... 💋", canvas.width / 2, canvas.height / 2);
        }

        // Trigger Confetti after modal appears
        if (typeof confetti === 'function') {
            const count = 200;
            const defaults = {
                origin: { y: 0.7 },
                zIndex: 99999, /* Ensure on top of modal */
                colors: ['#db2777', '#be185d', '#fbcfe8', '#831843'] /* Site Palette */
            };

            function fire(particleRatio, opts) {
                confetti(Object.assign({}, defaults, opts, {
                    particleCount: Math.floor(count * particleRatio)
                }));
            }

            // Delay slighty to sync with window appearance
            setTimeout(() => {
                fire(0.25, {
                    spread: 26,
                    startVelocity: 55,
                });
                fire(0.2, {
                    spread: 60,
                });
                fire(0.35, {
                    spread: 100,
                    decay: 0.91,
                    scalar: 0.8
                });
                fire(0.1, {
                    spread: 120,
                    startVelocity: 25,
                    decay: 0.92,
                    scalar: 1.2
                });
                fire(0.1, {
                    spread: 120,
                    startVelocity: 45,
                });
            }, 300); // 300ms delay for modal fade-in
        }
    }

    window.closeScratch = function (e) {
        // Just verify target if needed, but the onclicks in HTML handle propogation logic mostly
        const overlay = document.getElementById('scratch-overlay');
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }

    if (canvas) {
        // ... (Drawing logic remains same, just ensure context is valid)
        // Drawing settings
        ctx.lineWidth = 25;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        function getMousePos(e) {
            const rect = canvas.getBoundingClientRect();
            let clientX, clientY;

            if (e.changedTouches) {
                clientX = e.changedTouches[0].clientX;
                clientY = e.changedTouches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        }

        function startDrawing(e) {
            isDrawing = true;
            ctx.globalCompositeOperation = 'destination-out'; // Erase mode
            draw(e);
        }

        function stopDrawing() {
            isDrawing = false;
        }

        function draw(e) {
            if (!isDrawing) return;
            e.preventDefault(); // Prevent scrolling on touch

            const pos = getMousePos(e);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        }

        // Event Listeners
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseleave', stopDrawing);

        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', stopDrawing);
    }

    // Music Player Logic for Photos
    let currentAudio = null;

    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevents flipping

            // Stop current
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }

            const audioSrc = this.getAttribute('data-audio');
            if (audioSrc) {
                const audio = new Audio(audioSrc);
                audio.volume = 0.5;
                audio.play().catch(err => console.log("Audio play error:", err));
                currentAudio = audio;
            }
        });
    });

    document.querySelectorAll('.stop-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevents flipping

            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                currentAudio = null;
            }
        });
    });


    // Custom Progress Bar Logic
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        const progressIcon = document.getElementById('progress-icon');
        if (progressIcon) {
            // We want it to move from top (approx 80px or 0) to bottom
            // Using % for top is easiest relative to the container height (100vh)
            // Capping at roughly 95% to keep it on screen
            const safePercent = Math.min(scrollPercent, 95);
            progressIcon.style.top = `${safePercent}%`;

            // Remove old transform logic
            progressIcon.style.left = '50%';
            progressIcon.style.transform = `translateX(-50%)`;

            // Update fill height
            const progressFill = document.getElementById('progress-fill');
            if (progressFill) {
                progressFill.style.height = `${safePercent}%`;
            }
        }
    });

});

