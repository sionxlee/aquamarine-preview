// Shared source for Visit, Footer and the future Contact page.
const aquamarineBusiness = Object.freeze({
  address: Object.freeze({ street: '166 East Coast Road', locality: 'Singapore 428872' }),
  openingHours: 'Daily · 10:30 AM — 8:30 PM',
  phone: Object.freeze({ display: '8984 0317', international: '+6589840317' }),
  whatsapp: Object.freeze({ display: '8984 0166', international: '+6589840166' }),
  bookingUrl: null,
  instagramUrl: null,
  whatsappMessage: "Hi Aquamarine, I'd like to enquire about an appointment.",
});
const aquamarineBusinessLinks = Object.freeze({
  phone: `tel:${aquamarineBusiness.phone.international}`,
  whatsapp: `https://wa.me/${aquamarineBusiness.whatsapp.international.replace('+', '')}`,
  directions: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${aquamarineBusiness.address.street}, ${aquamarineBusiness.address.locality}`)}`,
});

function aquamarineOptionalUrl(value) {
  if (!value) return null;
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; }
  catch { return null; }
}
