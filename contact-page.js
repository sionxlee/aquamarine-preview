// Contact details share the same source as Visit, Footer and WhatsApp.
const contactBusiness = aquamarineBusiness;
const contactLinks = aquamarineBusinessLinks;
const contactWhatsapp = `${contactLinks.whatsapp}?text=${encodeURIComponent(contactBusiness.whatsappMessage)}`;
document.querySelector('#contact-details').innerHTML = `
<address class="reveal" style="--delay:200ms">${contactBusiness.address.street}<br>${contactBusiness.address.locality}</address>
<dl class="contact-facts reveal" style="--delay:300ms"><div><dt>OPENING HOURS</dt><dd>${aquamarineOpeningHours.time}<br>${aquamarineOpeningHours.closed}</dd></div><div><dt>CALL</dt><dd><a href="${contactLinks.phone}">${contactBusiness.phone.display}</a></dd></div><div><dt>WHATSAPP</dt><dd><a data-contact-whatsapp>${contactBusiness.whatsapp.display}</a></dd></div></dl>
<div class="contact-actions reveal" style="--delay:400ms"><a class="contact-action" data-contact-maps>GET DIRECTIONS <span aria-hidden="true">→</span></a><a class="contact-action" data-contact-whatsapp>WHATSAPP US <span aria-hidden="true">→</span></a></div>`;
for (const [selector,url] of [['[data-contact-whatsapp]',contactWhatsapp],['[data-contact-maps]',contactLinks.directions]]) {
 document.querySelectorAll(selector).forEach(link=>{link.href=url;link.target='_blank';link.rel='noopener noreferrer';});
}
document.querySelectorAll('.site-footer a[href^="#"]').forEach(link=>link.setAttribute('href',`/aquamarine-preview/${link.getAttribute('href')}`));
