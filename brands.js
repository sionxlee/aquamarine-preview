// Approved brand assets link to available partner information and services.
const signaturePartners = [
  {slug:'dermalogica',name:'DERMALOGICA',category:'SKIN HEALTH',image:'assets/dermalogica.png',width:1024,height:768,alt:'Dermalogica professional skincare products',heading:['Professional skincare,','personalised for you.'],body:'Targeted facial care using professional Dermalogica products, selected around your skin and its changing needs.',cta:'Explore Dermalogica',href:'/aquamarine-preview/about/#partners-title'},
  {slug:'endymed',name:'ENDYMED',category:'ADVANCED TECHNOLOGY',image:'assets/endymed.png',width:700,height:699,alt:'EndyMed aesthetic treatment device',heading:['Technology with','a thoughtful touch.'],body:'Advanced aesthetic technology integrated into personalised facial treatments, with care selected around individual skin goals.',cta:'Discover EndyMed',href:'/aquamarine-preview/about/#partners-title'},
  {slug:'rene-furterer',name:'RENÉ FURTERER',category:'SCALP & HAIR',image:'assets/rene-furterer.png',width:1526,height:1412,alt:'René Furterer ASTERA FRESH products with turquoise water and botanical leaves',heading:['Botanical care,','from scalp to hair.'],body:'René Furterer botanical hair and scalp care complements our Head Spa experience, creating a restorative ritual from root to length.',cta:'Explore Head Spa',href:'/aquamarine-preview/services/head-spa/'},
];
const brandBlocks = document.querySelector('#brand-blocks');
for (const brand of signaturePartners) {
 const article = document.createElement('article');
 article.className = `brand-block brand-${brand.slug}`;
 article.setAttribute('aria-labelledby', `${brand.slug}-title`);
 article.innerHTML = `<figure class="brand-image reveal"><img ${brand.slug === 'endymed' ? 'style="aspect-ratio:1841 / 2560"' : ''} ${aquamarineImageAttributes(brand.image, brand.slug)} alt="${brand.alt}" width="${brand.width}" height="${brand.height}" loading="lazy"></figure><div class="brand-copy"><p class="brand-label reveal">${brand.name}<span>${brand.category}</span></p><h3 id="${brand.slug}-title" class="reveal" style="--delay:100ms">${brand.heading.join('<br>')}</h3><p class="brand-body reveal" style="--delay:200ms">${brand.body}</p><a class="brand-link reveal" style="--delay:300ms" href="${brand.href}">${brand.cta}<span aria-hidden="true">→</span></a></div>`;
 brandBlocks.append(article);
}
