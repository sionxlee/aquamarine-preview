(() => {
  const lang = document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
  const embedUrl = new URL('./embed.html', document.currentScript.src);
  const desktop = window.matchMedia('(min-width: 1024px)');
  const tablet = window.matchMedia('(min-width: 600px)');
  const reviewColumns = () => desktop.matches ? 3 : tablet.matches ? 2 : 1;
  const widgets = [
    {
      kind: 'feed',
      section: document.querySelector('.client-reviews'),
      mount: document.querySelector('[data-revu-review-widget]'),
      title: lang === 'zh' ? 'Aquamarine 顾客评价' : 'Aquamarine client reviews',
    },
    {
      kind: 'badge',
      section: document.querySelector('[data-revu-review-badge]'),
      mount: document.querySelector('[data-revu-review-badge]'),
      title: lang === 'zh' ? 'Aquamarine 评分徽章' : 'Aquamarine review badge',
    },
  ].filter(widget => widget.section && widget.mount);

  function load(widget) {
    const frame = document.createElement('iframe');
    const url = new URL(embedUrl);
    url.searchParams.set('v', '5');
    url.searchParams.set('kind', widget.kind);
    url.searchParams.set('lang', lang);
    frame.title = widget.title;
    frame.setAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox');
    frame.referrerPolicy = 'no-referrer';
    const fallback = widget.section.querySelector('.client-reviews-status');
    const updateColumns = () => frame.contentWindow?.postMessage({ source: 'aquamarine-reviews-home', columns: reviewColumns() }, '*');
    if (widget.kind === 'feed') {
      url.searchParams.set('columns', String(reviewColumns()));
      desktop.addEventListener('change', updateColumns);
      tablet.addEventListener('change', updateColumns);
      frame.addEventListener('load', updateColumns);
    }
    const fail = () => {
      window.clearTimeout(timeout);
      window.removeEventListener('message', receive);
      desktop.removeEventListener('change', updateColumns);
      tablet.removeEventListener('change', updateColumns);
      frame.remove();
      if (fallback) {
        fallback.textContent = lang === 'zh' ? '暂时无法加载顾客评价。' : 'Client reviews are temporarily unavailable.';
        fallback.hidden = false;
        widget.mount.dataset.state = 'failed';
      } else {
        widget.section.hidden = true;
      }
    };
    const receive = event => {
      if (event.source !== frame.contentWindow || event.origin !== 'null' || event.data?.source !== 'aquamarine-revu') return;
      if (widget.kind === 'badge' && event.data.type === 'empty') {
        widget.mount.dataset.state = 'empty';
        fail();
      } else if (event.data.type === 'error') {
        fail();
      } else if (event.data.type === 'size' && Number.isInteger(event.data.height) && event.data.height > 0 && event.data.height <= 30000) {
        window.clearTimeout(timeout);
        // The sandbox reports its own layout. The homepage never reads the frame DOM.
        frame.style.height = event.data.height + 'px';
        widget.mount.dataset.state = 'ready';
        frame.dataset.ready = 'true';
        if (fallback) fallback.hidden = true;
      }
    };
    const timeout = window.setTimeout(fail, 10000);
    window.addEventListener('message', receive);
    frame.src = url.href;
    widget.mount.append(frame);
  }

  const nearViewport = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      nearViewport.unobserve(entry.target);
      load(widgets.find(widget => widget.mount === entry.target));
    }
  }, { rootMargin: '240px 0px' });
  widgets.forEach(widget => {
    widget.section.hidden = false;
    nearViewport.observe(widget.mount);
  });
})();
