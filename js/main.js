 // Navbar scroll effect
 const navbar = document.getElementById('navbar');
 const navLinks = document.querySelectorAll('.nav-links a');
 
 window.addEventListener('scroll', () => {
   if (window.scrollY > 50) {
     navbar.classList.add('scrolled');
   } else {
     navbar.classList.remove('scrolled');
   }
 });

 // Mobile menu toggle
 const menuToggle = document.getElementById('mobile-menu');
 const navLinksContainer = document.getElementById('nav-links');
 
 menuToggle.addEventListener('click', () => {
   navLinksContainer.classList.toggle('active');
 });

 // Close mobile menu when clicking a link
 navLinks.forEach(link => {
   link.addEventListener('click', () => {
     navLinksContainer.classList.remove('active');
   });
 });

 // Active nav link on scroll
 const sections = document.querySelectorAll('section[id]');
 
 window.addEventListener('scroll', () => {
   let current = '';
   sections.forEach(section => {
     const sectionTop = section.offsetTop;
     const sectionHeight = section.clientHeight;
     if (scrollY >= (sectionTop - 200)) {
       current = section.getAttribute('id');
     }
   });

   navLinks.forEach(link => {
     link.classList.remove('active');
     if (link.getAttribute('href') === `#${current}`) {
       link.classList.add('active');
     }
   });
 });

 // Smooth scroll for all anchor links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
     e.preventDefault();
     const target = document.querySelector(this.getAttribute('href'));
     if (target) {
       target.scrollIntoView({
         behavior: 'smooth',
         block: 'start'
       });
     }
   });
 });

 // Intersection Observer for fade-in animations
 const observerOptions = {
   threshold: 0.1,
   rootMargin: '0px 0px -100px 0px'
 };

 const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
     if (entry.isIntersecting) {
       entry.target.style.opacity = '1';
       entry.target.style.transform = 'translateY(0)';
     }
   });
 }, observerOptions);

 // Observe division cards
 document.querySelectorAll('.division-card').forEach((card, index) => {
   card.style.opacity = '0';
   card.style.transform = 'translateY(30px)';
   card.style.transition = `all 0.6s ease ${index * 0.1}s`;
   observer.observe(card);
 });

 // Observe feature items
 document.querySelectorAll('.feature-item').forEach((item, index) => {
   item.style.opacity = '0';
   item.style.transform = 'translateX(-20px)';
   item.style.transition = `all 0.5s ease ${index * 0.1}s`;
   observer.observe(item);
 });

 // Animate stats on scroll
 const statsSection = document.querySelector('.stats-section');
 let statsAnimated = false;

 const statsObserver = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
     if (entry.isIntersecting && !statsAnimated) {
       statsAnimated = true;
       document.querySelectorAll('.stat-item h3').forEach(stat => {
         const target = stat.textContent;
         const number = parseInt(target);
         if (!isNaN(number)) {
           animateNumber(stat, 0, number, 2000);
         }
       });
     }
   });
 }, { threshold: 0.5 });

 if (statsSection) {
   statsObserver.observe(statsSection);
 }

 function animateNumber(element, start, end, duration) {
   const range = end - start;
   const increment = range / (duration / 16);
   let current = start;
   const suffix = element.textContent.replace(/[0-9]/g, '');

   const timer = setInterval(() => {
     current += increment;
     if (current >= end) {
       element.textContent = end + suffix;
       clearInterval(timer);
     } else {
       element.textContent = Math.floor(current) + suffix;
     }
   }, 16);
 }
