// Enhance REVU's rendered layout in this frame. Review content and pagination stay with REVU.
function initReviewCarousel(container, initialColumns) {
  const widget = container.querySelector('.js-widget-container[data-widget-layout="full"]');
  const track = widget?.querySelector('.js-review-container');
  if (!track?.querySelector('.revwid-review') || track.classList.contains('aquamarine-review-track')) return;

  const zh = document.documentElement.lang.startsWith('zh');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const controls = document.createElement('div');
  controls.className = 'aquamarine-review-controls';
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', zh ? '评价轮播控制' : 'Review carousel controls');
  const dots = document.createElement('div');
  dots.className = 'aquamarine-review-dots';
  const button = (label, text = '') => {
    const element = document.createElement('button');
    element.type = 'button';
    element.setAttribute('aria-label', label);
    element.textContent = text;
    return element;
  };
  const previous = button(zh ? '上一组评价' : 'Previous reviews', '←');
  const next = button(zh ? '下一组评价' : 'Next reviews', '→');
  controls.append(previous, dots, next);
  track.before(controls);
  track.tabIndex = 0;
  track.setAttribute('role', 'region');
  track.setAttribute('aria-label', zh ? '顾客评价轮播' : 'Client reviews carousel');
  track.classList.add('aquamarine-review-track');
  widget.classList.add('aquamarine-review-carousel');

  let columns = [1, 2, 3].includes(initialColumns) ? initialColumns : 1;
  let stops = [0];
  let active = 0;
  let animation = 0;
  let pointer;
  let suppressClickUntil = 0;
  widget.dataset.columns = columns;

  function syncControls() {
    active = stops.reduce((closest, stop, index) =>
      Math.abs(track.scrollLeft - stop) < Math.abs(track.scrollLeft - stops[closest]) ? index : closest, 0);
    previous.setAttribute('aria-disabled', String(active === 0));
    next.setAttribute('aria-disabled', String(active === stops.length - 1));
    [...dots.children].forEach((dot, index) => {
      if (index === active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }

  function stopSliding() {
    cancelAnimationFrame(animation);
    animation = 0;
    track.classList.remove('is-sliding');
  }

  function goTo(index) {
    if (index < 0 || index >= stops.length) return;
    stopSliding();
    const from = track.scrollLeft;
    const to = stops[index];
    if (motion.matches || Math.abs(to - from) <= 1) {
      track.scrollLeft = to;
      syncControls();
      return;
    }
    track.classList.add('is-sliding');
    const started = performance.now();
    const step = now => {
      const progress = Math.min(1, (now - started) / 550);
      const eased = progress * progress * (3 - 2 * progress);
      track.scrollLeft = from + (to - from) * eased;
      if (progress < 1) animation = requestAnimationFrame(step);
      else {
        stopSliding();
        syncControls();
      }
    };
    animation = requestAnimationFrame(step);
  }

  function measure(reset = false) {
    stopSliding();
    const cards = [...track.children].filter(card => card.matches('.revwid-review'));
    const end = Math.max(0, track.scrollWidth - track.clientWidth);
    stops = [0];
    if (cards.length > columns && end > 1) {
      const firstLeft = cards[0].offsetLeft;
      for (let i = columns; i < cards.length; i += columns) {
        const stop = Math.min(end, cards[i].offsetLeft - firstLeft);
        if (stop - stops.at(-1) > 1) stops.push(stop);
      }
    }
    if (reset) track.scrollLeft = 0;
    const count = stops.length;
    if (dots.children.length !== count) {
      dots.replaceChildren(...stops.map((_, index) => {
        const dot = button(zh ? `第 ${index + 1} 组评价` : `Reviews group ${index + 1} of ${count}`);
        dot.addEventListener('click', () => goTo(index));
        return dot;
      }));
    }
    controls.hidden = count <= 1;
    syncControls();
  }

  previous.addEventListener('click', () => goTo(active - 1));
  next.addEventListener('click', () => goTo(active + 1));
  track.addEventListener('scroll', syncControls, { passive: true });
  track.addEventListener('wheel', stopSliding, { passive: true });
  track.addEventListener('keydown', event => {
    if (event.target !== track) return;
    const destination = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: stops.length - 1 }[event.key];
    if (destination === undefined) return;
    event.preventDefault();
    goTo(destination);
  });

  track.addEventListener('pointerdown', event => {
    stopSliding();
    if (!event.isPrimary) return;
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
    suppressClickUntil = 0;
  }, { passive: true });
  function finishPointer(event) {
    if (pointer?.id !== event.pointerId) return;
    const dx = Math.abs(event.clientX - pointer.x);
    const dy = Math.abs(event.clientY - pointer.y);
    if (event.type === 'pointercancel' || (dx > 12 && dx > dy)) suppressClickUntil = performance.now() + 350;
    pointer = undefined;
  }
  track.addEventListener('pointerup', finishPointer, { passive: true });
  track.addEventListener('pointercancel', finishPointer, { passive: true });
  track.addEventListener('click', event => {
    if (event.detail && performance.now() < suppressClickUntil) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);

  window.addEventListener('message', event => {
    if (event.source !== window.parent || event.data?.source !== 'aquamarine-reviews-home') return;
    const number = event.data.columns;
    if (![1, 2, 3].includes(number) || number === columns) return;
    columns = number;
    widget.dataset.columns = columns;
    measure(true);
  });
  let lastWidth = track.clientWidth;
  new ResizeObserver(() => {
    if (track.clientWidth === lastWidth) return;
    lastWidth = track.clientWidth;
    measure(true);
  }).observe(track);
  new MutationObserver(() => measure(true)).observe(track, { childList: true });
  measure();
}
