// Wait for DOM content to load before running scripts
document.addEventListener('DOMContentLoaded', function() {
  // Initialize blog post loading on index page
  initBlogPosts();
  
  // Initialize blog post modal
  initBlogPostModal();
  
  // Initialize code highlighting for blog posts
  highlightCodeElements();
});

// Load blog posts on the index page
function initBlogPosts() {
  const blogContainer = document.getElementById('blog-posts');
  if (!blogContainer) return;
  
  // Fetch the posts data
  fetch('js/posts.json')
    .then(response => response.json())
    .then(data => {
      // Sort posts by date (newest first)
      data.posts.sort((a, b) => {
        const dateA = new Date(a.date.split('.').reverse().join('-'));
        const dateB = new Date(b.date.split('.').reverse().join('-'));
        return dateB - dateA;
      });
      
      // Get featured posts
      const featuredPosts = data.posts.filter(post => post.featured);
      
      // Display featured posts first
      featuredPosts.forEach(post => {
        createBlogPostCard(post, blogContainer, true);
      });
      
      // Display other posts
      data.posts.filter(post => !post.featured).forEach(post => {
        createBlogPostCard(post, blogContainer, false);
      });
    })
    .catch(error => {
      console.error('Error loading blog posts:', error);
      blogContainer.innerHTML = `
        <div class="error-message">
          <h3 class="neon-text">Error Loading Posts</h3>
          <p>Could not load blog posts. Please try again later.</p>
        </div>
      `;
    });
}

// Create a blog post card for the index page
function createBlogPostCard(post, container, featured) {
  const card = document.createElement('div');
  card.className = `blog-card ${featured ? 'featured' : ''}`;
  
  // Calculate tag HTML
  const tagsHTML = post.tags.map(tag => 
    `<span class="tag">${tag}</span>`
  ).join('');
  
  // Build card HTML
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-header">
        <h3 class="post-title">${post.title}</h3>
        <span class="post-date">${post.date}</span>
      </div>
      <div class="card-content">
        <p>${post.summary}</p>
      </div>
      <div class="card-footer">
        <div class="post-tags">
          ${tagsHTML}
        </div>
        <a href="posts/${post.id}.html" class="read-more">READ MORE</a>
      </div>
    </div>
  `;
  
  // Add glitch effect on hover
  card.addEventListener('mouseover', () => {
    card.classList.add('glitching');
  });
  
  card.addEventListener('mouseout', () => {
    card.classList.remove('glitching');
  });
  
  container.appendChild(card);
}

// Initialize modal for previewing blog posts on index page
function initBlogPostModal() {
  // Check if modal container already exists
  let modalContainer = document.querySelector('.blog-post-modal');
  
  // Create modal if it doesn't exist
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.className = 'blog-post-modal';
    modalContainer.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title"></h2>
          <div class="modal-meta">
            <span class="modal-date"></span>
            <div class="modal-tags"></div>
          </div>
          <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body"></div>
      </div>
      <div class="glitch-overlay"></div>
    `;
    document.body.appendChild(modalContainer);
    
    // Add event listener to close button
    const closeButton = modalContainer.querySelector('.close-modal');
    closeButton.addEventListener('click', closeModal);
    
    // Add click event to close when clicking outside modal
    modalContainer.addEventListener('click', function(e) {
      if (e.target === modalContainer) {
        closeModal();
      }
    });
    
    // Add escape key to close modal
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
    
    // Set up event delegation for read more links
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('read-more')) {
        e.preventDefault();
        const postUrl = e.target.getAttribute('href');
        openModal(postUrl);
      }
    });
  }
}

// Open the modal and load the blog post content
function openModal(postUrl) {
  const modal = document.querySelector('.blog-post-modal');
  const glitchOverlay = modal.querySelector('.glitch-overlay');
  const modalContent = modal.querySelector('.modal-content');
  const modalTitle = modal.querySelector('.modal-title');
  const modalDate = modal.querySelector('.modal-date');
  const modalTags = modal.querySelector('.modal-tags');
  const modalBody = modal.querySelector('.modal-body');
  
  // Show modal with loading state
  modal.classList.add('open');
  modalBody.innerHTML = '<div class="loading-spinner"></div>';
  
  // Create glitch effect when opening
  glitchOverlay.style.display = 'block';
  let glitchCount = 0;
  
  const glitchInterval = setInterval(() => {
    glitchOverlay.style.opacity = Math.random() > 0.5 ? 0.05 : 0;
    glitchOverlay.style.transform = `translateX(${Math.random() * 10 - 5}px)`;
    
    glitchCount++;
    if (glitchCount > 10) {
      clearInterval(glitchInterval);
      glitchOverlay.style.opacity = 0;
      glitchOverlay.style.transform = 'translateX(0)';
    }
  }, 50);
  
  // Fetch the blog post content
  fetch(postUrl)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Extract post information
      const title = doc.querySelector('title').textContent;
      const articleElement = doc.querySelector('article');
      const dateElement = doc.querySelector('time');
      const tagsContainer = doc.querySelector('.post-tags');
      
      // Set modal content
      modalTitle.textContent = title;
      
      if (dateElement) {
        modalDate.textContent = dateElement.textContent;
      }
      
      if (tagsContainer) {
        modalTags.innerHTML = tagsContainer.innerHTML;
      }
      
      if (articleElement) {
        modalBody.innerHTML = articleElement.innerHTML;
        
        // Enhance code blocks if any
        const codeBlocks = modalBody.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
          block.classList.add('cyberpunk-code');
        });
        
        // Add neon glow to headings
        const headings = modalBody.querySelectorAll('h1, h2, h3, h4');
        headings.forEach(heading => {
          heading.classList.add('neon-text');
        });
      } else {
        modalBody.innerHTML = '<p>Could not load post content.</p>';
      }
      
      // Apply code highlighting
      highlightCodeElements(modalBody);
    })
    .catch(error => {
      console.error('Error loading blog post:', error);
      modalBody.innerHTML = `
        <div class="error-message">
          <h3 class="neon-text">Error Loading Post</h3>
          <p>Could not load blog post content. Please try again later.</p>
        </div>
      `;
    });
}

// Close the modal with animation
function closeModal() {
  const modal = document.querySelector('.blog-post-modal');
  
  // Add closing animation
  modal.classList.add('closing');
  
  // Remove modal after animation completes
  setTimeout(() => {
    modal.classList.remove('open', 'closing');
  }, 300);
}

// Apply syntax highlighting to code elements
function highlightCodeElements(container = document) {
  const codeElements = container.querySelectorAll('pre code');
  
  codeElements.forEach(code => {
    // Add cyberpunk class
    code.classList.add('cyberpunk-code');
    
    // Add neon highlight to important keywords
    const keywords = ['function', 'return', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'import', 'export', 'class', 'extends', 'new', 'async', 'await'];
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      code.innerHTML = code.innerHTML.replace(regex, `<span class="neon-keyword">${keyword}</span>`);
    });
    
    // Add a subtle animation to brackets
    const brackets = ['(', ')', '{', '}', '[', ']'];
    brackets.forEach(bracket => {
      code.innerHTML = code.innerHTML.replace(
        new RegExp(`\\${bracket}`, 'g'), 
        `<span class="code-bracket">${bracket}</span>`
      );
    });
  });
}

// Add CSS for fade-out animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
  @keyframes modal-fade-out {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }
  
  .blog-post-modal.closing .modal-content {
    animation: modal-fade-out 0.3s ease-out both;
  }
`;
document.head.appendChild(fadeOutStyle); 