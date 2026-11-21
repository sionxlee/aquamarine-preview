// Nested-page footer anchors return to the existing homepage sections.
document.querySelectorAll('.site-footer a[href^="#"]').forEach(link => {
  const anchor = link.getAttribute('href');
  link.setAttribute('href', anchor === '#about' ? '/aquamarine-preview/about/' : `/aquamarine-preview/${anchor}`);
});
