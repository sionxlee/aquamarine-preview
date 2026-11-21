/* Lightweight promotion configuration. Edit this file to activate, order or replace campaigns. */
window.AquamarinePromotions = {
  popup: { enabled: true, promotionId: 'hair-year-end', sessionKey: 'aquamarine-promotion-popup-v1' },
  promotions: [
    {
      id: 'hair-year-end', active: true, priority: 1,
      href: '/aquamarine-preview/promotions/hair-year-end/', zhHref: '/aquamarine-preview/zh/promotions/hair-year-end/',
      heroDesktop: '/aquamarine-preview/assets/promotions/HeroHairD.webp', heroMobile: '/aquamarine-preview/assets/promotions/HeroHairM.webp',
      popupDesktop: '/aquamarine-preview/assets/promotions/PopupHairD.webp', popupMobile: '/aquamarine-preview/assets/promotions/PopupHairM.webp',
      heroWidth: 1920, heroHeight: 900, popupWidth: 900, popupHeight: 1200,
      heroBackground: '#454940',
      en: { title: 'Year-End Specials — 50% OFF', short: 'Hair year-end specials' },
      zh: { title: '年末美发优惠 — 5 折', short: '年末美发优惠' }
    },
    {
      id: 'facial-first-trial', active: true, priority: 2,
      href: '/aquamarine-preview/promotions/facial-first-trial/', zhHref: '/aquamarine-preview/zh/promotions/facial-first-trial/',
      heroDesktop: '/aquamarine-preview/assets/promotions/HeroFacialD.webp', heroMobile: '/aquamarine-preview/assets/promotions/HeroFacialM.webp',
      popupDesktop: '/aquamarine-preview/assets/promotions/PopupFacialD.webp', popupMobile: '/aquamarine-preview/assets/promotions/PopupFacialM.webp',
      heroWidth: 1920, heroHeight: 900, popupWidth: 900, popupHeight: 1200,
      heroBackground: '#d5adbc',
      en: { title: 'Facial First Trial — S$88', short: 'Facial first trial' },
      zh: { title: '美容护理首次体验 — S$88', short: '美容护理首次体验' }
    }
  ]
};
