(() => {
  document.querySelectorAll('[data-whatsapp]').forEach(link => {
    const number = link.dataset.whatsapp;
    const message = document.documentElement.lang.startsWith('zh') ? 'Hi Aquamarine, I would like to enquire about this promotion.' : 'Hi Aquamarine, I would like to enquire about this promotion.';
    link.href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    link.target = '_blank'; link.rel = 'noopener noreferrer';
  });
})();
