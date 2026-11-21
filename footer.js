// Business information and optional destinations are owned by business.js.
const footer = document.querySelector('#footer');
if (footer) {
  const business = aquamarineBusiness;
  const links = aquamarineBusinessLinks;
  footer.innerHTML = `
    <div class="footer-main">
      <div class="footer-brand reveal"><a href="#home" aria-label="Aquamarine home"><img class="official-logo footer-logo" src="/aquamarine-preview/assets/Aquamarine-logo.svg" width="911.826" height="161.883" alt="Aquamarine"></a><p>Hair · Beauty · Wellness</p></div>
      <nav class="footer-explore reveal" aria-label="Footer navigation" style="--delay:100ms"><h2>Explore</h2><a href="#about">About</a><a href="#services">Services</a><a href="/aquamarine-preview/contact/">Contact</a></nav>
      <div class="footer-details reveal" style="--delay:200ms">
        <h2>Visit</h2><address>${business.address.street}<br>${business.address.locality}</address><p>${business.openingHours}</p>
        <div class="footer-contact"><h2>Contact</h2><a href="${links.phone}">${business.phone.display}</a><a href="${links.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp ${business.whatsapp.display}</a></div>
        <div class="footer-optional"></div>
      </div>
    </div>
    <div class="footer-bottom"><small>© 2026 Aquamarine Hair &amp; Beauty</small></div>`;
  for (const [value, label] of [[business.bookingUrl, 'Book Appointment →'], [business.instagramUrl, 'Instagram ↗']]) {
    const url = aquamarineOptionalUrl(value);
    if (!url) continue;
    const link = document.createElement('a');
    link.href = url;
    link.textContent = label;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    footer.querySelector('.footer-optional').append(link);
  }
}
const whatsappContact = document.querySelector('#whatsapp-contact');
if (whatsappContact) {
  const link = document.createElement('a');
  link.className = 'floating-whatsapp';
  link.href = `${aquamarineBusinessLinks.whatsapp}?text=${encodeURIComponent(aquamarineBusiness.whatsappMessage)}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', 'Chat with Aquamarine on WhatsApp');
  link.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.449A11.807 11.807 0 0 0 12.004 0C5.392 0 .011 5.38 .009 11.992c0 2.114.552 4.177 1.6 5.997L0 24l6.335-1.652a11.99 11.99 0 0 0 5.669 1.445h.005c6.611 0 11.992-5.38 11.995-11.992a11.91 11.91 0 0 0-3.484-8.352zM12.004 21.77a9.94 9.94 0 0 1-5.063-1.386l-.363-.216-3.76.982 1.003-3.665-.237-.376a9.924 9.924 0 0 1-1.52-5.117c.002-5.496 4.474-9.968 9.974-9.968a9.9 9.9 0 0 1 7.053 2.923 9.903 9.903 0 0 1 2.916 7.056c-.003 5.497-4.475 9.967-9.973 9.967zm5.473-7.464c-.3-.15-1.774-.875-2.049-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.413-1.49-.892-.795-1.494-1.777-1.669-2.077-.175-.3-.018-.462.132-.611.135-.134.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.243-.584-.49-.505-.675-.515-.175-.009-.375-.011-.575-.011-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.116 3.232 5.126 4.532.716.309 1.275.494 1.711.632.719.228 1.373.196 1.89.119.577-.086 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/></svg><span class="whatsapp-label">Chat with us</span>`;
  whatsappContact.append(link);

  const backToTop = document.createElement('button');
  backToTop.type = 'button';
  backToTop.className = 'back-to-top';
  backToTop.hidden = true;
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = `<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 14 6-6 6 6"/><path d="M12 8v10"/></svg>`;
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
  whatsappContact.append(backToTop);
  const updateBackToTop = () => { backToTop.hidden = window.scrollY < 300; };
  updateBackToTop();
  window.addEventListener('scroll', updateBackToTop, { passive: true });
}
