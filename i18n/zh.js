// Chinese presentation layer: leaves the shared English renderers and numeric data untouched.
(() => {
 const put=(selector,html)=>document.querySelectorAll(selector).forEach(el=>el.innerHTML=html);
 const plain=(selector,text)=>document.querySelectorAll(selector).forEach(el=>el.textContent=text);
 const bilingual=(el,zh,en)=>{if(!el)return;el.textContent=zh||en;if(zh){const small=document.createElement('span');small.className='treatment-english';small.lang='en';small.textContent=en;el.append(small);}};
 const page=location.pathname.slice(19).replace(/^\/zh/,'')||'/';
 const textMap={
 'Home':'首页','About':'关于我们','Contact':'联系我们','Hair':'美发','Head Spa':'Head Spa 头皮护理','Facial':'美容护理','Facial & Beauty':'美容护理',
 'Hair · Beauty · Wellness':'美发 · 美容 · 身心护理','HAIR · HEAD SPA · FACIAL':'美发 · 头皮护理 · 美容护理',
 'OPENING HOURS':'营业时间','PHONE':'电话','CALL':'电话','Visit':'到访','VISIT':'到访','CONTACT':'联系','Explore':'探索',
 'Daily · 10:30 AM — 8:30 PM':'每日 · 上午 10:30 – 晚上 8:30','Daily':'每日','10:30 AM – 8:30 PM':'上午 10:30 – 晚上 8:30',
 'Duration':'时长','Price':'价格',' min':'分钟','Service':'项目','Men':'男士','Ladies':'女士','Short':'短发','Medium':'中长发','Long':'长发',
 'CUT & STYLING':'剪发与造型','COLOUR':'染发','HIGHLIGHTS':'挑染','PERM':'烫发','HAIR TREATMENT':'秀发护理','SCALP TREATMENT':'头皮护理','Haircut':'剪发','Wash & Blow-Dry':'洗吹与造型',
 'Facial Treatments':'面部护理','Specialised Treatment':'专项护理','Specialised':'专项护理','Add-ons':'附加护理','Teenage Facial':'青少年面部护理','Sharplight':'Sharplight','Body':'身体护理','Body Contouring':'身体塑形',
 'Eye Treatment':'眼部护理','Neck Treatment':'颈部护理','Special Modality Add-on':'专项附加护理','EndyMed Add-on':'EndyMed 附加护理','Hair Removal':'脱毛','Skin Treatment':'肌肤护理',
 'Face & Eye':'面部与眼部','Face & Eye & Neck':'面部、眼部与颈部','Face & Neck':'面部与颈部','Face':'面部','Neck':'颈部',
 'Chat with us':'联系我们','Skip to content':'跳至内容','Skip to services':'跳至服务项目',
 'Additional charges from $10–$30 apply for extra-long or thick hair.':'超长或浓密发质需加收 $10–$30。'
 };
 // Names use scoped catalogue keys, because some add-ons share English names.
 if(typeof servicePageData!=='undefined'){
  const data=servicePageData;
  if(data.sections) document.querySelectorAll('.service-menu tbody th').forEach(el=>{const en=el.textContent;bilingual(el,aquamarineZhMenu.hair[en],en);});
  if(data.treatments) document.querySelectorAll('.treatment-row h2').forEach((el,i)=>{const en=data.treatments[i].name;bilingual(el,aquamarineZhMenu.headSpa[en],en);});
  if(data.categories) data.categories.forEach(c=>{document.querySelectorAll('#'+c.id+' .facial-group').forEach((group,gi)=>{group.querySelectorAll('.facial-treatment').forEach((el,ti)=>{const en=c.groups[gi].treatments[ti].name;const key=c.id+'|'+(c.groups[gi].title||'')+'|'+en;bilingual(el.querySelector('h3,h4'),aquamarineZhMenu.facial[key],en);});});});
 }
 // Translate only UI text nodes, preserving links, reveal wrappers and layout markup.
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 nodes.forEach(n=>{if(n.parentElement.closest('script,style,.treatment-english'))return;const t=n.textContent.trim();if(textMap[t])n.textContent=n.textContent.replace(t,textMap[t]);else if(/^\d+ min$/.test(t))n.textContent=t.replace(' min','分钟');});
 document.querySelectorAll('.services-toggle').forEach(b=>{b.firstChild.textContent='服务项目 ';});
 document.querySelectorAll('.booking').forEach(el=>el.remove());
 const serviceInfo=[['美发','HAIR','专业剪发、染发、烫发与护理，<br>根据你的发质与风格提供细致服务。','探索美发服务'],['Head Spa 头皮护理','HEAD SPA','从头皮到发丝的专业护理，<br>在舒缓放松中重拾健康与活力。','探索头皮护理'],['美容护理','FACIAL & BEAUTY','结合专业护肤、先进美容科技与个性化护理，<br>为不同肌肤需求提供细致呵护。','探索美容护理']];
 document.querySelectorAll('.service').forEach((el,i)=>{const [name,label,copy,cta]=serviceInfo[i];el.querySelector('h2').textContent=name;el.querySelector('.service-number').textContent=`0${i+1} / ${label}`;el.querySelector('p').innerHTML=copy;el.querySelector('.service-explore').innerHTML=cta+' <span aria-hidden="true">⟶</span>';el.setAttribute('aria-label',cta);});
 put('.tagline','悉心呵护美丽，<br>从容享受片刻宁静。');put('.hero-cta','探索服务 <span aria-hidden="true">⟶</span>');plain('.hero-foot>a','向下探索 ↓');
 put('.brands-intro .brand-label','精选专业品牌');put('#brands-title','专业之选，<br>源于对品质的坚持。');plain('.brands-summary','我们甄选值得信赖的专业护肤品牌、头皮护理品牌与先进美容科技，为每一次护理提供更专业、更有针对性的支持。');
 const brands=[['Dermalogica','专业肌肤护理','以专业肌肤健康理念，为不同肤质与需求提供个性化护理。','了解 Dermalogica'],['EndyMed','先进美容科技','将先进美容科技融入专业护理，让科技与细致服务相辅相成。','了解 EndyMed'],['René Furterer Paris','头皮与秀发护理','源自植物护理理念，从头皮到发丝提供专业而舒适的养护体验。','探索头皮护理']];
 document.querySelectorAll('.brand-block').forEach((el,i)=>{const [name,cat,body,cta]=brands[i];el.querySelector('.brand-label').innerHTML=name+'<span>'+cat+'</span>';el.querySelector('h3').textContent=cat;el.querySelector('.brand-body').textContent=body;el.querySelector('.brand-link').innerHTML=cta+' <span aria-hidden="true">→</span>';if(i===2)el.querySelector('.brand-link').href='/services/head-spa/';else el.querySelector('.brand-link').href='/about/#partners-title';});
 plain('.about-label','关于 AQUAMARINE');put('#about-title','从秀发到肌肤，<br>用心照顾每一处美丽。');plain('.about-body','从细致的美发服务，到舒缓的 Head Spa 头皮护理与个性化美容护理，Aquamarine 将美丽与身心放松融入同一个温馨舒适的空间。');put('.about-cta','了解 Aquamarine <span aria-hidden="true">→</span>');
 plain('.visit-label','到访 AQUAMARINE');put('#visit-title','留一点时间，<br>好好照顾自己。');put('.visit-hours p','每日<br>上午 10:30 – 晚上 8:30');
 document.querySelectorAll('.visit-actions a').forEach((a,i)=>a.innerHTML=(i?'WhatsApp 联系我们':'查看路线')+' <span aria-hidden="true">→</span>');
 if(page==='/about/'){
 plain('.brand-about-hero .brand-about-label','关于 AQUAMARINE');put('#about-page-title','让美丽与身心护理，<br>自然相遇。');
 put('#choices-title','好的护理，<br>始于用心的选择。');const choices=['我们相信，更好的美容体验始于为每位顾客选择合适的产品、技术与护理方式。','Aquamarine 不追求千篇一律的护理方案，而是结合专业经验、细致手法与值得信赖的专业品牌，让每一次护理更贴合个人需求，同时兼顾效果、舒适与体验。'];document.querySelectorAll('.brand-about-choices p').forEach((el,i)=>el.textContent=choices[i]);
 plain('.brand-about-partners .brand-about-label','我们的专业合作品牌');put('#partners-title','每一个选择，<br>都有它的理由。');plain('.brand-about-partners header p:last-child','我们对专业品牌与技术的选择，也体现了 Aquamarine 对美容与护理的理念。');
 const partnerCopy=[['专业肌肤护理','Dermalogica 为我们的专业肌肤护理与个性化面部护理提供支持，让护理能够更贴合不同肌肤状态与需求。'],['先进美容科技','EndyMed 将先进美容科技带入特定护理项目，让科技与专业手法相互配合，为不同肌肤需求提供更多护理选择。'],['植物头皮与秀发护理','René Furterer Paris 将植物护理理念融入头皮与秀发护理，为 Aquamarine 的 Head Spa 体验带来从发根到发丝的专业养护。']];document.querySelectorAll('.brand-about-partner-list>div').forEach((el,i)=>{el.querySelector('dt span').textContent=partnerCopy[i][0];el.querySelector('dd').textContent=partnerCopy[i][1];});
 plain('.brand-about-conclusion','它们各自拥有不同的专业方向，却在 Aquamarine 承担着同一个使命——帮助我们为每一位顾客提供更细致、更专业、更贴合个人需求的优质护理。');put('#closing-title','留一点时间，<br>好好照顾自己。');const closing=['无论是一次剪发、染发，一场舒缓的 Head Spa，还是针对个人肌肤需求的美容护理，我们都希望从踏进 Aquamarine 的那一刻开始，每一个细节都让你感受到被认真对待。','我们的目标很简单：让专业护理、值得信赖的产品与贴心服务自然结合，让你在离开时感到焕然一新、放松自在，也更加自信。'];document.querySelectorAll('.brand-about-closing p').forEach((el,i)=>el.textContent=closing[i]);
 }
 const heroes={
 '/services/hair/':['美发','为你，<br>打造恰到好处的发型。','从剪发与造型，到染发、烫发、秀发护理与头皮护理，我们根据不同发质、需求与个人风格提供细致专业的美发服务。'],
 '/services/head-spa/':['HEAD SPA 头皮护理','从头皮到发丝，<br>开启一场舒缓修护之旅。','结合专业头皮与秀发护理，以及 René Furterer Paris 的植物护理理念，让每一次 Head Spa 都成为兼顾养护与放松的舒适体验。'],
 '/services/facial/':['美容护理','为肌肤，<br>找到适合它的护理方式。','从专业面部护理到先进美容科技，我们根据不同肌肤状态与个人需求，提供更有针对性、更细致的美容护理体验。']};
 if(heroes[page]){plain('.service-page-label',heroes[page][0]);put('#service-page-title',heroes[page][1]);plain('.service-page-intro',heroes[page][2]);}
 if(page==='/contact/'){
 plain('.contact-hero .contact-label','联系我们');plain('#contact-title','期待与你见面。');plain('.contact-hero>p:last-child','无论你正在计划到店，还是想进一步了解某项护理服务，都欢迎随时联系我们。');plain('.contact-visit .contact-label','到访 AQUAMARINE');plain('#contact-visit-title','欢迎来到 East Coast Road 找我们。');
 plain('.contact-before .contact-label','到店之前');plain('#before-title','还不确定哪项护理更适合你？');plain('.contact-before div p','欢迎通过 WhatsApp 告诉我们你的需求。到店之前，我们很乐意协助你了解不同服务，并找到更适合你的护理选择。');
 put('.contact-actions [data-contact-maps]','查看路线 <span aria-hidden="true">→</span>');put('.contact-actions [data-contact-whatsapp]','WhatsApp 联系我们 <span aria-hidden="true">→</span>');put('.contact-before [data-contact-whatsapp]','通过 WHATSAPP 联系我们 <span aria-hidden="true">→</span>');plain('#location-title','在 East Coast Road 找到我们。');put('.contact-location a','在 GOOGLE MAPS 中查看 <span aria-hidden="true">→</span>');
 }
 // Footer destinations intentionally stay in the selected language.
 put('.footer-explore','<h2>探索</h2><a href="/">首页</a><a href="/about/">关于我们</a><a href="/services/hair/">美发</a><a href="/services/head-spa/">Head Spa 头皮护理</a><a href="/services/facial/">美容护理</a><a href="/contact/">联系我们</a>');
 plain('.footer-details>h2','到访');plain('.footer-contact h2','联系');put('.footer-details>p','每日<br>上午 10:30 – 晚上 8:30');plain('.footer-bottom small','© 2026 Aquamarine Hair & Beauty');
 document.querySelectorAll('a[href]').forEach(a=>{const raw=a.getAttribute('href');const href=raw.startsWith('/aquamarine-preview/')?raw.slice(19):raw;if(href.startsWith('#')){a.setAttribute('href',location.pathname+href);return;}if(href.startsWith('/')&&!href.startsWith('//'))a.setAttribute('href','/aquamarine-preview'+(href.startsWith('/zh/')?href:'/zh'+href));});
 document.querySelectorAll('.footer-explore a[href="/aquamarine-preview/zh/#about"]').forEach(a=>a.href='/aquamarine-preview/zh/about/');
 document.querySelector('.services')?.setAttribute('aria-label','我们的服务');
 const labels={'Aquamarine home':'Aquamarine 首页','Main navigation':'主导航','Footer navigation':'页脚导航','Open menu':'打开菜单','Close menu':'关闭菜单','Treatment categories':'护理分类','Head Spa treatments':'头皮护理项目','Chat with Aquamarine on WhatsApp':'通过 WhatsApp 联系 Aquamarine','Close dialog':'关闭对话框','Scroll to services':'向下探索服务','Our services':'我们的服务','Aquamarine footer':'Aquamarine 页脚'};
 document.querySelectorAll('[aria-label]').forEach(el=>{const value=el.getAttribute('aria-label');if(labels[value])el.setAttribute('aria-label',labels[value]);});

 const imageDescriptions={
 'hero.png':'温暖阳光下的植物、毛巾与蜡烛',
 'hair.jpg':'发型师细致地为顾客吹整秀发',
 'head-spa.jpg':'在洗发盆边进行舒缓头皮按摩与冲洗',
 'facial.jpg':'使用专业美容仪器进行面部护理',
 'about-spa-room.jpg':'Aquamarine 护理室内的象牙白帘幕、护理床与洗发盆',
 'aquamarine-storefront.jpg':'Aquamarine 位于 East Coast Road 的店面，入口旁可见 166 门牌',
 'about-salon.jpg':'Aquamarine 沙龙镜中的座椅、小狗与专业产品陈列架',
 'dermalogica.png':'Dermalogica 专业护肤产品',
 'endymed.png':'EndyMed 美容护理设备',
 'rene-furterer.png':'碧蓝水面与植物环绕的 René Furterer ASTERA FRESH 产品'
 };
 document.querySelectorAll('img').forEach(img=>{const name=img.getAttribute('src').split('/').pop();const originalName=Object.keys(imageDescriptions).find(key=>key.replace(/\.[^.]+$/, '')===name.replace(/-\d+\.webp$/, ''))||name;if(imageDescriptions[originalName])img.alt=imageDescriptions[originalName];});
 document.querySelectorAll('caption').forEach(el=>{el.textContent=el.textContent.replace(/ prices$/, '价格');Object.entries(textMap).forEach(([en,cn])=>{if(el.textContent.startsWith(en))el.textContent=cn+el.textContent.slice(en.length);});});

 // Keep dynamically toggled mobile labels localized without changing shared interactions.
 const toggle=document.querySelector('.menu-toggle');if(toggle)new MutationObserver(()=>{const value=toggle.getAttribute('aria-label');if(labels[value])toggle.setAttribute('aria-label',labels[value]);}).observe(toggle,{attributes:true,attributeFilter:['aria-label']});
})();
