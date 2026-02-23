/* ============================================================
   INFONEX SOLUTIONS — main.js
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. NAVBAR SCROLL EFFECT ──────────────────────────────────
  const nav = document.getElementById('mainNav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    // Active nav link
    const sections = document.querySelectorAll('section[id], div[id]');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
    // Back to top
    document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── 2. BACK TO TOP ──────────────────────────────────────────
  document.getElementById('backToTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── 3. SERVICE TABS ─────────────────────────────────────────
  document.querySelectorAll('.service-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.service-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.service-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('panel-' + tab.dataset.target);
      if (panel) {
        panel.classList.add('active');
        panel.querySelectorAll('.service-card').forEach((card, i) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 60);
        });
      }
    });
  });

  // ── 4. COUNTER ANIMATION ────────────────────────────────────
  const counters = document.querySelectorAll('.stat-num[data-target]');
  let countersStarted = false;
  const animateCounters = () => {
    counters.forEach(el => {
      const target = +el.dataset.target;
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current);
      }, 16);
    });
  };
  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !countersStarted) {
        countersStarted = true;
        animateCounters();
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(statsBar);
  }

  // ── 5. SCROLL REVEAL ────────────────────────────────────────
  const revealEls = document.querySelectorAll(
    '.service-card, .why-card, .value-card, .serve-card, .price-card, .process-step, .contact-item'
  );
  revealEls.forEach(el => el.classList.add('reveal'));
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  // ── 6. CONTACT FORM ─────────────────────────────────────────
  const form = document.getElementById('contactForm');
  const successEl = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name    = document.getElementById('name').value.trim();
      const phone   = document.getElementById('phone').value.trim();
      const org     = document.getElementById('org').value.trim();
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value.trim();

      if (!name || !phone) {
        // Shake invalid fields
        [document.getElementById('name'), document.getElementById('phone')].forEach(el => {
          if (!el.value.trim()) {
            el.style.borderColor = '#C00000';
            el.style.animation = 'shake 0.4s ease';
            setTimeout(() => { el.style.animation = ''; }, 400);
          }
        });
        return;
      }

      // Build WhatsApp message and open in new tab as primary CTA
      const wa = encodeURIComponent(
        `Hello Infonex Solutions!\n\nName: ${name}\nOrganisation: ${org || 'N/A'}\nService Needed: ${service || 'General enquiry'}\n\nMessage: ${message || 'I would like a free consultation.'}`
      );
      window.open(`https://wa.me/254795800229?text=${wa}`, '_blank');

      // Show success message
      form.style.opacity = '0.4';
      form.style.pointerEvents = 'none';
      successEl.classList.remove('d-none');
      successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // ── 7. PARTICLE CANVAS ──────────────────────────────────────
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', () => { resize(); initParticles(); });

    const PARTICLE_COUNT = 70;

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x  = Math.random() * W;
        this.y  = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r  = Math.random() * 1.5 + 0.5;
        this.a  = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192,0,0,${this.a})`;
        ctx.fill();
      }
    }

    const initParticles = () => { particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle()); };
    initParticles();

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(192,0,0,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    let animId;
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      animId = requestAnimationFrame(loop);
    };
    loop();

    // Pause when tab hidden for performance
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(animId);
      else loop();
    });
  }

  // ── 8. SMOOTH SCROLL for anchors ────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = nav ? nav.offsetHeight : 70;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        // Close mobile menu
        const menu = document.getElementById('navMenu');
        if (menu?.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(menu);
          bsCollapse?.hide();
        }
      }
    });
  });

  // ── 9. TYPEWRITER on hero tag ────────────────────────────────
  const tagEl = document.querySelector('.hero-tag');
  if (tagEl) {
    const texts = [
      'CYBERSECURITY / & SECURE INFRASTRUCTURE',
      'PROTECTING YOUR BUSINESS & SCHOOL',
      'NAKURU-BASED · KENYA-PROUD',
    ];
    let ti = 0, ci = 0, deleting = false;
    const dotEl = tagEl.querySelector('.tag-dot');
    let textNode = document.createTextNode('');
    tagEl.appendChild(textNode);

    const type = () => {
      const txt = texts[ti];
      if (!deleting) {
        textNode.textContent = txt.slice(0, ci++);
        if (ci > txt.length) { deleting = true; setTimeout(type, 2200); return; }
      } else {
        textNode.textContent = txt.slice(0, ci--);
        if (ci < 0) { deleting = false; ti = (ti + 1) % texts.length; ci = 0; }
      }
      setTimeout(type, deleting ? 25 : 55);
    };
    // Clear original text, start after short delay
    setTimeout(() => { tagEl.childNodes.forEach(n => { if (n.nodeType === 3) n.textContent = ''; }); tagEl.appendChild(textNode); type(); }, 800);
  }

});

// ── CSS Keyframe for shake (injected via JS for self-containment) ──
const style = document.createElement('style');
style.textContent = `@keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }`;
document.head.appendChild(style);
