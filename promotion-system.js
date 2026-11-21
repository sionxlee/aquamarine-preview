(() => {
  const config = window.AquamarinePromotions;
  const target = document.querySelector('.hero-promotion-slideshow');
  if (!config || !target) return;

  const lang = document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
  const active = config.promotions.filter(item => item.active).sort((a, b) => a.priority - b.priority);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const slides = active;

  const picture = (slide, index, placement = 'hero') => {
    const desktop = placement === 'popup' ? slide.popupDesktop : slide.heroDesktop;
    const mobile = placement === 'popup' ? slide.popupMobile : slide.heroMobile;
    const width = placement === 'popup' ? slide.popupWidth : slide.heroWidth;
    const height = placement === 'popup' ? slide.popupHeight : slide.heroHeight;
    const alt = slide[lang].title;
    return `<picture><source media="(max-width: 760px)" srcset="${mobile}"><img src="${desktop}" width="${width}" height="${height}" alt="${alt}" ${index === 0 ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'}></picture>`;
  };

  const slideMarkup = (slide, index, clone = false) => {
    const href = lang === 'zh' ? slide.zhHref : slide.href;
    return `<a class="promo-hero-slide promo-hero-campaign" style="--promo-hero-background:${slide.heroBackground}" href="${href}" aria-label="${slide[lang].title}" ${clone ? 'aria-hidden="true" tabindex="-1"' : ''}>${picture(slide, clone ? -1 : index)}</a>`;
  };

  const originals = slides.map((slide, index) => slideMarkup(slide, index)).join('');
  const clonedLast = slides.length > 1 ? slideMarkup(slides.at(-1), slides.length - 1, true) : '';
  const clonedFirst = slides.length > 1 ? slideMarkup(slides[0], 0, true) : '';
  target.innerHTML = `<div class="promo-carousel-viewport"><div class="promo-slides" style="transform:translate3d(-100%,0,0)">${clonedLast}${originals}${clonedFirst}</div></div><div class="promo-slider-controls" aria-label="${lang === 'zh' ? '首页轮播图控制' : 'Homepage slideshow controls'}"><button type="button" class="promo-slider-button" data-promo-prev aria-label="${lang === 'zh' ? '上一张' : 'Previous slide'}">←</button><div class="promo-slider-dots" role="tablist">${slides.map((slide, index) => `<button type="button" role="tab" aria-selected="${index === 0}" aria-label="${lang === 'zh' ? '前往第' : 'Go to slide '}${index + 1}" data-promo-dot="${index}"></button>`).join('')}</div><button type="button" class="promo-slider-button" data-promo-next aria-label="${lang === 'zh' ? '下一张' : 'Next slide'}">→</button></div>`;

  const viewport = target.querySelector('.promo-carousel-viewport');
  const track = viewport.querySelector('.promo-slides');
  const rendered = [...track.querySelectorAll('.promo-hero-slide')];
  const dots = [...target.querySelectorAll('[data-promo-dot]')];
  let current = 0;
  let physical = 1;
  let timer = null;
  let isTransitioning = false;
  let carouselVisible = true;
  let hovering = false;
  let interacting = false;
  let resumeAfterTransition = false;
  let gesture;
  let suppressClickUntil = 0;

  function setTrack(animated) {
    track.classList.toggle('is-animating', animated && !reduced.matches);
    track.style.transform = `translate3d(-${physical * 100}%,0,0)`;
  }

  function updateState() {
    dots.forEach((dot, index) => dot.setAttribute('aria-selected', String(index === current)));
    rendered.forEach((slide, index) => {
      const isClone = index === 0 || index === rendered.length - 1;
      const selected = index === physical && !isClone;
      slide.setAttribute('aria-hidden', String(isClone || !selected));
      slide.tabIndex = selected ? 0 : -1;
    });
  }

  function stopTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function startTimer() {
    stopTimer();
    if (!reduced.matches && slides.length > 1 && carouselVisible && !hovering && !interacting && !isTransitioning) {
      timer = setTimeout(() => requestSlide(current + 1, 1), 5000);
    }
  }

  function finishTransition(force = false) {
    if (!isTransitioning && !force) return;
    if (physical === 0 || physical === slides.length + 1) {
      physical = current + 1;
      track.classList.remove('is-animating');
      setTrack(false);
      void track.offsetWidth;
    }
    isTransitioning = false;
    updateState();
    if (resumeAfterTransition) {
      resumeAfterTransition = false;
      startTimer();
    }
  }

  function requestSlide(next, direction = 0) {
    if (slides.length < 2 || isTransitioning) return;
    stopTimer();
    const normalized = (next + slides.length) % slides.length;
    let destination = normalized + 1;
    if (direction > 0 && current === slides.length - 1 && normalized === 0) destination = slides.length + 1;
    if (direction < 0 && current === 0 && normalized === slides.length - 1) destination = 0;
    current = normalized;
    physical = destination;
    resumeAfterTransition = true;
    isTransitioning = !reduced.matches;
    updateState();
    setTrack(isTransitioning);
    if (isTransitioning) window.setTimeout(finishTransition, 700);
    else finishTransition(true);
  }

  track.addEventListener('transitionend', event => {
    if (event.target === track && event.propertyName === 'transform') finishTransition();
  });
  target.querySelector('[data-promo-prev]').addEventListener('click', () => requestSlide(current - 1, -1));
  target.querySelector('[data-promo-next]').addEventListener('click', () => requestSlide(current + 1, 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => requestSlide(index)));

  target.addEventListener('mouseenter', () => { hovering = true; stopTimer(); });
  target.addEventListener('mouseleave', () => { hovering = false; startTimer(); });
  viewport.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.pointerType === 'mouse' || isTransitioning || slides.length < 2) return;
    suppressClickUntil = 0;
    interacting = true;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, dragging: false };
    stopTimer();
  }, { passive: true });
  viewport.addEventListener('pointermove', event => {
    if (gesture?.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.dragging) {
      if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
      gesture.dragging = true;
    }
    if (!reduced.matches) {
      const width = viewport.clientWidth;
      const offset = Math.max(-width, Math.min(width, dx));
      track.classList.remove('is-animating');
      track.style.transform = `translate3d(calc(-${physical * 100}% + ${offset}px),0,0)`;
    }
  }, { passive: true });
  function endGesture(event) {
    if (gesture?.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    const dragged = gesture.dragging;
    gesture = undefined;
    interacting = false;
    const swiped = event.type === 'pointerup' && Math.abs(dx) >= 42 && Math.abs(dx) > Math.abs(dy) * 1.25;
    if (dragged || swiped) suppressClickUntil = performance.now() + 450;
    if (swiped) {
      const direction = dx < 0 ? 1 : -1;
      requestSlide(current + direction, direction);
    } else {
      if (dragged) setTrack(true);
      startTimer();
    }
  }
  viewport.addEventListener('pointerup', endGesture, { passive: true });
  viewport.addEventListener('pointercancel', endGesture, { passive: true });
  viewport.addEventListener('click', event => {
    if (event.detail && performance.now() < suppressClickUntil && event.target.closest('.promo-hero-slide')) {
      event.preventDefault();
    }
  });
  target.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); requestSlide(current - 1, -1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); requestSlide(current + 1, 1); }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopTimer(); else startTimer();
  });
  new IntersectionObserver(entries => {
    carouselVisible = entries[0].isIntersecting;
    if (carouselVisible) startTimer(); else stopTimer();
  }, { threshold: 0.2 }).observe(target);
  reduced.addEventListener?.('change', () => {
    if (reduced.matches) { stopTimer(); track.classList.remove('is-animating'); }
    else startTimer();
  });

  updateState();
  startTimer();

  function popup() {
    const campaign = active.find(item => item.id === config.popup.promotionId);
    if (!config.popup.enabled || !campaign) return;
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation?.type === 'back_forward') return;
    if (navigation?.type !== 'reload') {
      if (document.referrer && new URL(document.referrer).origin === window.location.origin) return;
      try { if (sessionStorage.getItem(config.popup.sessionKey)) return; } catch (_) {}
    }
    const root = document.createElement('div');
    root.className = 'promotion-popup'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', campaign[lang].title);
    root.innerHTML = `<div class="promotion-popup-backdrop" data-promo-close></div><div class="promotion-popup-panel"><button class="promotion-popup-close" type="button" data-promo-close aria-label="${lang === 'zh' ? '关闭推广信息' : 'Close promotion'}">×</button><a href="${lang === 'zh' ? campaign.zhHref : campaign.href}" aria-label="${campaign[lang].title}">${picture(campaign, 0, 'popup')}</a></div>`;
    const previousFocus = document.activeElement;
    let closeTimer;
    const removePopup = () => {
      window.clearTimeout(closeTimer);
      root.remove();
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('pagehide', removePopup);
    };
    const finishClose = () => {
      removePopup();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
    const close = () => {
      if (root.classList.contains('is-closing')) return;
      if (reduced.matches) {
        finishClose();
        return;
      }
      root.classList.add('is-closing');
      // Fallback for browsers that skip animationend when a tab is hidden.
      closeTimer = window.setTimeout(finishClose, 350);
    };
    root.addEventListener('animationend', event => {
      if (event.target === root && event.animationName === 'promotion-popup-fade-out') finishClose();
    });
    const onKey = event => { if (event.key === 'Escape') close(); };
    root.querySelectorAll('[data-promo-close]').forEach(item => item.addEventListener('click', close));
    document.addEventListener('keydown', onKey);
    // A restored history entry can reuse the existing DOM without running this script again.
    window.addEventListener('pagehide', removePopup);
    document.body.append(root);
    try { sessionStorage.setItem(config.popup.sessionKey, '1'); } catch (_) {}
    root.querySelector('.promotion-popup-close').focus();
  }
  popup();
})();
