// Content stays separate from layout so treatments and translations can grow later.
const services = [
  { name: 'Hair', href: '/aquamarine-preview/services/hair/', image: 'hair.jpg', alt: 'Stylist blow-drying a client’s hair in a bright salon', description: 'Considered cuts. Beautiful colour. Hair that feels like you.' },
  { name: 'Head Spa', href: '/aquamarine-preview/services/head-spa/', image: 'head-spa.jpg', alt: 'A relaxing scalp massage and hair rinse at the salon basin', description: 'A moment to slow down. Restore balance, from scalp to soul.' },
  { name: 'Facial', href: '/aquamarine-preview/services/facial/', image: 'facial.jpg', alt: 'A gentle facial treatment with a skincare device', description: 'Thoughtful care for your skin. A fresh, natural radiance.' },
];
const servicesContainer = document.querySelector('.services');
if (servicesContainer) services.forEach((service, index) => {
  const panel = document.createElement('a');
  panel.className = 'service';
  panel.href = service.href;
  panel.setAttribute('aria-label', `Explore ${service.name}`);
  panel.innerHTML = `<img ${aquamarineImageAttributes(service.image, service.image === 'head-spa.jpg' ? 'panelPortrait' : 'panel')} width="${aquamarineImages[service.image].width}" height="${aquamarineImages[service.image].height}" alt="${service.alt}" loading="lazy"><span class="service-number">0${index + 1} /</span><div class="service-copy"><h2 class="reveal">${service.name}</h2><p class="reveal" style="--delay:100ms">${service.description}</p><span class="service-explore reveal" style="--delay:200ms">Explore <span aria-hidden="true">⟶</span></span></div>`;
  servicesContainer.append(panel);
});
const header = document.querySelector('.header');
// The shared About destination is now the brand introduction page.
header.querySelectorAll('a[href="#about"], a[href="/aquamarine-preview/#about"]').forEach(link => link.setAttribute('href', '/aquamarine-preview/about/'));
const servicesNav = header.querySelector('.header-services');
const servicesToggle = header.querySelector('.services-toggle');
const servicesSubmenu = header.querySelector('.services-submenu');
const desktopNavigation = window.matchMedia('(min-width: 761px)');
function setServicesOpen(open) {
  if (!servicesNav) return;
  servicesNav.classList.toggle('is-open', open);
  servicesToggle.setAttribute('aria-expanded', String(open));
  servicesToggle.querySelector('.services-indicator').textContent = open ? '−' : '+';
  servicesSubmenu.inert = !open;
}
if (servicesNav) {
  // Desktop hover may open before click; clicking must not immediately close it.
  servicesToggle.addEventListener('click', () => setServicesOpen(desktopNavigation.matches || servicesToggle.getAttribute('aria-expanded') !== 'true'));
  servicesNav.addEventListener('pointerenter', event => {
    if (desktopNavigation.matches && event.pointerType === 'mouse') setServicesOpen(true);
  });
  servicesNav.addEventListener('pointerleave', () => {
    if (desktopNavigation.matches && !servicesNav.contains(document.activeElement)) setServicesOpen(false);
  });
  servicesToggle.addEventListener('focus', () => {
    if (desktopNavigation.matches && servicesToggle.matches(':focus-visible')) setServicesOpen(true);
  });
  servicesNav.addEventListener('focusout', event => {
    // Some browsers report null when a pointer focuses a link. Do not hide
    // or make that link inert before its native click has navigated.
    if (event.relatedTarget && !servicesNav.contains(event.relatedTarget)) setServicesOpen(false);
  });
  servicesNav.addEventListener('keydown', event => {
    if (event.key === 'Escape' && servicesToggle.getAttribute('aria-expanded') === 'true') {
      event.preventDefault(); event.stopPropagation();
      servicesToggle.focus(); setServicesOpen(false);
    }
    if (event.key === 'ArrowDown' && event.target === servicesToggle) {
      event.preventDefault(); setServicesOpen(true); servicesSubmenu.querySelector('a').focus();
    }
  });
  document.addEventListener('click', event => {
    if (!servicesNav.contains(event.target)) setServicesOpen(false);
  });
}
const toggle = document.querySelector('.menu-toggle');
function closeMenu() { setServicesOpen(false); header.classList.remove('menu-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); }
toggle.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  if (!open) setServicesOpen(false);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 35), { passive: true });
header.classList.toggle('scrolled', window.scrollY > 35);
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
