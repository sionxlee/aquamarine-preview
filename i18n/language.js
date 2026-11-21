// Same-page language switching. Root-relative paths work on local and private hosting.
(() => {
 const zh = document.documentElement.lang === 'zh-SG';
 const routes = ['/', '/about/', '/contact/', '/services/hair/', '/services/head-spa/', '/services/facial/'];
 let path = location.pathname.slice(19).replace(/^\/zh(?=\/)/, '') || '/';
 if (!path.endsWith('/')) path += '/';
 if (!routes.includes(path)) return;
 const selector = document.querySelector('.language');
 if (selector) {
  const control = document.createElement('div'); control.className = 'language';
  control.setAttribute('aria-label', zh ? '选择语言' : 'Choose language');
  const en = document.createElement(zh ? 'a' : 'span'); en.textContent='EN'; en.lang='en-SG';
  const cn = document.createElement(zh ? 'span' : 'a'); cn.textContent='中文'; cn.lang='zh-SG';
  if (zh) { en.href='/aquamarine-preview'+path+location.hash; cn.setAttribute('aria-current','true'); }
  else { cn.href='/aquamarine-preview/zh'+path+location.hash; en.setAttribute('aria-current','true'); }
  const slash=document.createElement('span');slash.textContent='/';slash.setAttribute('aria-hidden','true');
  control.append(en,slash,cn);selector.replaceWith(control);
  window.addEventListener('hashchange',()=>{ const a=control.querySelector('a');a.href='/aquamarine-preview'+(zh?path:'/zh'+path)+location.hash; });
 }
 document.querySelectorAll('.wordmark,.footer-brand>a').forEach(a=>a.setAttribute('href',zh?'/aquamarine-preview/zh/':'/aquamarine-preview/'));
})();
