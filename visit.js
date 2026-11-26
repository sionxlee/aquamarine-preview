const visit = document.querySelector('#visit');
if (visit) {
  const business = aquamarineBusiness;
  const links = aquamarineBusinessLinks;
  visit.innerHTML = `
    <div class="visit-copy">
      <p class="visit-label reveal">VISIT AQUAMARINE</p>
      <h2 id="visit-title" class="reveal" style="--delay:100ms">A little time,<br>just for you.</h2>
      <address class="visit-address reveal" style="--delay:200ms">${business.address.street}<br>${business.address.locality}</address>
      <div class="visit-details reveal" style="--delay:300ms">
        <div class="visit-hours"><h3>OPENING HOURS</h3><p>${aquamarineOpeningHours.time}<br>${aquamarineOpeningHours.closed}</p></div>
        <div><h3>PHONE</h3><a href="${links.phone}">${business.phone.display}</a></div>
        <div><h3>WHATSAPP</h3><a href="${links.whatsapp}" target="_blank" rel="noopener noreferrer">${business.whatsapp.display}</a></div>
      </div>
      <div class="visit-actions reveal" style="--delay:400ms">
        <a href="${links.directions}" target="_blank" rel="noopener noreferrer">Get Directions <span aria-hidden="true">→</span></a>
        <a href="${links.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp Us <span aria-hidden="true">→</span></a>
      </div>
    </div>
    <figure class="visit-photo reveal" style="--delay:100ms">
      <img ${aquamarineImageAttributes('aquamarine-storefront.jpg', 'editorial')} width="762" height="1016" alt="Aquamarine storefront on East Coast Road, with its entrance and the 166 address marker visible" loading="lazy">
    </figure>`;
}
