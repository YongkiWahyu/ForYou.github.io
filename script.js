// ============================================
// LUXURY BIRTHDAY GIFT - SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  // === STATE ===
  let currentSection = 0;
  let currentPhoto = 0;
  const photoSlides = document.querySelectorAll('.photo-slide');
  const totalPhotos = photoSlides.length;
  const correctPin = '2025';
  let musicStarted = false;

  // Update total count
  const totalEl = document.getElementById('photo-total');
  if (totalEl) totalEl.textContent = totalPhotos;

  // === PARTICLE CANVAS ===
  const particleCanvas = document.getElementById('particle-canvas');
  const pCtx = particleCanvas.getContext('2d');
  let particles = [];

  function resizeParticleCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }
  resizeParticleCanvas();
  window.addEventListener('resize', resizeParticleCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * particleCanvas.width;
      this.y = Math.random() * particleCanvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      const colors = ['255,107,149', '192,132,252', '255,182,193', '255,215,0'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.pulse += this.pulseSpeed;
      if (this.x < 0 || this.x > particleCanvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > particleCanvas.height) this.speedY *= -1;
    }
    draw() {
      const glow = Math.sin(this.pulse) * 0.3 + 0.7;
      pCtx.beginPath();
      pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      pCtx.fillStyle = `rgba(${this.color},${this.opacity * glow})`;
      pCtx.fill();
      // Glow
      pCtx.beginPath();
      pCtx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
      pCtx.fillStyle = `rgba(${this.color},${this.opacity * glow * 0.15})`;
      pCtx.fill();
    }
  }

  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // === SPARKLE TRAIL ===
  const sparkleCanvas = document.getElementById('sparkle-canvas');
  const sCtx = sparkleCanvas.getContext('2d');
  let sparkles = [];
  let mouseX = 0, mouseY = 0;

  function resizeSparkleCanvas() {
    sparkleCanvas.width = window.innerWidth;
    sparkleCanvas.height = window.innerHeight;
  }
  resizeSparkleCanvas();
  window.addEventListener('resize', resizeSparkleCanvas);

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    for (let i = 0; i < 2; i++) {
      sparkles.push({
        x: mouseX + (Math.random() - 0.5) * 10,
        y: mouseY + (Math.random() - 0.5) * 10,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2 - 1,
        life: 1,
        decay: Math.random() * 0.03 + 0.02,
        color: ['#ff6b95', '#c084fc', '#ffb6c1', '#ffd700'][Math.floor(Math.random() * 4)]
      });
    }
  });

  document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
    sparkles.push({
      x: mouseX,
      y: mouseY,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2 - 1,
      life: 1,
      decay: Math.random() * 0.03 + 0.02,
      color: ['#ff6b95', '#c084fc', '#ffb6c1', '#ffd700'][Math.floor(Math.random() * 4)]
    });
  });

  function animateSparkles() {
    sCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
    sparkles = sparkles.filter(s => s.life > 0);
    sparkles.forEach(s => {
      s.x += s.speedX;
      s.y += s.speedY;
      s.life -= s.decay;
      s.size *= 0.98;
      sCtx.beginPath();
      sCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      sCtx.fillStyle = s.color;
      sCtx.globalAlpha = s.life;
      sCtx.fill();
      // Glow
      sCtx.beginPath();
      sCtx.arc(s.x, s.y, s.size * 2.5, 0, Math.PI * 2);
      sCtx.fillStyle = s.color;
      sCtx.globalAlpha = s.life * 0.2;
      sCtx.fill();
      sCtx.globalAlpha = 1;
    });
    requestAnimationFrame(animateSparkles);
  }
  animateSparkles();

  // === FLOATING PETALS ===
  const petalContainer = document.getElementById('floating-petals');
  const petalEmojis = ['🌸', '🩷', '✿', '❀', '🌺', '💮'];

  function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    petal.style.left = Math.random() * 100 + '%';
    petal.style.fontSize = (12 + Math.random() * 14) + 'px';
    petal.style.animationDuration = (8 + Math.random() * 12) + 's';
    petal.style.animationDelay = Math.random() * 2 + 's';
    petal.style.opacity = 0.3 + Math.random() * 0.4;
    petalContainer.appendChild(petal);
    setTimeout(() => petal.remove(), 22000);
  }

  setInterval(createPetal, 1500);
  for (let i = 0; i < 8; i++) {
    setTimeout(createPetal, i * 300);
  }

  // === NAV DOTS ===
  function generateNavDots() {
    const container = document.getElementById('nav-dots');
    container.innerHTML = '';
    for (let i = 0; i < totalPhotos; i++) {
      const dot = document.createElement('div');
      dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
      dot.dataset.index = i;
      if (photoSlides[i] && photoSlides[i].dataset.type === 'video') {
        dot.classList.add('is-video');
      }
      container.appendChild(dot);
    }
  }
  generateNavDots();

  // === BACKGROUND MUSIC ===
  const bgMusic = document.getElementById('background-music');

  function startBackgroundMusic() {
    if (!musicStarted && bgMusic) {
      bgMusic.play().then(() => {
        musicStarted = true;
      }).catch(() => {});
    }
  }

  document.addEventListener('click', startBackgroundMusic, { once: true });
  document.addEventListener('touchstart', startBackgroundMusic, { once: true });

  // === EFFECTS ===
  function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = ['💕', '💖', '💗', '💝', '❤️', '💓', '🩷', '🤍'][Math.floor(Math.random() * 8)];
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = (20 + Math.random() * 24) + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }

  function createConfetti() {
    const colors = ['#ff6b95', '#c084fc', '#ffd700', '#87ceeb', '#98fb98', '#ffb6c1', '#f0e68c'];
    const shapes = ['●', '■', '▲', '★', '♦', '✦', '◆'];
    for (let i = 0; i < 60; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-20px';
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.fontSize = (10 + Math.random() * 15) + 'px';
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
      }, i * 40);
    }
  }

  function createFireworks(x, y) {
    const colors = ['#ff6b95', '#c084fc', '#ffd700', '#87ceeb', '#ffb6c1'];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const velocity = 5 + Math.random() * 5;
      const firework = document.createElement('div');
      firework.className = 'firework';
      firework.textContent = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
      firework.style.left = x + 'px';
      firework.style.top = y + 'px';
      firework.style.color = colors[Math.floor(Math.random() * colors.length)];
      firework.style.fontSize = '18px';
      document.body.appendChild(firework);
      const tx = Math.cos(angle) * velocity * 50;
      const ty = Math.sin(angle) * velocity * 50;
      setTimeout(() => {
        firework.style.transition = 'all 1.5s ease-out';
        firework.style.transform = `translate(${tx}px, ${ty}px)`;
        firework.style.opacity = '0';
      }, 10);
      setTimeout(() => firework.remove(), 1500);
    }
  }

  function heartBurst(centerX, centerY) {
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const angle = (i / 15) * Math.PI * 2;
        const distance = 50 + Math.random() * 80;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        createHeart(x, y);
      }, i * 60);
    }
  }

  // === SECTION NAVIGATION ===
  function pauseAllVideos() {
    document.querySelectorAll('.photo-slide video').forEach(video => {
      video.pause();
      const overlay = video.parentElement.querySelector('.video-play-overlay');
      if (overlay) overlay.classList.remove('hidden');
    });
    if (bgMusic && bgMusic.paused && musicStarted) {
      bgMusic.play().catch(() => {});
    }
  }

  function showSection(index) {
    pauseAllVideos();
    document.querySelectorAll('.section').forEach((section, i) => {
      const isActive = i === index;
      section.classList.toggle('active', isActive);
      if (isActive) {
        section.scrollTop = 0;
      }
    });
    currentSection = index;
  }

  // === PHOTO SLIDER ===
  function updatePhotoSlider() {
    const slider = document.getElementById('photo-slider');
    const photoInner = document.querySelector('.photo-inner');
    const slides = document.querySelectorAll('.photo-slide');
    pauseAllVideos();
    if (slides.length > 0 && photoInner) {
      const slideWidth = photoInner.offsetWidth;
      // Update slide dimensions to match container
      slides.forEach(slide => {
        slide.style.minWidth = slideWidth + 'px';
        slide.style.width = slideWidth + 'px';
        slide.style.height = slideWidth + 'px';
      });
      slider.style.transform = `translateX(-${currentPhoto * slideWidth}px)`;
    }
    document.querySelectorAll('.nav-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentPhoto);
    });
    document.getElementById('prev-btn').disabled = currentPhoto === 0;
    document.getElementById('next-btn').disabled = currentPhoto === totalPhotos - 1;
    const currentEl = document.getElementById('photo-current');
    if (currentEl) currentEl.textContent = currentPhoto + 1;
  }

  // === PASSCODE ===
  function initPasscode() {
    const digits = document.querySelectorAll('.passcode-digit');
    const errorMsg = document.getElementById('error-message');
    const submitBtn = document.getElementById('submit-pin-btn');
    const deleteBtn = document.getElementById('delete-btn');
    let pinLen = 0;

    document.querySelectorAll('.num-btn[data-num]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (pinLen < 4) {
          digits[pinLen].value = btn.dataset.num;
          digits[pinLen].classList.add('filled');
          pinLen++;
        }
      });
    });

    deleteBtn.addEventListener('click', () => {
      if (pinLen > 0) {
        pinLen--;
        digits[pinLen].value = '';
        digits[pinLen].classList.remove('filled');
      }
    });

    submitBtn.addEventListener('click', () => {
      const pin = Array.from(digits).map(d => d.value).join('');
      if (pin === correctPin) {
        showConfirmationModal();
      } else {
        errorMsg.textContent = '😭 Parah kamu gatau 😭';
        errorMsg.classList.add('show');
        digits.forEach(d => {
          d.value = '';
          d.classList.remove('filled');
        });
        pinLen = 0;
        setTimeout(() => errorMsg.classList.remove('show'), 3000);
      }
    });
  }

  // === CONFIRMATION MODAL ===
  function showConfirmationModal() {
    const modal = document.getElementById('confirmation-modal');
    const modalButtons = document.getElementById('modal-buttons');
    const bearGif = document.getElementById('bear-gif');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const modalContent = modal.querySelector('.modal-content');

    bearGif.src = 'https://media.giphy.com/media/kzXCgAFT40HdsL9sdI/giphy.gif';
    modalTitle.textContent = 'YEAAYYY 🎉🎉🎉';
    modalText.textContent = 'PIN nya bener! Selamat kamu dapet Aku hehe💕 Mau lanjut?';
    modalContent.classList.remove('angry');
    modalTitle.classList.remove('angry');
    modalText.classList.remove('angry');
    modal.classList.add('active');

    modalButtons.innerHTML = '<button class="modal-btn yes" id="modal-yes">Yaa dong 💕</button><button class="modal-btn no" id="modal-no">Ga dulu deh 😭</button>';

    function handleYes() {
      setTimeout(() => {
        modal.classList.remove('active');
        showSection(1);
        createConfetti();
        heartBurst(window.innerWidth / 2, window.innerHeight / 2);
      }, 400);
    }

    function handleNo() {
      bearGif.src = 'https://media.giphy.com/media/fvqqfQWEHMowPeurKb/giphy.gif';
      setTimeout(() => {
        modalContent.classList.add('angry');
        modalTitle.textContent = 'KOK KAMU GITU SII 😡';
        modalTitle.classList.add('angry');
        modalText.textContent = 'Wah parah si aku kecoa, Dah lah ckp tw 💔';
        modalText.classList.add('angry');
        modalButtons.innerHTML = '<button class="back-btn" id="back-to-modal">Balik lagi ga!!🫵</button>';

        document.getElementById('back-to-modal').addEventListener('click', () => {
          bearGif.src = 'https://media.giphy.com/media/kzXCgAFT40HdsL9sdI/giphy.gif';
          modalContent.classList.remove('angry');
          modalTitle.textContent = 'Kamu udah siap? 🎉';
          modalTitle.classList.remove('angry');
          modalText.textContent = 'Kamu udah siap buat buka ini?';
          modalText.classList.remove('angry');
          modalButtons.innerHTML = '<button class="modal-btn yes" id="modal-yes">Yaa dong 💕</button><button class="modal-btn no" id="modal-no">Ga dulu 😭</button>';
          document.getElementById('modal-yes').addEventListener('click', handleYes);
          document.getElementById('modal-no').addEventListener('click', handleNo);
        });
      }, 600);
    }

    document.getElementById('modal-yes').addEventListener('click', handleYes);
    document.getElementById('modal-no').addEventListener('click', handleNo);
  }

  // === VIDEO CONTROLS ===
  function initVideoControls() {
    document.querySelectorAll('.video-play-overlay').forEach(overlay => {
      overlay.addEventListener('click', function (e) {
        e.stopPropagation();
        const slide = this.parentElement;
        const video = slide.querySelector('video');
        if (video) {
          document.querySelectorAll('.photo-slide video').forEach(v => {
            if (v !== video) {
              v.pause();
              const o = v.parentElement.querySelector('.video-play-overlay');
              if (o) o.classList.remove('hidden');
            }
          });
          this.classList.add('hidden');
          video.muted = true;
          video.play().then(() => {
            if (bgMusic && bgMusic.paused && musicStarted) {
              bgMusic.play().catch(() => {});
            }
          }).catch(() => {
            this.classList.remove('hidden');
          });
        }
      });
    });

    document.querySelectorAll('.photo-slide video').forEach(video => {
      video.addEventListener('ended', function () {
        const overlay = this.parentElement.querySelector('.video-play-overlay');
        if (overlay) overlay.classList.remove('hidden');
      });
      video.addEventListener('click', function (e) {
        e.stopPropagation();
        if (!this.paused) {
          this.pause();
          const overlay = this.parentElement.querySelector('.video-play-overlay');
          if (overlay) overlay.classList.remove('hidden');
        }
      });
    });
  }

  // === EVENT LISTENERS ===
  function initEvents() {
    // Envelope
    const envelope = document.getElementById('envelope');
    envelope.addEventListener('click', function () {
      if (!this.classList.contains('opened')) {
        this.classList.add('opened');
        const rect = this.getBoundingClientRect();
        heartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        setTimeout(() => {
          showSection(2);
          createConfetti();
        }, 1500);
      }
    });

    // Menu buttons
    document.getElementById('menu-photo').addEventListener('click', () => {
      currentPhoto = 0;
      updatePhotoSlider();
      showSection(3);
      createConfetti();
    });

    document.getElementById('menu-message').addEventListener('click', () => {
      showSection(4);
      createConfetti();
    });

    document.getElementById('menu-music').addEventListener('click', () => {
      showSection(5);
    });

    // Photo navigation
    document.getElementById('prev-btn').addEventListener('click', (e) => {
      if (currentPhoto > 0) {
        currentPhoto--;
        updatePhotoSlider();
        createFireworks(e.clientX, e.clientY);
      }
    });

    document.getElementById('next-btn').addEventListener('click', (e) => {
      if (currentPhoto < totalPhotos - 1) {
        currentPhoto++;
        updatePhotoSlider();
        createFireworks(e.clientX, e.clientY);
      }
    });

    document.getElementById('nav-dots').addEventListener('click', function (e) {
      const dot = e.target.closest('.nav-dot');
      if (dot) {
        currentPhoto = parseInt(dot.dataset.index);
        updatePhotoSlider();
      }
    });

    // Continue & back buttons
    document.getElementById('continue-btn').addEventListener('click', (e) => {
      heartBurst(e.clientX, e.clientY);
      setTimeout(() => {
        showSection(4);
        createConfetti();
      }, 500);
    });

    document.getElementById('celebrate-btn').addEventListener('click', (e) => {
      createConfetti();
      heartBurst(e.clientX, e.clientY);
      for (let i = 0; i < 25; i++) {
        setTimeout(() => {
          createFireworks(
            Math.random() * window.innerWidth,
            Math.random() * (window.innerHeight * 0.7)
          );
        }, i * 120);
      }
    });

    document.getElementById('back-to-menu-msg').addEventListener('click', () => showSection(2));
    document.getElementById('back-to-menu-music').addEventListener('click', () => showSection(2));
    document.getElementById('back-to-menu-photo').addEventListener('click', () => showSection(2));

    // Touch swipe
    let touchStartX = 0;
    const photoFrame = document.querySelector('.photo-frame');
    if (photoFrame) {
      photoFrame.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
      });
      photoFrame.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          if (diff > 0 && currentPhoto < totalPhotos - 1) currentPhoto++;
          else if (diff < 0 && currentPhoto > 0) currentPhoto--;
          updatePhotoSlider();
        }
      });
    }

    // Auto hearts on message section
    setInterval(() => {
      const active = document.querySelector('.section.active');
      if (active && active.id === 'section-message') {
        createHeart(Math.random() * window.innerWidth, window.innerHeight);
      }
    }, 1800);

    // Resize handler
    window.addEventListener('resize', updatePhotoSlider);
  }

  // === INIT ===
  initPasscode();
  initEvents();
  initVideoControls();
  setTimeout(updatePhotoSlider, 100);
});