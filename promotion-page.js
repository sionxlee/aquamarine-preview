(() => {
  document.querySelectorAll('[data-whatsapp]').forEach(link => {
    const number = link.dataset.whatsapp;
    const message = document.documentElement.lang.startsWith('zh') ? 'Hi Aquamarine, I would like to enquire about this promotion.' : 'Hi Aquamarine, I would like to enquire about this promotion.';
    link.href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    link.target = '_blank'; link.rel = 'noopener noreferrer';
  });

  const artwork = document.querySelector('.promo-artwork');
  const destination = document.querySelector('[data-promotion-direction]');
  if (!artwork || !destination) return;

  let start;
  artwork.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'touch' || !event.isPrimary) {
      start = undefined;
      return;
    }
    start = { x: event.clientX, y: event.clientY, id: event.pointerId };
  });
  artwork.addEventListener('pointercancel', () => { start = undefined; });
  artwork.addEventListener('pointerup', event => {
    if (start?.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    start = undefined;
    if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
    const direction = dx < 0 ? 'next' : 'previous';
    if (destination.dataset.promotionDirection === direction) location.assign(destination.href);
  });
})();
