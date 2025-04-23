// Wait for DOM content to load before running scripts
document.addEventListener('DOMContentLoaded', function() {
  // Initialize loading screen
  initLoadingScreen();
  
  // Initialize particle effects
  initParticles();
  
  // Initialize face particle effects
  initFaceParticles();
  
  // Initialize typing effect
  initTypewriter();
  
  // Initialize navigation hover effects
  initNavEffects();
  
  // Initialize toggle mode button
  initToggleMode();
  
  // Initialize smooth scrolling
  initSmoothScroll();
  
  // Initialize blog post loading
  initBlogLoading();
  
  // Initialize mouse effects
  initMouseEffects();
  
  // Initialize punk background interactions
  initPunkBackground();
  
  // Initialize blog post modal
  initBlogPostModal();
});

// Loading screen animation and removal
function initLoadingScreen() {
  const loading = document.getElementById('loading');
  setTimeout(() => {
    loading.style.opacity = '0';
    setTimeout(() => {
      loading.style.display = 'none';
    }, 1000);
  }, 2500);
}

// Create and animate neon particles
function initParticles() {
  const particlesContainer = document.querySelector('.neon-particles');
  const colors = ['#ff00ff', '#00ffff', '#39ff14', '#ff003c'];
  
  for (let i = 0; i < 50; i++) {
    createParticle(particlesContainer, colors);
  }
}

// Initialize particles around the floating face
function initFaceParticles() {
  const faceParticleContainer = document.querySelector('.face-particle-container');
  const colors = ['#ff00ff', '#00ffff', '#ff00ff', '#39ff14'];
  
  for (let i = 0; i < 15; i++) {
    createFaceParticle(faceParticleContainer, colors);
  }
  
  // Periodically refresh face particles
  setInterval(() => {
    // Remove all existing particles
    while (faceParticleContainer.firstChild) {
      faceParticleContainer.removeChild(faceParticleContainer.firstChild);
    }
    
    // Create new particles
    for (let i = 0; i < 15; i++) {
      createFaceParticle(faceParticleContainer, colors);
    }
  }, 10000);
}

// Create particle specifically for the face
function createFaceParticle(container, colors) {
  const particle = document.createElement('div');
  particle.className = 'face-particle';
  
  // Random position around the face (in a circle)
  const angle = Math.random() * Math.PI * 2;
  const distance = 70 + Math.random() * 50;
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  
  // Random size between 1-3px
  const size = Math.random() * 2 + 1;
  
  // Random color from array
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  // Random opacity
  const opacity = Math.random() * 0.7 + 0.2;
  
  // Apply styles
  particle.style.cssText = `
    position: absolute;
    left: 50%;
    top: 50%;
    width: ${size}px;
    height: ${size}px;
    background-color: ${color};
    border-radius: 50%;
    opacity: ${opacity};
    box-shadow: 0 0 ${size * 2}px ${color};
    transform: translate(${x}px, ${y}px);
    pointer-events: none;
  `;
  
  // Add orbit animation
  const duration = Math.random() * 10 + 5;
  const orbitSize = Math.random() * 20 + 10;
  
  // Create keyframes for orbit motion
  const keyframes = [];
  for (let i = 0; i <= 100; i += 10) {
    const orbitAngle = (angle + (Math.PI * 2 * i / 100)) % (Math.PI * 2);
    const orbitX = x + Math.cos(orbitAngle) * orbitSize;
    const orbitY = y + Math.sin(orbitAngle) * orbitSize;
    
    keyframes.push({
      transform: `translate(${orbitX}px, ${orbitY}px) scale(${1 + (i % 20) / 20})`,
      opacity: opacity * (0.8 + (i % 20) / 50)
    });
  }
  
  // Apply animation
  particle.animate(keyframes, {
    duration: duration * 1000,
    iterations: Infinity,
    easing: 'linear'
  });
  
  container.appendChild(particle);
}

function createParticle(container, colors) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  // Random position
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  
  // Random size between 1-3px
  const size = Math.random() * 2 + 1;
  
  // Random color from array
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  // Random opacity
  const opacity = Math.random() * 0.5 + 0.3;
  
  // Apply styles
  particle.style.cssText = `
    position: absolute;
    left: ${x}%;
    top: ${y}%;
    width: ${size}px;
    height: ${size}px;
    background-color: ${color};
    border-radius: 50%;
    opacity: ${opacity};
    box-shadow: 0 0 ${size * 2}px ${color};
    pointer-events: none;
    z-index: 1;
  `;
  
  // Add animation
  const duration = Math.random() * 15 + 10;
  particle.animate(
    [
      { transform: 'translateY(0) translateX(0)', opacity: opacity },
      { opacity: 0, transform: `translateY(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 100 + 50}px) translateX(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 100 + 50}px)` }
    ],
    {
      duration: duration * 1000,
      iterations: Infinity,
      direction: 'alternate',
      easing: 'ease-in-out'
    }
  );
  
  container.appendChild(particle);
}

// Typewriter effect for the console text
function initTypewriter() {
  const text = "Become an independent developer. exploring the digital frontier...";
  const consoleText = document.getElementById('console-text');
  let charIndex = 0;
  
  function typeWriter() {
    if (charIndex < text.length) {
      consoleText.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, Math.random() * 100 + 50);
    } else {
      setTimeout(resetTypewriter, 3000);
    }
  }
  
  function resetTypewriter() {
    if (consoleText.textContent.length > 0) {
      consoleText.textContent = consoleText.textContent.slice(0, -1);
      setTimeout(resetTypewriter, 30);
    } else {
      charIndex = 0;
      setTimeout(typeWriter, 500);
    }
  }
  
  setTimeout(typeWriter, 1000);
}

// Add hover effects to navigation items
function initNavEffects() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('mouseover', createGlitchEffect);
    link.addEventListener('mouseout', removeGlitchEffect);
  });
}

// Create glitch effect on hover
function createGlitchEffect(e) {
  const target = e.target;
  
  // Apply glitch animation
  target.style.animation = 'nav-glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite';
  
  // Create audio feedback (optional - uncomment if desired)
  // const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAoKCgoKCgoKCgoKCgoKCgoKCg19fX19fX19fX19fX19fX19fX1//////////////////////9AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQCkAAAAAAAAAGwtLWUyzUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAANEAHwBQAAAP///////////////8AAAACEaEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MoxBsnkAJkBQAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVA');
  // audio.volume = 0.2;
  // audio.play();
}

// Remove glitch effect when not hovering
function removeGlitchEffect(e) {
  const target = e.target;
  target.style.animation = '';
}

// Toggle between light and dark cyberpunk modes
function initToggleMode() {
  const toggleButton = document.getElementById('toggleMode');
  toggleButton.addEventListener('click', function() {
    document.body.classList.toggle('night-mode');
    
    // Create a flash effect when toggling
    const flash = document.createElement('div');
    flash.className = 'mode-flash';
    flash.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.2);
      z-index: 9998;
      pointer-events: none;
    `;
    document.body.appendChild(flash);
    
    setTimeout(() => {
      flash.remove();
    }, 300);
  });
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
  document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Add blog post loading functionality
function initBlogLoading() {
  const loadMoreButton = document.getElementById('loadMore');
  const blogPosts = document.getElementById('blogPosts');
  
  loadMoreButton.addEventListener('click', function() {
    // Sample blog post data - in a real application, this would come from an API
    const posts = [
      {
        title: 'Getting Started with Cyberpunk CSS',
        date: '05.28.2024',
        content: 'Exploring the techniques behind creating vibrant, neon-infused web designs with modern CSS.',
        tags: ['design', 'css']
      },
      {
        title: 'Building Interactive UIs with JavaScript',
        date: '04.15.2024',
        content: 'How to create engaging user interfaces with modern JavaScript techniques and animations.',
        tags: ['javascript', 'ui']
      },
      {
        title: 'The Future of Web Development',
        date: '03.02.2024',
        content: 'Examining emerging technologies and trends that will shape the web development landscape.',
        tags: ['tech', 'future']
      }
    ];
    
    // Add new posts with animation
    posts.forEach((post, index) => {
      setTimeout(() => {
        addBlogPost(post);
      }, index * 300);
    });
    
    // Disable button after loading all posts
    loadMoreButton.disabled = true;
    loadMoreButton.textContent = 'NO MORE POSTS';
    loadMoreButton.classList.add('disabled');
  });
}

// Helper function to add a new blog post
function addBlogPost(post) {
  const blogPosts = document.getElementById('blogPosts');
  const newPost = document.createElement('article');
  newPost.className = 'blog-card';
  newPost.style.opacity = '0';
  newPost.style.transform = 'translateY(20px)';
  
  newPost.innerHTML = `
    <div class="card-header">
      <div class="card-date">${post.date}</div>
      <h3 class="card-title">${post.title}</h3>
    </div>
    <div class="card-content">
      <p>${post.content}</p>
    </div>
    <div class="card-footer">
      <a href="#" class="cyber-link">READ MORE</a>
      <div class="card-tags">
        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    </div>
    <div class="card-glow"></div>
  `;
  
  blogPosts.appendChild(newPost);
  
  // Trigger animation
  setTimeout(() => {
    newPost.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    newPost.style.opacity = '1';
    newPost.style.transform = 'translateY(0)';
  }, 10);
}

// Add mouse movement effects
function initMouseEffects() {
  document.addEventListener('mousemove', function(e) {
    // Create cursor trail effect
    createCursorTrail(e);
    
    // Create hover glow for interactive elements
    const x = e.clientX;
    const y = e.clientY;
    const buttons = document.querySelectorAll('.cyber-button, .blog-card, .social-link');
    
    buttons.forEach(button => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(x - centerX, y - centerY);
      const maxDistance = Math.max(rect.width, rect.height) * 1.5;
      
      if (distance < maxDistance) {
        const intensity = 1 - distance / maxDistance;
        button.style.setProperty('--hover-glow', `${intensity * 0.5}`);
      } else {
        button.style.setProperty('--hover-glow', '0');
      }
    });
    
    // Interact with floating face
    interactWithFloatingFace(e);
  });
}

// Create cursor trail effect
function createCursorTrail(e) {
  // Limit the rate of trail creation
  if (!createCursorTrail.lastCall || Date.now() - createCursorTrail.lastCall > 100) {
    createCursorTrail.lastCall = Date.now();
    
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
      position: absolute;
      width: 8px;
      height: 8px;
      background: var(--neon-primary);
      border-radius: 50%;
      left: ${e.pageX}px;
      top: ${e.pageY}px;
      opacity: 0.7;
      pointer-events: none;
      z-index: 9999;
    `;
    
    document.body.appendChild(trail);
    
    trail.animate(
      [
        { opacity: 0.7, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0)' }
      ],
      {
        duration: 800,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }
    );
    
    setTimeout(() => {
      trail.remove();
    }, 800);
  }
}

// Make floating face react to mouse
function interactWithFloatingFace(e) {
  const face = document.querySelector('.floating-face');
  if (!face) return;
  
  const faceRect = face.getBoundingClientRect();
  const faceCenterX = faceRect.left + faceRect.width / 2;
  const faceCenterY = faceRect.top + faceRect.height / 2;
  
  // Calculate distance from mouse to face center
  const distance = Math.hypot(e.clientX - faceCenterX, e.clientY - faceCenterY);
  const maxReactDistance = 300;
  
  if (distance < maxReactDistance) {
    // Calculate reaction intensity (stronger when closer)
    const intensity = 1 - (distance / maxReactDistance);
    
    // Calculate direction from face to mouse
    const angleRad = Math.atan2(e.clientY - faceCenterY, e.clientX - faceCenterX);
    
    // Face moves slightly away from cursor
    const moveX = Math.cos(angleRad) * -20 * intensity;
    const moveY = Math.sin(angleRad) * -20 * intensity;
    
    // Apply movement with transition
    face.style.transition = 'transform 0.3s ease-out';
    face.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.1}deg)`;
    
    // Increase glow intensity
    const faceGlow = face.querySelector('.face-glow');
    if (faceGlow) {
      faceGlow.style.opacity = 0.7 + (intensity * 0.3);
      faceGlow.style.filter = `blur(${15 + (intensity * 10)}px)`;
    }
    
    // Create particle burst if very close
    if (distance < 100 && Math.random() > 0.9) {
      createFaceParticleBurst(e.clientX, e.clientY);
    }
  } else {
    // Reset face position with animation
    face.style.transition = 'transform 1s ease-out';
    face.style.transform = '';
    
    // Reset glow
    const faceGlow = face.querySelector('.face-glow');
    if (faceGlow) {
      faceGlow.style.opacity = '';
      faceGlow.style.filter = '';
    }
  }
}

// Create a burst of particles from the face when interacted with
function createFaceParticleBurst(x, y) {
  const colors = ['#ff00ff', '#00ffff', '#39ff14'];
  const body = document.body;
  
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.className = 'burst-particle';
    
    // Random size
    const size = Math.random() * 4 + 2;
    
    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Set initial position at the mouse
    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      box-shadow: 0 0 ${size * 2}px ${color};
    `;
    
    body.appendChild(particle);
    
    // Random direction and speed
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 100 + 50;
    const destinationX = x + Math.cos(angle) * speed;
    const destinationY = y + Math.sin(angle) * speed;
    
    // Animate particle burst
    particle.animate(
      [
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${Math.cos(angle) * speed}px, ${Math.sin(angle) * speed}px) scale(0)`, opacity: 0 }
      ],
      {
        duration: Math.random() * 1000 + 500,
        easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
      }
    ).onfinish = () => {
      particle.remove();
    };
  }
}

// Add custom style for hover glow (append to end of body)
const hoverGlowStyle = document.createElement('style');
hoverGlowStyle.textContent = `
  .cyber-button, .blog-card, .social-link {
    --hover-glow: 0;
    box-shadow: 0 0 calc(var(--hover-glow) * 20px) var(--neon-secondary);
    transition: box-shadow 0.3s ease;
  }
`;
document.head.appendChild(hoverGlowStyle);

// CSS Keyframes for nav-glitch (add to styles)
const navGlitchStyle = document.createElement('style');
navGlitchStyle.textContent = `
  @keyframes nav-glitch {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
    100% {
      transform: translate(0);
    }
  }
`;
document.head.appendChild(navGlitchStyle);

// Initialize punk background interactivity
function initPunkBackground() {
  const punkBg = document.querySelector('.punk-bg');
  
  // Make background react to mouse movement
  document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) / 50;
    const moveY = (e.clientY - window.innerHeight / 2) / 50;
    
    punkBg.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
  
  // Make background react to scroll
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const opacity = 0.15 - (scrollPos / 5000);
    const scale = 1 + (scrollPos / 10000);
    
    punkBg.style.opacity = Math.max(0.05, opacity);
    punkBg.style.transform = `scale(${scale})`;
  });
}

// Initialize blog post modal functionality
function initBlogPostModal() {
  const viewFullPostButton = document.getElementById('viewFullPost');
  const modal = document.getElementById('blogPostModal');
  const closeButton = document.querySelector('.close-modal');
  
  if (!viewFullPostButton || !modal || !closeButton) return;
  
  // Open modal when clicking Read More
  viewFullPostButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Add glitching effect to the modal before opening
    const glitchDuration = 600;
    const body = document.body;
    
    // Create glitch overlay
    const glitchOverlay = document.createElement('div');
    glitchOverlay.className = 'modal-glitch-overlay';
    glitchOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 0, 255, 0.1);
      z-index: 999;
      pointer-events: none;
      mix-blend-mode: color-dodge;
    `;
    body.appendChild(glitchOverlay);
    
    // Animate glitch effect
    let counter = 0;
    const glitchInterval = setInterval(() => {
      counter++;
      glitchOverlay.style.transform = `translateX(${Math.random() * 10 - 5}px) translateY(${Math.random() * 10 - 5}px)`;
      glitchOverlay.style.opacity = Math.random() * 0.5 + 0.1;
      
      if (counter > 10) {
        clearInterval(glitchInterval);
        glitchOverlay.remove();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Apply dynamic neon glow to title
        const title = document.querySelector('.post-title');
        if (title) {
          title.style.animation = 'text-shine 3s linear infinite';
        }
      }
    }, glitchDuration / 10);
  });
  
  // Close modal when clicking X
  closeButton.addEventListener('click', closeModal);
  
  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
  
  function closeModal() {
    // Create closing animation
    modal.style.animation = 'modal-fade-out 0.3s ease-out';
    
    setTimeout(() => {
      modal.style.display = 'none';
      modal.style.animation = '';
      document.body.style.overflow = '';
    }, 300);
  }
  
  // Add animation for modal closing
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes modal-fade-out {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(styleSheet);
  
  // Add neon highlight effect to code examples in posts
  highlightCodeElements();
}

// Add highlighting to code elements
function highlightCodeElements() {
  const codeElements = document.querySelectorAll('.post-content code');
  
  codeElements.forEach(code => {
    code.style.cssText = `
      background-color: var(--cyber-dark-3);
      color: var(--neon-green);
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Share Tech Mono', monospace;
      border-left: 2px solid var(--neon-primary);
    `;
  });
}
