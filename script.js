document.addEventListener('DOMContentLoaded', () => {

    // ===== SCENE MANAGEMENT =====
    const scenes = document.querySelectorAll('.scene');
    const dots = document.querySelectorAll('.dot');
    const transition = document.getElementById('scene-transition');
    let currentScene = 0;

    // Check if Valentine's Day has arrived (Feb 14, 2026 or later)
    function isValentineUnlocked() {
        const now = new Date();
        const unlock = new Date(2026, 1, 13, 0, 0, 0); // Feb 14, 2026
        return now >= unlock;
    }

    function goToScene(index) {
        if (index < 0 || index >= scenes.length || index === currentScene) return;

        // Restrict scenes 3-8 until Valentine's Day (only Envelope, Name, Countdown always accessible)
        if (index > 2 && !isValentineUnlocked()) {
            alert('Patience my darling, Sabr ka fal Mitha hota hai😁😘');
            return;
        }

        // Transition effect
        transition.classList.add('active');
        setTimeout(() => {
            scenes[currentScene].classList.remove('active');
            dots[currentScene].classList.remove('active');
            currentScene = index;
            scenes[currentScene].classList.add('active');
            dots[currentScene].classList.add('active');

            // Trigger animations for the new scene
            if (currentScene === 1) createParticleBurst();
            if (currentScene === 2) startCountdown();
            if (currentScene === 3) loadMemories();
            if (currentScene === 4) animateTimeline();
            if (currentScene === 5) startTypewriter();
            if (currentScene === 6) animateShayari();

            transition.classList.remove('active');
        }, 300);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goToScene(i));
    });

    // ===== SCENE 1: ROYAL ENVELOPE =====
    const envelope = document.getElementById('envelope');
    envelope.addEventListener('click', () => {
        envelope.classList.add('opened');
        playChime();
        // Burst of golden particles on open
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const spark = document.createElement('div');
                spark.style.cssText = `
                    position:fixed; width:${3 + Math.random()*5}px; height:${3 + Math.random()*5}px;
                    background:${['#ffd700','#ffed4e','#ff2d55','#ff85a2','#8b5cf6'][Math.floor(Math.random()*5)]};
                    border-radius:50%; pointer-events:none; z-index:10000;
                    left:50%; top:50%; box-shadow:0 0 8px currentColor;
                `;
                document.body.appendChild(spark);
                const angle = Math.random() * Math.PI * 2;
                const dist = 100 + Math.random() * 200;
                spark.animate([
                    { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
                    { transform: `translate(${Math.cos(angle)*dist - 50}%, ${Math.sin(angle)*dist - 50}%) scale(0)`, opacity: 0 }
                ], { duration: 800 + Math.random() * 600, easing: 'ease-out', fill: 'forwards' });
                setTimeout(() => spark.remove(), 1500);
            }, i * 20);
        }
        setTimeout(() => goToScene(1), 1500);
    });

    // Rose petals falling on entrance
    const petalsContainer = document.getElementById('rose-petals');
    function spawnPetal() {
        const petal = document.createElement('div');
        const size = 8 + Math.random() * 14;
        const hue = 330 + Math.random() * 30;
        petal.style.cssText = `
            position:absolute; width:${size}px; height:${size * 1.3}px;
            background:hsl(${hue}, 80%, ${50 + Math.random()*20}%);
            border-radius:50% 0 50% 50%; opacity:0.6;
            left:${Math.random()*100}%; top:-20px;
            animation: petalFall ${6 + Math.random()*6}s linear forwards;
            transform: rotate(${Math.random()*360}deg);
            filter: blur(${Math.random() > 0.5 ? 1 : 0}px);
        `;
        petalsContainer.appendChild(petal);
        setTimeout(() => petal.remove(), 13000);
    }
    setInterval(spawnPetal, 600);
    for (let i = 0; i < 8; i++) setTimeout(spawnPetal, i * 300);

    // Golden dust particles
    const dustContainer = document.getElementById('golden-dust');
    function spawnDust() {
        const dust = document.createElement('div');
        const size = 2 + Math.random() * 3;
        dust.style.cssText = `
            position:absolute; width:${size}px; height:${size}px;
            background:${Math.random() > 0.5 ? '#ffd700' : '#ffed4e'};
            border-radius:50%; opacity:0;
            left:${Math.random()*100}%; top:${Math.random()*100}%;
            animation: dustFloat ${4 + Math.random()*4}s ease-in-out forwards;
            box-shadow: 0 0 ${4 + Math.random()*6}px rgba(255,215,0,0.8);
        `;
        dustContainer.appendChild(dust);
        setTimeout(() => dust.remove(), 9000);
    }
    setInterval(spawnDust, 300);
    for (let i = 0; i < 15; i++) setTimeout(spawnDust, i * 150);

    function playChime() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.15);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 1);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(ctx.currentTime + i * 0.15);
                osc.stop(ctx.currentTime + i * 0.15 + 1);
            });
        } catch (e) { /* ignore audio errors */ }
    }

    // ===== SCENE 2: PARTICLE BURST =====
    function createParticleBurst() {
        const burst = document.getElementById('particle-burst');
        burst.innerHTML = '';
        const colors = ['#ff2d55', '#ffd700', '#ff6b8a', '#8b5cf6', '#ffe066', '#ff85a2'];
        for (let i = 0; i < 60; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const angle = (Math.PI * 2 * i) / 60;
            const distance = 80 + Math.random() * 180;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.width = (4 + Math.random() * 8) + 'px';
            particle.style.height = particle.style.width;
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1500 + Math.random() * 1000,
                easing: 'ease-out',
                fill: 'forwards'
            });
            burst.appendChild(particle);
        }
        launchConfetti(80);
    }

    // Button navigations (0=entrance, 1=name, 2=countdown, 3=memories, 4=story, 5=poem, 6=shayari, 7=garden, 8=promise, 9=reaction)
    document.getElementById('btn-to-countdown').addEventListener('click', () => goToScene(2));
    document.getElementById('btn-to-memories').addEventListener('click', () => goToScene(3));
    document.getElementById('btn-to-journey').addEventListener('click', () => goToScene(4));
    document.getElementById('btn-to-poem').addEventListener('click', () => goToScene(5));
    document.getElementById('btn-to-shayari').addEventListener('click', () => goToScene(6));
    document.getElementById('btn-to-gallery').addEventListener('click', () => goToScene(7));
    document.getElementById('btn-to-promise').addEventListener('click', () => goToScene(8));
    document.getElementById('btn-to-reaction').addEventListener('click', () => goToScene(9));

    // ===== SCENE 3: COUNTDOWN (with auto-advance) =====
    let countdownStarted = false;
    let countdownInterval = null;
    let countdownAutoAdvanced = false;

    function startCountdown() {
        if (countdownStarted) return;
        countdownStarted = true;
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    function updateCountdown() {
        const now = new Date();
        const msgEl = document.getElementById('countdown-msg');

        // Check if today IS Valentine's Day (Feb 14)
        const isValentineDay = (now.getMonth() === 1 && now.getDate() === 14);

        // Target: Feb 14 midnight of current year
        const valentine = new Date(now.getFullYear(), 1, 14, 0, 0, 0);

        // If Valentine's Day has already passed this year (after Feb 14), target next year
        // But if today IS Feb 14, treat it as celebration time
        if (now > valentine && !isValentineDay) {
            valentine.setFullYear(valentine.getFullYear() + 1);
        }

        const diff = valentine - now;

        // It's Valentine's Day! Auto-advance to next page
        if (isValentineDay || diff <= 0) {
            document.getElementById('cd-days').textContent = '00';
            document.getElementById('cd-hours').textContent = '00';
            document.getElementById('cd-mins').textContent = '00';
            document.getElementById('cd-secs').textContent = '00';
            msgEl.textContent = "It's Valentine's Day! I love you, Neharika!";

            // Auto-advance to memories section after a brief celebration
            if (!countdownAutoAdvanced) {
                countdownAutoAdvanced = true;
                launchConfetti(100);
                setTimeout(() => {
                    goToScene(3); // Automatically open the next page (Memories)
                }, 3000);
            }
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Update countdown display
        document.getElementById('cd-days').textContent = days.toString().padStart(2, '0');
        document.getElementById('cd-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('cd-mins').textContent = mins.toString().padStart(2, '0');
        document.getElementById('cd-secs').textContent = seconds.toString().padStart(2, '0');

        // Update message
        msgEl.textContent = 'Every second closer to celebrating our love';
    }

    // ===== SCENE 4: MEMORIES GALLERY =====
    let memoriesLoaded = false;

    // Memory tabs
    const memoryTabs = document.querySelectorAll('.memory-tab');
    const memoryContents = document.querySelectorAll('.memory-content');

    memoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            memoryTabs.forEach(t => t.classList.remove('active'));
            memoryContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
        });
    });

    // Our memories together
    const photoFiles = [
        { src: 'memories/photos/1.png', caption: 'Our memory' },
        { src: 'memories/photos/2.png', caption: 'Together' },
        { src: 'memories/photos/Screenshot 2025-09-24 113118.png', caption: 'Precious moment' },
        { src: 'memories/photos/Screenshot 2025-09-24 124045.png', caption: 'Us' },
        { src: 'memories/photos/Screenshot 2025-09-24 124754.png', caption: 'Beautiful day' },
        { src: 'memories/photos/Screenshot 2025-09-25 174240.png', caption: 'With you' },
        { src: 'memories/photos/Screenshot 2025-09-25 175036.png', caption: 'My favorite' },
        { src: 'memories/photos/Screenshot 2025-09-25 175455.png', caption: 'Always' },
        { src: 'memories/photos/Screenshot 2025-09-27 172740.png', caption: 'Our time' },
        { src: 'memories/photos/Screenshot 2025-09-29 112952.png', caption: 'Love this' },
        { src: 'memories/photos/Screenshot 2025-09-29 113440.png', caption: 'Special' },
        { src: 'memories/photos/Screenshot 2025-09-29 114719.png', caption: 'Unforgettable' },
        { src: 'memories/photos/Screenshot 2025-09-29 115654.png', caption: 'My heart' },
        { src: 'memories/photos/Screenshot 2025-09-29 120354.png', caption: 'Forever' },
        { src: 'memories/photos/Screenshot 2025-09-29 123650.png', caption: 'Cherished' },
        { src: 'memories/photos/Screenshot 2025-09-29 125607.png', caption: 'You and me' },
    ];

    const videoFiles = [
        { src: 'memories/videos/Screen Recording 2025-11-06 123410.mp4', title: 'Our moment' },
        { src: 'memories/videos/Screen Recording 2025-11-07 105243.mp4', title: 'Together' },
        { src: 'memories/videos/Screen Recording 2025-12-26 161437.mp4', title: 'Special day' },
    ];

    const audioFiles = [
        { src: 'memories/audios/WhatsApp Ptt 2026-02-06 at 19.37.23.ogg', title: 'Our voice note' },
    ];

    function loadMemories() {
        if (memoriesLoaded) return;
        memoriesLoaded = true;

        loadPhotoGallery();
        loadVideoGallery();
        loadAudioGallery();
    }

    // Photo Gallery with Lightbox
    let currentLightboxIndex = 0;

    function loadPhotoGallery() {
        const gallery = document.getElementById('photo-gallery');
        if (photoFiles.length === 0) return; // Keep placeholder if no photos

        gallery.innerHTML = '';
        photoFiles.forEach((photo, index) => {
            const item = document.createElement('div');
            item.classList.add('photo-item');
            item.innerHTML = `
                <img src="${photo.src}" alt="${photo.caption || 'Memory'}" loading="lazy">
                <div class="photo-overlay">
                    <p>${photo.caption || ''}</p>
                </div>
            `;
            item.addEventListener('click', () => openLightbox(index));
            gallery.appendChild(item);
        });
    }

    function openLightbox(index) {
        if (photoFiles.length === 0) return;
        currentLightboxIndex = index;
        const lightbox = document.getElementById('lightbox');
        const img = document.getElementById('lightbox-img');
        const caption = document.getElementById('lightbox-caption');
        const counter = document.getElementById('lightbox-counter');

        img.src = photoFiles[index].src;
        caption.textContent = photoFiles[index].caption || '';
        counter.textContent = `${index + 1} / ${photoFiles.length}`;
        lightbox.style.display = 'flex';
    }

    document.getElementById('lightbox-close').addEventListener('click', () => {
        document.getElementById('lightbox').style.display = 'none';
    });

    document.getElementById('lightbox-prev').addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex - 1 + photoFiles.length) % photoFiles.length;
        openLightbox(currentLightboxIndex);
    });

    document.getElementById('lightbox-next').addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex + 1) % photoFiles.length;
        openLightbox(currentLightboxIndex);
    });

    // Close lightbox on background click
    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target === document.getElementById('lightbox') || e.target.closest('.lightbox-content') === null && !e.target.closest('.lightbox-nav') && !e.target.closest('.lightbox-close')) {
            document.getElementById('lightbox').style.display = 'none';
        }
    });

    // Lightbox keyboard navigation
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (lightbox.style.display !== 'flex') return;

        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            currentLightboxIndex = (currentLightboxIndex - 1 + photoFiles.length) % photoFiles.length;
            openLightbox(currentLightboxIndex);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            currentLightboxIndex = (currentLightboxIndex + 1) % photoFiles.length;
            openLightbox(currentLightboxIndex);
        }
    });

    // Video Gallery
    function loadVideoGallery() {
        const gallery = document.getElementById('video-gallery');
        if (videoFiles.length === 0) return;

        gallery.innerHTML = '';
        videoFiles.forEach(video => {
            const ext = video.src.split('.').pop().toLowerCase();
            const mimeType = ext === 'mov' ? 'video/quicktime' : ext === 'webm' ? 'video/webm' : 'video/mp4';
            const item = document.createElement('div');
            item.classList.add('video-item');
            item.innerHTML = `
                <video controls preload="metadata" playsinline>
                    <source src="${video.src}" type="${mimeType}">
                    Your browser does not support video playback.
                </video>
                <div class="video-title">${video.title || 'Our Memory'}</div>
            `;
            gallery.appendChild(item);
        });
    }

    // Audio Gallery
    function loadAudioGallery() {
        const gallery = document.getElementById('audio-gallery');
        if (audioFiles.length === 0) return;

        gallery.innerHTML = '';
        audioFiles.forEach(audio => {
            const item = document.createElement('div');
            item.classList.add('audio-item');
            item.innerHTML = `
                <div class="audio-icon">
                    <svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                </div>
                <div class="audio-info">
                    <div class="audio-name">${audio.title || 'Our Song'}</div>
                    <audio controls preload="metadata">
                        <source src="${audio.src}" type="audio/${audio.src.split('.').pop() === 'm4a' ? 'mp4' : audio.src.split('.').pop()}">
                    </audio>
                </div>
            `;
            gallery.appendChild(item);
        });
    }

    // ===== SCENE 5: TIMELINE ANIMATION =====
    function animateTimeline() {
        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item, i) => {
            setTimeout(() => item.classList.add('visible'), 400 * (i + 1));
        });
    }

    // ===== SCENE 6: TYPEWRITER POEM =====
    let typewriterStarted = false;
    const poemLines = [
        "Dear Neharika,",
        "",
        "Before you came into my life,",
        "I didn't know what magic felt like.",
        "But then you smiled at me,",
        "and suddenly the whole universe",
        "made perfect sense.",
        "",
        "You are the poetry I never knew",
        "how to write, the song I always",
        "wanted to sing, the dream I never",
        "want to wake up from.",
        "",
        "Every heartbeat of mine whispers",
        "your name. Every star in the sky",
        "reminds me of the sparkle",
        "in your eyes.",
        "",
        "I love you more than words",
        "could ever express.",
        "",
        "Happy Valentine's Day, my love.",
        "Today, tomorrow, and forever.",
    ];

    function startTypewriter() {
        if (typewriterStarted) return;
        typewriterStarted = true;
        const container = document.getElementById('typewriter-text');
        container.innerHTML = '';
        let lineIndex = 0;
        function addLine() {
            if (lineIndex >= poemLines.length) {
                const btn = document.getElementById('btn-to-shayari');
                btn.style.display = 'inline-block';
                btn.style.animation = 'fadeInUp 1s ease forwards';
                return;
            }
            const line = document.createElement('div');
            line.classList.add('line');
            line.style.animationDelay = '0s';
            if (poemLines[lineIndex] === '') {
                line.innerHTML = '<br>';
            } else {
                line.textContent = poemLines[lineIndex];
            }
            container.appendChild(line);
            lineIndex++;
            setTimeout(addLine, 200);
        }
        setTimeout(addLine, 500);
    }

    // ===== SCENE 7: SHAYARI =====
    let shayariAnimated = false;
    function animateShayari() {
        if (shayariAnimated) return;
        shayariAnimated = true;
        // Re-trigger sher animations by removing and re-adding them
        const shers = document.querySelectorAll('.sher');
        shers.forEach((sher, i) => {
            sher.style.opacity = '0';
            sher.style.animation = 'none';
            setTimeout(() => {
                sher.style.animation = `sherReveal 0.8s ease ${0.2 + i * 0.35}s forwards`;
            }, 50);
        });
    }

    // ===== SCENE 8: LOVE GARDEN =====
    const gardenCanvas = document.getElementById('garden-canvas');
    const flowerCountEl = document.getElementById('flower-count');
    let flowerCount = 0;
    const flowers = ['\u{1F339}', '\u{1F33A}', '\u{1F33B}', '\u{1F33C}', '\u{1F337}', '\u{1F338}', '\u{1F940}', '\u{1F33F}', '\u{2618}', '\u{1F490}'];

    gardenCanvas.addEventListener('click', (e) => {
        const rect = gardenCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const flower = document.createElement('span');
        flower.classList.add('garden-flower');
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.left = (x - 15) + 'px';
        flower.style.top = (y - 15) + 'px';
        flower.style.fontSize = (20 + Math.random() * 20) + 'px';
        gardenCanvas.appendChild(flower);
        flowerCount++;
        flowerCountEl.textContent = flowerCount;
        for (let i = 0; i < 5; i++) {
            const spark = document.createElement('span');
            spark.textContent = '\u2728';
            spark.style.position = 'absolute';
            spark.style.left = (x - 8) + 'px';
            spark.style.top = (y - 8) + 'px';
            spark.style.fontSize = '12px';
            spark.style.pointerEvents = 'none';
            gardenCanvas.appendChild(spark);
            const angle = (Math.PI * 2 * i) / 5;
            const dist = 20 + Math.random() * 30;
            spark.animate([
                { transform: 'translate(0,0) scale(1)', opacity: 1 },
                { transform: `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px) scale(0)`, opacity: 0 }
            ], { duration: 600, fill: 'forwards' });
            setTimeout(() => spark.remove(), 700);
        }
    });

    // ===== SCENE 9: REACTIONS + MESSAGE STORAGE =====
    const reactionBtns = document.querySelectorAll('.reaction-btn');
    const messageBox = document.getElementById('message-box');
    const finalMessage = document.getElementById('final-message');
    const reactionEmojis = document.getElementById('reaction-emojis');
    const sentConfirmation = document.getElementById('sent-confirmation');
    let selectedReaction = null;
    let voiceBlob = null;

    reactionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            reactionBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedReaction = btn.dataset.reaction;
            createEmojiRain(btn.dataset.emoji);
            messageBox.style.display = 'block';
        });
    });

    function createEmojiRain(emoji) {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const el = document.createElement('div');
                el.classList.add('emoji-rain');
                el.textContent = emoji;
                el.style.left = Math.random() * 100 + 'vw';
                el.style.animationDuration = (2 + Math.random() * 3) + 's';
                el.style.fontSize = (20 + Math.random() * 25) + 'px';
                document.body.appendChild(el);
                setTimeout(() => el.remove(), 5000);
            }, i * 100);
        }
    }

    // ===== VOICE RECORDING =====
    const voiceBtn = document.getElementById('voice-record-btn');
    const voiceStatus = document.getElementById('voice-status');
    const voicePlayback = document.getElementById('voice-playback');
    let mediaRecorder = null;
    let audioChunks = [];
    let isRecording = false;

    voiceBtn.addEventListener('mousedown', startRecording);
    voiceBtn.addEventListener('mouseup', stopRecording);
    voiceBtn.addEventListener('mouseleave', stopRecording);
    voiceBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startRecording(); });
    voiceBtn.addEventListener('touchend', stopRecording);

    async function startRecording() {
        if (isRecording) return;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
            mediaRecorder.onstop = () => {
                voiceBlob = new Blob(audioChunks, { type: 'audio/webm' });
                const url = URL.createObjectURL(voiceBlob);
                voicePlayback.src = url;
                voicePlayback.style.display = 'block';
                stream.getTracks().forEach(t => t.stop());
            };
            mediaRecorder.start();
            isRecording = true;
            voiceBtn.classList.add('recording');
            voiceStatus.style.display = 'flex';
        } catch (err) {
            // Microphone not available
        }
    }

    function stopRecording() {
        if (!isRecording || !mediaRecorder) return;
        mediaRecorder.stop();
        isRecording = false;
        voiceBtn.classList.remove('recording');
        voiceStatus.style.display = 'none';
    }

    // ===== SEND REACTION & SAVE TO LOCALSTORAGE =====
    document.getElementById('send-reaction').addEventListener('click', () => {
        const msg = document.getElementById('reaction-message').value;
        const selectedBtn = document.querySelector('.reaction-btn.selected');
        const reactionEmoji = selectedBtn ? selectedBtn.dataset.emoji : '';
        const reactionName = selectedBtn ? selectedBtn.dataset.reaction : '';

        // Save to localStorage
        const messages = JSON.parse(localStorage.getItem('neharika_messages') || '[]');
        const newMsg = {
            id: Date.now(),
            reaction: reactionName,
            emoji: reactionEmoji,
            message: msg,
            timestamp: new Date().toISOString(),
            read: false,
            hasVoice: !!voiceBlob
        };

        // Save voice as base64 if available
        if (voiceBlob) {
            const reader = new FileReader();
            reader.onloadend = () => {
                newMsg.voiceData = reader.result;
                messages.push(newMsg);
                localStorage.setItem('neharika_messages', JSON.stringify(messages));
            };
            reader.readAsDataURL(voiceBlob);
        } else {
            messages.push(newMsg);
            localStorage.setItem('neharika_messages', JSON.stringify(messages));
        }

        // Show "sent" animation first
        messageBox.style.display = 'none';
        reactionEmojis.style.display = 'none';
        document.querySelector('.reaction-subtitle').style.display = 'none';
        sentConfirmation.style.display = 'block';

        // After 3 seconds, show final message
        setTimeout(() => {
            sentConfirmation.style.display = 'none';
            finalMessage.style.display = 'block';
            launchConfetti(120);

            // Grand finale heart rain
            const hearts = ['\u2764\uFE0F', '\u{1F496}', '\u{1F497}', '\u{1F495}', '\u{1F49E}', '\u{1F49D}', '\u2728', '\u{1F31F}'];
            for (let i = 0; i < 80; i++) {
                setTimeout(() => {
                    const el = document.createElement('div');
                    el.classList.add('emoji-rain');
                    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                    el.style.left = Math.random() * 100 + 'vw';
                    el.style.animationDuration = (2 + Math.random() * 4) + 's';
                    el.style.fontSize = (20 + Math.random() * 30) + 'px';
                    document.body.appendChild(el);
                    setTimeout(() => el.remove(), 6000);
                }, i * 60);
            }
        }, 3000);
    });

    // ===== SECRET ADMIN PANEL (Ctrl+Shift+L) =====
    const adminOverlay = document.getElementById('admin-overlay');
    const adminBody = document.getElementById('admin-body');

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'L') {
            e.preventDefault();
            toggleAdmin();
        }
    });

    document.getElementById('admin-close').addEventListener('click', () => {
        adminOverlay.style.display = 'none';
    });

    document.getElementById('admin-clear').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all messages?')) {
            localStorage.removeItem('neharika_messages');
            renderAdminMessages();
        }
    });

    adminOverlay.addEventListener('click', (e) => {
        if (e.target === adminOverlay) adminOverlay.style.display = 'none';
    });

    function toggleAdmin() {
        if (adminOverlay.style.display === 'none') {
            adminOverlay.style.display = 'flex';
            renderAdminMessages();
            // Mark all as read
            const messages = JSON.parse(localStorage.getItem('neharika_messages') || '[]');
            messages.forEach(m => m.read = true);
            localStorage.setItem('neharika_messages', JSON.stringify(messages));
        } else {
            adminOverlay.style.display = 'none';
        }
    }

    function renderAdminMessages() {
        const messages = JSON.parse(localStorage.getItem('neharika_messages') || '[]');
        if (messages.length === 0) {
            adminBody.innerHTML = '<p class="admin-empty">No messages yet... she hasn\'t responded yet.</p>';
            return;
        }

        adminBody.innerHTML = messages.map((msg) => {
            const date = new Date(msg.timestamp);
            const timeStr = date.toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
            const reactionLabels = {
                love: 'I Love It!', cry: 'Happy Tears!', blush: "I'm Blushing!",
                heart: 'My Heart!', kiss: 'Sending Kisses!', hug: 'Big Hug!'
            };
            const isNew = !msg.read;
            return `
                <div class="admin-msg-card ${isNew ? 'admin-msg-new' : ''}">
                    <div class="admin-msg-header">
                        <span class="admin-msg-emoji">${msg.emoji || ''}</span>
                        <span class="admin-msg-time">${timeStr}</span>
                    </div>
                    <div class="admin-msg-reaction">Reaction: ${reactionLabels[msg.reaction] || msg.reaction}</div>
                    ${msg.message ? `<div class="admin-msg-text">"${msg.message}"</div>` : '<div class="admin-msg-text" style="opacity:0.5;font-style:italic;">No text message</div>'}
                    ${msg.voiceData ? `<div class="admin-msg-voice"><audio controls src="${msg.voiceData}"></audio></div>` : ''}
                </div>
            `;
        }).reverse().join('');
    }

    // ===== CONFETTI =====
    function launchConfetti(count) {
        const container = document.getElementById('confetti-container');
        const colors = ['#ff2d55', '#ffd700', '#ff6b8a', '#8b5cf6', '#ffe066', '#ff85a2', '#00ff88', '#00ccff'];
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const piece = document.createElement('div');
                piece.classList.add('confetti-piece');
                piece.style.left = Math.random() * 100 + '%';
                piece.style.background = colors[Math.floor(Math.random() * colors.length)];
                piece.style.width = (6 + Math.random() * 10) + 'px';
                piece.style.height = (8 + Math.random() * 16) + 'px';
                piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                piece.style.animationDuration = (2 + Math.random() * 3) + 's';
                piece.style.animationDelay = '0s';
                container.appendChild(piece);
                setTimeout(() => piece.remove(), 5000);
            }, i * 30);
        }
    }

    // ===== FLOATING HEARTS BACKGROUND =====
    const heartsContainer = document.getElementById('floating-hearts');
    const heartEmojis = ['\u2764\uFE0F', '\u{1F496}', '\u{1F497}', '\u{1F495}', '\u{1F49E}'];

    function spawnFloatingHeart() {
        const heart = document.createElement('span');
        heart.classList.add('floating-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (12 + Math.random() * 18) + 'px';
        heart.style.animationDuration = (8 + Math.random() * 12) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 22000);
    }
    setInterval(spawnFloatingHeart, 800);
    for (let i = 0; i < 10; i++) setTimeout(spawnFloatingHeart, i * 200);

    // ===== FIREFLIES =====
    const firefliesContainer = document.getElementById('fireflies');
    for (let i = 0; i < 15; i++) {
        const firefly = document.createElement('div');
        firefly.classList.add('firefly');
        firefly.style.left = Math.random() * 100 + '%';
        firefly.style.top = Math.random() * 100 + '%';
        firefly.style.animationDelay = Math.random() * 5 + 's';
        firefly.style.animationDuration = (6 + Math.random() * 8) + 's';
        firefliesContainer.appendChild(firefly);
    }

    // ===== SHOOTING STARS =====
    const shootingCanvas = document.getElementById('shooting-stars');
    const sCtx = shootingCanvas.getContext('2d');
    let shootingStars = [];

    function resizeShootingCanvas() {
        shootingCanvas.width = window.innerWidth;
        shootingCanvas.height = window.innerHeight;
    }
    resizeShootingCanvas();
    window.addEventListener('resize', resizeShootingCanvas);

    function spawnShootingStar() {
        shootingStars.push({
            x: Math.random() * shootingCanvas.width * 0.8,
            y: Math.random() * shootingCanvas.height * 0.3,
            len: 80 + Math.random() * 100,
            speed: 8 + Math.random() * 8,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
            life: 1,
            decay: 0.015 + Math.random() * 0.01
        });
    }

    setInterval(spawnShootingStar, 3000 + Math.random() * 4000);

    function animateShootingStars() {
        sCtx.clearRect(0, 0, shootingCanvas.width, shootingCanvas.height);
        shootingStars = shootingStars.filter(s => s.life > 0);
        shootingStars.forEach(s => {
            s.x += Math.cos(s.angle) * s.speed;
            s.y += Math.sin(s.angle) * s.speed;
            s.life -= s.decay;

            const tailX = s.x - Math.cos(s.angle) * s.len * s.life;
            const tailY = s.y - Math.sin(s.angle) * s.len * s.life;

            const gradient = sCtx.createLinearGradient(tailX, tailY, s.x, s.y);
            gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
            gradient.addColorStop(1, `rgba(255, 255, 255, ${s.life})`);

            sCtx.beginPath();
            sCtx.moveTo(tailX, tailY);
            sCtx.lineTo(s.x, s.y);
            sCtx.strokeStyle = gradient;
            sCtx.lineWidth = 2;
            sCtx.stroke();

            // Glow at head
            sCtx.beginPath();
            sCtx.arc(s.x, s.y, 3 * s.life, 0, Math.PI * 2);
            sCtx.fillStyle = `rgba(255, 215, 0, ${s.life})`;
            sCtx.shadowBlur = 15;
            sCtx.shadowColor = '#ffd700';
            sCtx.fill();
            sCtx.shadowBlur = 0;
        });
        requestAnimationFrame(animateShootingStars);
    }
    animateShootingStars();

    // ===== SPARKLE CURSOR TRAIL =====
    const canvas = document.getElementById('sparkle-canvas');
    const ctx = canvas.getContext('2d');
    let sparkles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', (e) => {
        for (let i = 0; i < 2; i++) {
            sparkles.push({
                x: e.clientX + (Math.random() - 0.5) * 20,
                y: e.clientY + (Math.random() - 0.5) * 20,
                size: Math.random() * 4 + 2,
                life: 1,
                decay: 0.02 + Math.random() * 0.02,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2 - 1,
                color: `hsl(${330 + Math.random() * 60}, 100%, ${60 + Math.random() * 30}%)`
            });
        }
    });

    function animateSparkles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sparkles = sparkles.filter(s => s.life > 0);
        sparkles.forEach(s => {
            s.x += s.vx;
            s.y += s.vy;
            s.life -= s.decay;
            s.size *= 0.98;
            ctx.save();
            ctx.globalAlpha = s.life;
            ctx.fillStyle = s.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = s.color;
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                const outerX = s.x + Math.cos(angle) * s.size;
                const outerY = s.y + Math.sin(angle) * s.size;
                const innerAngle = angle + Math.PI / 5;
                const innerX = s.x + Math.cos(innerAngle) * (s.size * 0.4);
                const innerY = s.y + Math.sin(innerAngle) * (s.size * 0.4);
                if (i === 0) ctx.moveTo(outerX, outerY);
                else ctx.lineTo(outerX, outerY);
                ctx.lineTo(innerX, innerY);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        });
        requestAnimationFrame(animateSparkles);
    }
    animateSparkles();

    // ===== ROMANTIC PIANO MUSIC (Web Audio API) =====
    const musicToggle = document.getElementById('music-toggle');
    const musicOn = document.getElementById('music-on');
    const musicOff = document.getElementById('music-off');
    const visualizer = document.getElementById('music-visualizer');
    let audioCtx = null;
    let isPlaying = false;
    let melodyInterval = null;

    // Romantic piano note frequencies
    const NOTES = {
        C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00,
        A4: 440.00, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25,
        F5: 698.46, G5: 783.99, A5: 880.00
    };

    function createRomanticMusic() {
        if (audioCtx) return;
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        const masterGain = audioCtx.createGain();
        masterGain.gain.value = 0.12;

        // Reverb effect using convolver
        const convolver = audioCtx.createConvolver();
        const reverbLength = audioCtx.sampleRate * 2;
        const impulse = audioCtx.createBuffer(2, reverbLength, audioCtx.sampleRate);
        for (let ch = 0; ch < 2; ch++) {
            const data = impulse.getChannelData(ch);
            for (let i = 0; i < reverbLength; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / reverbLength, 2.5);
            }
        }
        convolver.buffer = impulse;

        const reverbGain = audioCtx.createGain();
        reverbGain.gain.value = 0.3;
        convolver.connect(reverbGain);
        reverbGain.connect(masterGain);
        masterGain.connect(audioCtx.destination);

        // Warm pad (sustained background chords)
        function playPad() {
            const chords = [
                [NOTES.C4, NOTES.E4, NOTES.G4],       // C major
                [NOTES.A4 * 0.5, NOTES.C4, NOTES.E4], // A minor
                [NOTES.F4, NOTES.A4, NOTES.C5],        // F major
                [NOTES.G4, NOTES.B4, NOTES.D5],        // G major
            ];
            let chordIndex = 0;
            const padGain = audioCtx.createGain();
            padGain.gain.value = 0.06;
            padGain.connect(masterGain);
            padGain.connect(convolver);

            function playNextChord() {
                if (!isPlaying) return;
                const chord = chords[chordIndex % chords.length];
                chord.forEach(freq => {
                    const osc = audioCtx.createOscillator();
                    const g = audioCtx.createGain();
                    osc.type = 'sine';
                    osc.frequency.value = freq;
                    g.gain.setValueAtTime(0, audioCtx.currentTime);
                    g.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.5);
                    g.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 3);
                    g.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 4);
                    osc.connect(g);
                    g.connect(padGain);
                    osc.start();
                    osc.stop(audioCtx.currentTime + 4.2);
                });
                chordIndex++;
            }
            playNextChord();
            return setInterval(playNextChord, 4000);
        }

        // Romantic arpeggio melody
        function playMelody() {
            const melodyNotes = [
                NOTES.E5, NOTES.C5, NOTES.D5, NOTES.E5,
                NOTES.G5, NOTES.F5, NOTES.E5, NOTES.D5,
                NOTES.C5, NOTES.E5, NOTES.G5, NOTES.A5,
                NOTES.G5, NOTES.F5, NOTES.E5, NOTES.D5,
                NOTES.E5, NOTES.D5, NOTES.C5, NOTES.E5,
                NOTES.F5, NOTES.E5, NOTES.D5, NOTES.C5,
            ];
            let noteIndex = 0;

            function playNextNote() {
                if (!isPlaying) return;
                const freq = melodyNotes[noteIndex % melodyNotes.length];
                const osc = audioCtx.createOscillator();
                const g = audioCtx.createGain();

                osc.type = 'triangle';
                osc.frequency.value = freq;

                const now = audioCtx.currentTime;
                g.gain.setValueAtTime(0, now);
                g.gain.linearRampToValueAtTime(0.18, now + 0.02);
                g.gain.exponentialRampToValueAtTime(0.08, now + 0.3);
                g.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

                osc.connect(g);
                g.connect(masterGain);
                g.connect(convolver);
                osc.start(now);
                osc.stop(now + 2);

                noteIndex++;
            }
            playNextNote();
            return setInterval(playNextNote, 800);
        }

        // Low bass
        function playBass() {
            const bassNotes = [NOTES.C4 / 2, NOTES.A4 / 4 * 2, NOTES.F4 / 2, NOTES.G4 / 2];
            let bassIndex = 0;
            const bassGainNode = audioCtx.createGain();
            bassGainNode.gain.value = 0.04;
            bassGainNode.connect(masterGain);

            function playNextBass() {
                if (!isPlaying) return;
                const freq = bassNotes[bassIndex % bassNotes.length];
                const osc = audioCtx.createOscillator();
                const g = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.value = freq;
                const now = audioCtx.currentTime;
                g.gain.setValueAtTime(0, now);
                g.gain.linearRampToValueAtTime(0.1, now + 0.1);
                g.gain.exponentialRampToValueAtTime(0.001, now + 3.5);
                osc.connect(g);
                g.connect(bassGainNode);
                osc.start(now);
                osc.stop(now + 4);
                bassIndex++;
            }
            playNextBass();
            return setInterval(playNextBass, 4000);
        }

        const padInterval = playPad();
        const melInterval = playMelody();
        const bassInterval = playBass();
        melodyInterval = { pad: padInterval, mel: melInterval, bass: bassInterval };
    }

    musicToggle.addEventListener('click', () => {
        if (!isPlaying) {
            isPlaying = true;
            createRomanticMusic();
            if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
            musicOn.style.display = 'block';
            musicOff.style.display = 'none';
            visualizer.classList.add('active');
        } else {
            isPlaying = false;
            if (melodyInterval) {
                clearInterval(melodyInterval.pad);
                clearInterval(melodyInterval.mel);
                clearInterval(melodyInterval.bass);
            }
            if (audioCtx) audioCtx.suspend();
            musicOn.style.display = 'none';
            musicOff.style.display = 'block';
            visualizer.classList.remove('active');
        }
    });

    // ===== PROMISE CARD TILT EFFECT =====
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (y - rect.height / 2) / 10;
            const rotateY = (rect.width / 2 - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.03)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
        if (e.ctrlKey || e.shiftKey || e.altKey) return;
        // Don't navigate scenes if lightbox is open
        if (document.getElementById('lightbox').style.display === 'flex') return;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            goToScene(currentScene + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            goToScene(currentScene - 1);
        }
    });

    // ===== VISUAL INDICATOR FOR LOCKED PAGES =====
    function updateLockedDots() {
        if (!isValentineUnlocked()) {
            dots.forEach((dot, i) => {
                if (i > 2) {
                    dot.style.opacity = '0.4';
                    dot.title = dot.title + ' (Locked)';
                }
            });
        }
    }
    updateLockedDots();
});

