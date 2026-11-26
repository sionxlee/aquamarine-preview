(() => {
  if (window.parent === window) return;
  const params = new URLSearchParams(location.search);
  const kind = params.get('kind');
  if (kind !== 'feed' && kind !== 'badge') return;
  document.documentElement.lang = params.get('lang') === 'zh' ? 'zh-SG' : 'en-SG';

  const mount = document.getElementById('revu-embed');
  const fragment = document.importNode(document.getElementById('revu-' + kind).content, true);
  const container = fragment.querySelector('[data-bid]');
  // Preserve the supplied code in the template. REVU's display-only option
  // prevents its Organization/AggregateRating data from being published.
  container.dataset.jsonld = '0';
  fragment.querySelector('.json-ld-content').remove();
  const templateScript = container.querySelector('script');
  const script = document.createElement('script');
  script.src = templateScript.src;
  script.async = true;
  templateScript.remove();

  let lastHeight = 0;
  const notify = (type, height) => window.parent.postMessage({ source: 'aquamarine-revu', type, height }, '*');
  const reportSize = () => {
    const hasContent = [...container.children].some(child => !child.matches('script, style, link') && child.getBoundingClientRect().height > 0);
    if (!hasContent) return;
    const height = Math.ceil(mount.getBoundingClientRect().height);
    if (height > 0 && height !== lastHeight) {
      lastHeight = height;
      notify('size', height);
    }
  };
  const observer = new MutationObserver(() => {
    mount.querySelectorAll('script[type="application/ld+json"]').forEach(node => node.remove());
    reportSize();
  });
  observer.observe(mount, { childList: true, subtree: true });
  new ResizeObserver(reportSize).observe(mount);
  script.addEventListener('error', () => notify('error'), { once: true });
  mount.append(fragment);
  container.append(script);
})();
