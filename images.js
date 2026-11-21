// Shared responsive photographic sources. Originals remain unchanged for social metadata and archival use.
const aquamarineImages = Object.freeze({
  "about-salon.jpg": {
    "width": 1440,
    "height": 2561,
    "src": "/aquamarine-preview/assets/optimized/about-salon-1440.webp",
    "srcset": "/aquamarine-preview/assets/optimized/about-salon-480.webp 480w, /aquamarine-preview/assets/optimized/about-salon-800.webp 800w, /aquamarine-preview/assets/optimized/about-salon-1200.webp 1200w, /aquamarine-preview/assets/optimized/about-salon-1440.webp 1440w"
  },
  "about-spa-room.jpg": {
    "width": 720,
    "height": 960,
    "src": "/aquamarine-preview/assets/optimized/about-spa-room-720.webp",
    "srcset": "/aquamarine-preview/assets/optimized/about-spa-room-480.webp 480w, /aquamarine-preview/assets/optimized/about-spa-room-720.webp 720w"
  },
  "aquamarine-storefront.jpg": {
    "width": 762,
    "height": 1016,
    "src": "/aquamarine-preview/assets/optimized/aquamarine-storefront-762.webp",
    "srcset": "/aquamarine-preview/assets/optimized/aquamarine-storefront-480.webp 480w, /aquamarine-preview/assets/optimized/aquamarine-storefront-762.webp 762w"
  },
  "dermalogica.png": {
    "width": 1024,
    "height": 768,
    "src": "/aquamarine-preview/assets/optimized/dermalogica-1024.webp",
    "srcset": "/aquamarine-preview/assets/optimized/dermalogica-480.webp 480w, /aquamarine-preview/assets/optimized/dermalogica-800.webp 800w, /aquamarine-preview/assets/optimized/dermalogica-1024.webp 1024w"
  },
  "endymed.png": {
    "width": 700,
    "height": 699,
    "src": "/aquamarine-preview/assets/optimized/endymed-pure-700.webp",
    "srcset": "/aquamarine-preview/assets/optimized/endymed-pure-480.webp 480w, /aquamarine-preview/assets/optimized/endymed-pure-700.webp 700w"
  },
  "facial.jpg": {
    "width": 1536,
    "height": 1024,
    "src": "/aquamarine-preview/assets/optimized/facial-1536.webp",
    "srcset": "/aquamarine-preview/assets/optimized/facial-480.webp 480w, /aquamarine-preview/assets/optimized/facial-800.webp 800w, /aquamarine-preview/assets/optimized/facial-1200.webp 1200w, /aquamarine-preview/assets/optimized/facial-1536.webp 1536w"
  },
  "hair.jpg": {
    "width": 1536,
    "height": 1025,
    "src": "/aquamarine-preview/assets/optimized/hair-1536.webp",
    "srcset": "/aquamarine-preview/assets/optimized/hair-480.webp 480w, /aquamarine-preview/assets/optimized/hair-800.webp 800w, /aquamarine-preview/assets/optimized/hair-1200.webp 1200w, /aquamarine-preview/assets/optimized/hair-1536.webp 1536w"
  },
  "head-spa.jpg": {
    "width": 1024,
    "height": 1536,
    "src": "/aquamarine-preview/assets/optimized/head-spa-1024.webp",
    "srcset": "/aquamarine-preview/assets/optimized/head-spa-480.webp 480w, /aquamarine-preview/assets/optimized/head-spa-800.webp 800w, /aquamarine-preview/assets/optimized/head-spa-1024.webp 1024w"
  },
  "hero.png": {
    "width": 1672,
    "height": 941,
    "src": "/aquamarine-preview/assets/optimized/hero-1672.webp",
    "srcset": "/aquamarine-preview/assets/optimized/hero-480.webp 480w, /aquamarine-preview/assets/optimized/hero-800.webp 800w, /aquamarine-preview/assets/optimized/hero-1200.webp 1200w, /aquamarine-preview/assets/optimized/hero-1672.webp 1672w"
  },
  "rene-furterer.png": {
    "width": 1526,
    "height": 1412,
    "src": "/aquamarine-preview/assets/optimized/rene-furterer-1526.webp",
    "srcset": "/aquamarine-preview/assets/optimized/rene-furterer-480.webp 480w, /aquamarine-preview/assets/optimized/rene-furterer-800.webp 800w, /aquamarine-preview/assets/optimized/rene-furterer-1200.webp 1200w, /aquamarine-preview/assets/optimized/rene-furterer-1526.webp 1526w"
  }
});
const aquamarineImageSizes = Object.freeze({
  "hero": "(max-width: 760px) max(100vw, min(1600px, max(1155px, 177.68svh))), max(100vw, min(1955px, max(1208px, 177.68svh)))",
  "panel": "(max-width: 760px) max(100vw, 840px), max(56vw, 1230px)",
  "panelPortrait": "(max-width: 760px) max(100vw, 374px), max(56vw, 547px)",
  "service": "(max-width: 600px) calc(100vw - 40px), (max-width: 760px) calc(100vw - 56px), 35vw",
  "servicePortrait": "(max-width: 600px) calc(82vw - 32.8px), (max-width: 760px) calc(82vw - 45.92px), 28vw",
  "aboutHero": "(max-width: 600px) calc(88vw - 35.2px), (max-width: 760px) calc(88vw - 49.28px), 31vw",
  "aboutClosing": "(max-width: 600px) calc(84vw - 33.6px), (max-width: 760px) calc(84vw - 47.04px), 30vw",
  "editorial": "(max-width: 600px) calc(100vw - 40px), (max-width: 760px) calc(100vw - 56px), 36vw",
  "dermalogica": "(max-width: 760px) calc(100vw - 56px), 60vw",
  "endymed": "(max-width: 760px) min(calc(100vw - 112px), 274px), min(38vw, 382px)",
  "rene-furterer": "(max-width: 760px) calc(100vw - 40px), 65vw"
});
function aquamarineImageAttributes(source, context) {
  const image = aquamarineImages[source.split("/").pop()];
  return `src="${image.src}" srcset="${image.srcset}" sizes="${aquamarineImageSizes[context]}"`;
}
