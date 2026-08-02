// Mobile nav accessibility + scroll-lock improvements
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const navRight = document.querySelector('nav .right');
  if (!hamburger || !navRight) return;

  // Ensure proper ARIA defaults
  hamburger.setAttribute('aria-controls', 'mobile-nav');
  hamburger.setAttribute('aria-expanded', 'false');

  const toggleMenu = (open) => {
    if (open) {
      navRight.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open'); // CSS will prevent background scroll
    } else {
      navRight.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }
  };

  hamburger.addEventListener('click', function () {
    toggleMenu(!navRight.classList.contains('active'));
  });

  // Close on nav link click
  navRight.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => toggleMenu(false))
  );

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navRight.classList.contains('active')) {
      toggleMenu(false);
    }
  });
});


// Hide/show navigation bar on scroll (kept for behavior)
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Hide header when scrolling down
    if (header) header.style.transform = 'translateY(-100%)';
  } else {
    // Show header when scrolling up
    if (header) header.style.transform = 'translateY(0)';
  }

  lastScrollTop = scrollTop;
});

// Smooth scrolling on navigation links
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (event) {
      // allow normal behaviour for external links
      const href = this.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      event.preventDefault(); // Prevent default jump for internal links

      // Get the target section's class from the link's href (legacy behaviour)
      const targetClass = href.replace(/^#?\.?/, ''); // supports .home or #home or home
      let targetSection = document.querySelector('.' + targetClass);
      if (!targetSection) targetSection = document.getElementById(targetClass);

      // If the target section exists, scroll to it smoothly
      if (targetSection) {
        const y = targetSection.getBoundingClientRect().top + window.pageYOffset - 70; // offset for fixed header
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
});


// EmailJS initialization and contact form handling (kept intact)
if (typeof emailjs !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    try { emailjs.init('rHrVdormF90lS2DEr'); } catch (e) { /* fail silently if EmailJS not loaded */ }

    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const formData = {
        user_name: document.getElementById('name').value,
        user_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };

      emailjs.send('service_d0f7tw9', 'template_v9kc6e7', formData)
        .then(function(response) {
          alert('✅ Message Sent Successfully!');
          form.reset();
        })
        .catch(function(error) {
          alert('❌ Failed to send message. Please try again.');
          console.error('EmailJS Error:', error);
        });
    });
  });
}
