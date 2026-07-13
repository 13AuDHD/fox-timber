
(() => {
  const body = document.body;
  const menu = document.querySelector('.site-menu');
  const toggle = document.querySelector('.menu-toggle');
  const close = document.querySelector('.menu-close');
  const openMenu = () => { menu?.classList.add('open'); toggle?.setAttribute('aria-expanded','true'); body.style.overflow='hidden'; };
  const closeMenu = () => { menu?.classList.remove('open'); toggle?.setAttribute('aria-expanded','false'); body.style.overflow=''; };
  toggle?.addEventListener('click', openMenu);
  close?.addEventListener('click', closeMenu);
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // Swipe left from the right edge to open the menu.
  let touchStartX = 0, touchStartY = 0, edgeSwipe = false;
  document.addEventListener('touchstart', e => {
    const t = e.changedTouches[0];
    touchStartX = t.clientX; touchStartY = t.clientY;
    edgeSwipe = touchStartX > window.innerWidth - 42;
  }, {passive:true});
  document.addEventListener('touchend', e => {
    if (!edgeSwipe) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX, dy = t.clientY - touchStartY;
    if (dx < -65 && Math.abs(dx) > Math.abs(dy) * 1.3) openMenu();
    edgeSwipe = false;
  }, {passive:true});

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, {threshold:.12}) : null;
  document.querySelectorAll('.reveal').forEach(el => observer ? observer.observe(el) : el.classList.add('visible'));

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const status = contactForm.querySelector('.form-status');
      const button = contactForm.querySelector('button[type="submit"]');
      if (!contactForm.reportValidity()) return;
      button.disabled = true;
      button.innerHTML = 'Sending… <i class="fa-solid fa-spinner fa-spin"></i>';
      status.textContent = '';
      try {
        const response = await fetch(contactForm.action, {method:'POST', body:new FormData(contactForm), headers:{'Accept':'application/json'}});
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.message || 'Unable to send your message.');
        contactForm.hidden = true;
        const success = document.getElementById('success-panel');
        success.hidden = false;
        success.scrollIntoView({behavior:'smooth', block:'center'});
      } catch (error) {
        status.textContent = error.message || 'Something went wrong. Please try again.';
        button.disabled = false;
        button.innerHTML = 'Send message <i class="fa-solid fa-paper-plane"></i>';
      }
    });
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = loginForm.elements['login-email'].value.trim().toLowerCase();
      const password = loginForm.elements['login-password'].value;
      const error = loginForm.querySelector('.login-error');
      if (email === 'demo@foxandtimber.com' && password === 'timber2026') {
        document.querySelector('.portal-shell').hidden = true;
        document.getElementById('client-dashboard').hidden = false;
        sessionStorage.setItem('ft-demo-login','true');
      } else error.textContent = 'The demo email or password is incorrect.';
    });
    if (sessionStorage.getItem('ft-demo-login') === 'true') {
      document.querySelector('.portal-shell').hidden = true;
      document.getElementById('client-dashboard').hidden = false;
    }
  }
  document.querySelectorAll('.dashboard-nav [data-tab]').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.dashboard-nav [data-tab]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('[data-panel]').forEach(panel => panel.hidden = panel.dataset.panel !== btn.dataset.tab);
  }));
  document.getElementById('logout-button')?.addEventListener('click', () => {
    sessionStorage.removeItem('ft-demo-login'); location.reload();
  });
})();
