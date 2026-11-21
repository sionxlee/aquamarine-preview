// Content is separate from rendering; add locale files and service menus here later.
const servicePageData = {
  label: 'HAIR', title: 'Hair, shaped around you.',
  description: 'From considered cuts and styling to personalised colour, perms and restorative treatments, discover personalised hair services at Aquamarine on East Coast Road, Singapore.',
  image: '/aquamarine-preview/assets/hair.jpg', imageAlt: 'Stylist blow-drying a client’s hair at the salon',
  note: 'Additional charges from $10–$30 apply for extra-long or thick hair.',
  sections: [
    {title:'CUT & STYLING',groups:[
      {title:'Haircut',tiers:['Men','Ladies'],rows:[['Senior Stylist',48,58],['International Stylist',60,70],['Fringe Cut',null,26]]},
      {title:'Wash & Blow-Dry',tiers:['Short','Long'],rows:[['Wash & Blow',35,45],['Styling (UP-Style)',60,80]]}
    ]},
    {title:'COLOUR',groups:[{tiers:['Short','Medium','Long'],rows:[['Single Process',138,168,198],['Ammonia Free',158,188,218],['Bleach',108,138,168],['Coating Colors',118,148,178]]}]},
    {title:'HIGHLIGHTS',groups:[{tiers:['Short','Medium','Long'],rows:[['Creative Highlight',138,178,218],['Blonde Highlight',270,300,330],['Balayage',380,580,780]]}]},
    {title:'PERM',groups:[{tiers:['Short','Medium','Long'],rows:[['Japanese Perm',168,188,208],['Digital Perm (Straight)',null,338,368],['Treatment Infused Repairing Perm',null,358,408]]}]},
    {title:'HAIR TREATMENT',groups:[{tiers:['Short','Long'],rows:[['Salon Program',108,148],['Kerastase Treatment',168,188],['Chronologiste',258,358],['Keratin Treatment',288,328],['Hair Mask',80,80]]}]},
    {title:'SCALP TREATMENT',groups:[{tiers:['Price'],rows:[['Deep Cleaning Scalp',48],['Ultrasonic Scalp',108]]}]}
  ]
};
