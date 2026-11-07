(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))t(c);new MutationObserver(c=>{for(const d of c)if(d.type==="childList")for(const r of d.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function n(c){const d={};return c.integrity&&(d.integrity=c.integrity),c.referrerPolicy&&(d.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?d.credentials="include":c.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function t(c){if(c.ep)return;c.ep=!0;const d=n(c);fetch(c.href,d)}})();const C={tshirt:{name:"T-shirt",base:60,zones:{chest:{label:"Poitrine (centre)",x:130,y:120,w:140,h:140},left:{label:"Cœur (gauche)",x:215,y:120,w:70,h:70},back:{label:"Dos",x:110,y:110,w:180,h:200}},path:"M120 40 L160 25 Q200 55 240 25 L280 40 L360 95 L325 155 L290 135 L290 430 L110 430 L110 135 L75 155 L40 95 Z"},hoodie:{name:"Hoodie",base:160,zones:{chest:{label:"Poitrine (centre)",x:135,y:140,w:130,h:110},left:{label:"Cœur (gauche)",x:215,y:135,w:65,h:65},back:{label:"Dos",x:105,y:110,w:190,h:210}},path:"M125 45 Q200 -5 275 45 L365 110 L330 230 L295 210 L295 435 L105 435 L105 210 L70 230 L35 110 Z"},cap:{name:"Casquette",base:70,zones:{front:{label:"Face avant",x:140,y:150,w:120,h:70},side:{label:"Côté",x:260,y:190,w:60,h:40}},path:"M80 260 Q80 110 200 105 Q320 110 320 260 Z M60 260 L360 260 Q380 300 330 305 L60 285 Z"},tote:{name:"Tote bag",base:45,zones:{front:{label:"Face avant",x:110,y:170,w:180,h:180}},path:"M90 130 L310 130 L330 440 L70 440 Z M150 130 Q150 40 200 40 Q250 40 250 130 L235 130 Q235 58 200 58 Q165 58 165 130 Z"}},ne=[{name:"Blanc",hex:"#f8f8f6"},{name:"Noir",hex:"#1f1f22"},{name:"Marine",hex:"#1e2a4a"},{name:"Gris chiné",hex:"#9ca3af"},{name:"Bordeaux",hex:"#6b1d2a"},{name:"Sable",hex:"#d8c7a3"},{name:"Vert forêt",hex:"#24452f"}],N=[{code:"T1001",name:"Blanc",hex:"#ffffff"},{code:"T1002",name:"Noir",hex:"#111111"},{code:"T1147",name:"Rouge",hex:"#c8102e"},{code:"T1187",name:"Orange",hex:"#f26c21"},{code:"T1023",name:"Jaune",hex:"#ffcd00"},{code:"T1034",name:"Or",hex:"#c5a552"},{code:"T1252",name:"Vert",hex:"#00843d"},{code:"T1076",name:"Turquoise",hex:"#00a3ad"},{code:"T1176",name:"Bleu royal",hex:"#0033a0"},{code:"T1011",name:"Bleu ciel",hex:"#7bafd4"},{code:"T1032",name:"Violet",hex:"#5f259f"},{code:"T1121",name:"Rose",hex:"#ef95cf"},{code:"T1057",name:"Marron",hex:"#6e4c1e"},{code:"T1011G",name:"Gris",hex:"#8a8d8f"},{code:"T1300",name:"Argent",hex:"#c0c4c8"},{code:"T1080",name:"Beige",hex:"#e3c9a1"}],te=[{id:"block",label:"Block",css:'"Arial Black", "Helvetica Neue", Arial, sans-serif',weight:900},{id:"serif",label:"Varsity Serif",css:'Georgia, "Times New Roman", serif',weight:700},{id:"script",label:"Script",css:'"Brush Script MT", "Segoe Script", cursive',weight:400},{id:"mono",label:"Typewriter",css:'"Courier New", monospace',weight:700},{id:"rounded",label:"Rounded",css:'"Trebuchet MS", Verdana, sans-serif',weight:700}],ae=[{id:"satin",label:"Satin",density:1},{id:"fill",label:"Remplissage (tatami)",density:1.35},{id:"run",label:"Contour (point avant)",density:.25}],B={rect:"M-40 -30 H40 V30 H-40 Z",circle:"M-40 0 A40 40 0 1 0 40 0 A40 40 0 1 0 -40 0 Z",star:"M0 -42 L12 -13 L42 -13 L18 6 L27 38 L0 19 L-27 38 L-18 6 L-42 -13 L-12 -13 Z",heart:"M0 38 C-55 0 -40 -45 0 -20 C40 -45 55 0 0 38 Z",badge:"M0 -44 L38 -22 L38 22 L0 44 L-38 22 L-38 -22 Z"},X=e=>N.find(a=>a.hex===e)||{code:"—",name:e,hex:e},A={w:400,h:460},G=e=>String(e).replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]),Ie=e=>te.find(a=>a.id===e)||te[0];function I(e){const a=C[e.garment]||C.tshirt;return a.zones[e.zone]||Object.values(a.zones)[0]}const Ae=`
<defs>
  <pattern id="st-satin" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <rect width="3" height="3" fill="rgba(255,255,255,0)"/>
    <line x1="0" y1="0" x2="0" y2="3" stroke="rgba(255,255,255,.28)" stroke-width="1"/>
    <line x1="1.5" y1="0" x2="1.5" y2="3" stroke="rgba(0,0,0,.18)" stroke-width=".8"/>
  </pattern>
  <pattern id="st-fill" width="6" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)">
    <line x1="0" y1="1" x2="4" y2="1" stroke="rgba(255,255,255,.25)" stroke-width=".9"/>
    <line x1="2" y1="3" x2="6" y2="3" stroke="rgba(0,0,0,.2)" stroke-width=".9"/>
  </pattern>
  <filter id="st-relief" x="-10%" y="-10%" width="120%" height="120%">
    <feGaussianBlur in="SourceAlpha" stdDeviation=".8" result="b"/>
    <feOffset dx=".8" dy="1.2" in="b" result="o"/>
    <feComponentTransfer in="o" result="s"><feFuncA type="linear" slope=".45"/></feComponentTransfer>
    <feMerge><feMergeNode in="s"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="fabric" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3" result="n"/>
    <feColorMatrix in="n" type="saturate" values="0" result="g"/>
    <feComponentTransfer in="g" result="g2"><feFuncA type="linear" slope=".08"/></feComponentTransfer>
    <feComposite in="g2" in2="SourceGraphic" operator="in" result="t"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="t"/></feMerge>
  </filter>
</defs>`;function De(e){if(e.type==="text"){const a=Ie(e.font),n=String(e.text||" ").split(`
`),t=e.size*1.1,c=-(n.length-1)*t/2,d=n.map((r,m)=>`<tspan x="0" y="${(c+m*t).toFixed(1)}">${G(r||" ")}</tspan>`).join("");return r=>`<text ${r} text-anchor="middle" dominant-baseline="central" font-family="${G(a.css)}" font-weight="${a.weight}" font-size="${e.size}" letter-spacing="${e.spacing||0}">${d}</text>`}if(e.type==="shape"){const a=B[e.shape]||B.rect;return n=>`<path ${n} d="${a}"/>`}return e.type==="image"?(a,n)=>n?`<image href="${G(e.href)}" x="${-e.w/2}" y="${-e.h/2}" width="${e.w}" height="${e.h}" preserveAspectRatio="xMidYMid meet"/>`:`<rect ${a} x="${-e.w/2}" y="${-e.h/2}" width="${e.w}" height="${e.h}"/>`:()=>""}function Oe(e,{stitchLook:a=!0}={}){const n=De(e),t=`translate(${e.x} ${e.y}) rotate(${e.rotation||0}) scale(${e.scale||1})`;let c;if(e.type==="image")c=n("",!0)+(a?n('fill="url(#st-fill)" opacity=".6"'):"");else if(e.stitch==="run")c=n(`fill="none" stroke="${e.color}" stroke-width="1.6" stroke-dasharray="3 1.5" stroke-linejoin="round"`);else{const d=e.stitch==="fill"?"st-fill":"st-satin";c=n(`fill="${e.color}"`)+(a?n(`fill="url(#${d})"`):"")}return`<g class="el" data-id="${e.id}" transform="${t}" ${a?'filter="url(#st-relief)"':""}>${c}</g>`}function O(e,{editor:a=!1,selectedId:n=null,stitchLook:t=!0}={}){const c=C[e.garment]||C.tshirt,d=I(e),r=e.elements.map(h=>Oe(h,{stitchLook:t})).join(""),m=a?`<rect class="hoop" x="${d.x}" y="${d.y}" width="${d.w}" height="${d.h}" rx="6" fill="none" stroke="#c2410c" stroke-width="1.2" stroke-dasharray="5 4" pointer-events="none"/>`:"",w=a&&n?'<g id="sel-box" pointer-events="none"></g>':"";return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${A.w} ${A.h}" class="design-svg" role="img" aria-label="${G(e.name||"Design")}">
${Ae}
<rect width="${A.w}" height="${A.h}" fill="${a?"transparent":"#f4f1ec"}"/>
<path d="${c.path}" fill="${e.garmentColor}" stroke="rgba(0,0,0,.25)" stroke-width="1.5" filter="url(#fabric)" fill-rule="evenodd"/>
${m}
<g class="layer">${r}</g>
${w}
</svg>`}function me(e){return O(e,{editor:!1})}function je(e,a=1200){return new Promise((n,t)=>{const c=new Blob([e],{type:"image/svg+xml"}),d=URL.createObjectURL(c),r=new Image;r.onload=()=>{const m=document.createElement("canvas");m.width=a,m.height=Math.round(a*A.h/A.w),m.getContext("2d").drawImage(r,0,0,m.width,m.height),URL.revokeObjectURL(d),m.toBlob(h=>h?n(h):t(new Error("PNG export failed")),"image/png")},r.onerror=()=>{URL.revokeObjectURL(d),t(new Error("SVG load failed"))},r.src=d})}function V(e,a){const n=document.createElement("a");n.href=URL.createObjectURL(e),n.download=a,document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)}const he=.75,Fe=2,ge=500,$={currency:"DH",perThousandStitches:6,minEmbroidery:25,perColorChange:3,digitizingFee:150,digitizingFreeFrom:24,tiers:[{min:50,discount:.3},{min:12,discount:.2},{min:5,discount:.1},{min:1,discount:0}],machineStitchesPerMinute:800},Pe=e=>(ae.find(a=>a.id===e)||ae[0]).density;function ie(e){const a=(e.scale||1)**2,n=he**2*Fe*Pe(e.stitch);let t;if(e.type==="text"){const c=(e.text||"").replace(/\s/g,"").length;if(!c)return 0;t=c*e.size*.6*e.size*.4}else if(e.type==="shape")t=80*80*.65;else if(e.type==="image")t=e.w*e.h*.6;else return 0;if(e.stitch==="run"){const c=Math.sqrt(t);return Math.max(ge,Math.round(c*4*he*2.5*Math.sqrt(a)))}return Math.max(ge,Math.round(t*a*n))}function Re(e){const a=e.elements.reduce((c,d)=>c+ie(d),0),n=[...new Set(e.elements.map(c=>c.color))],t=Math.ceil(a/$.machineStitchesPerMinute);return{stitches:a,colors:n,colorChanges:Math.max(0,n.length-1),minutes:t}}function Ne(e){return $.tiers.find(a=>e>=a.min)||$.tiers[$.tiers.length-1]}function H(e,a=1){a=Math.max(1,Math.floor(a)||1);const n=Re(e),t=C[e.garment]||C.tshirt,c=n.stitches?Math.max($.minEmbroidery,n.stitches/1e3*$.perThousandStitches)+n.colorChanges*$.perColorChange:0,d=Ne(a),r=Y(c*(1-d.discount)),m=Y(t.base+r),w=n.stitches&&a<$.digitizingFreeFrom?$.digitizingFee:0,h=Y(m*a+w);return{...n,qty:a,garmentBase:t.base,embroidery:r,discount:d.discount,unit:m,digitizing:w,total:h}}const g=e=>`${e.toFixed(2)} ${$.currency}`;function Y(e){return Math.round(e*100)/100}const L={designs:"stitchly.designs",cart:"stitchly.cart",orders:"stitchly.orders",draft:"stitchly.draft"};function U(e,a){try{const n=localStorage.getItem(e);return n?JSON.parse(n):a}catch{return a}}function k(e,a){try{return localStorage.setItem(e,JSON.stringify(a)),!0}catch{return!1}}const Z=e=>`${e}_${Date.now().toString(36)}${Math.random().toString(36).slice(2,7)}`,we=new Set,Be=e=>we.add(e),z=()=>we.forEach(e=>e()),p={designs:()=>U(L.designs,[]),design:e=>p.designs().find(a=>a.id===e),saveDesign(e){const a=p.designs(),n=new Date().toISOString(),t={...structuredClone(e),updatedAt:n};t.id||(t.id=Z("dsg")),t.createdAt||(t.createdAt=n);const c=a.findIndex(d=>d.id===t.id);return c>=0?a[c]=t:a.unshift(t),k(L.designs,a),z(),t},deleteDesign(e){k(L.designs,p.designs().filter(a=>a.id!==e)),z()},draft:()=>U(L.draft,null),saveDraft:e=>k(L.draft,e),cart:()=>U(L.cart,[]),addToCart(e){const a=p.cart();a.push({...e,id:Z("itm")}),k(L.cart,a),z()},updateCartItem(e,a){k(L.cart,p.cart().map(n=>n.id===e?{...n,...a}:n)),z()},removeCartItem(e){k(L.cart,p.cart().filter(a=>a.id!==e)),z()},clearCart(){k(L.cart,[]),z()},orders:()=>U(L.orders,[]),placeOrder(e){const a=p.orders(),n={...e,id:`CMD-${String(a.length+1001)}`,status:"reçue",createdAt:new Date().toISOString()};return a.unshift(n),k(L.orders,a),z(),n},setOrderStatus(e,a){k(L.orders,p.orders().map(n=>n.id===e?{...n,status:a}:n)),z()}},M=e=>String(e??"").replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]);let fe;function q(e,a="ok"){const n=document.getElementById("toast");n&&(n.textContent=e,n.className=`show ${a}`,clearTimeout(fe),fe=setTimeout(()=>n.className="",2600))}const Se=e=>new Date(e).toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"}),He=2*1024*1024,Ue=100;function be(){return{name:"Nouveau design",garment:"tshirt",garmentColor:ne[0].hex,zone:"chest",elements:[]}}const ye=[{name:"Initiales",build:e=>[{type:"shape",shape:"circle",color:"#0033a0",stitch:"run",scale:1.4},{type:"text",text:"AB",font:"serif",size:46,color:"#0033a0",stitch:"satin"}].map(a=>({...a,x:e.x+e.w/2,y:e.y+e.h/2}))},{name:"Club sportif",build:e=>[{type:"shape",shape:"badge",color:"#c8102e",stitch:"fill",scale:1.3,y:0},{type:"text",text:`FC
CASA`,font:"block",size:24,color:"#ffffff",stitch:"satin",y:0}].map(a=>({...a,x:e.x+e.w/2,y:e.y+e.h/2}))},{name:"Prénom script",build:e=>[{type:"text",text:"Salma",font:"script",size:44,color:"#c5a552",stitch:"satin",x:e.x+e.w/2,y:e.y+e.h/2}]},{name:"Cœur minimal",build:e=>[{type:"shape",shape:"heart",color:"#c8102e",stitch:"satin",scale:.6,x:e.x+e.w/2,y:e.y+e.h/2}]}],ve=e=>({id:Z("el"),rotation:0,scale:1,stitch:"satin",color:N[1].hex,...e});function Ge(e,a){const n=a.get("id")&&p.design(a.get("id")),t={design:n?structuredClone(n):p.draft()||be(),selectedId:null,past:[],future:[],lastCommit:{key:null,at:0},qty:1};e.innerHTML=`
  <section class="studio" data-testid="studio">
    <aside class="tools panel" aria-label="Outils">
      <h2>Ajouter</h2>
      <div class="tool-grid">
        <button data-act="add-text" data-testid="add-text">＋ Texte</button>
        ${Object.keys(B).map(s=>`<button data-act="add-shape" data-shape="${s}" data-testid="add-shape-${s}" title="Forme ${s}">${Ve(s)}</button>`).join("")}
        <label class="btn file" data-testid="upload-label">⇪ Logo / image
          <input type="file" accept="image/png,image/jpeg,image/svg+xml" data-testid="upload-image" hidden />
        </label>
      </div>
      <h2>Modèles</h2>
      <div class="templates">
        ${ye.map((s,i)=>`<button data-act="template" data-i="${i}" data-testid="template-${i}">${s.name}</button>`).join("")}
      </div>
      <h2>Calques</h2>
      <ol class="layers" data-testid="layers"></ol>
    </aside>

    <div class="canvas-wrap">
      <div class="canvas-bar">
        <input class="design-name" data-testid="design-name" aria-label="Nom du design" />
        <div class="bar-actions">
          <button data-act="undo" data-testid="undo" title="Annuler (Ctrl+Z)">↶</button>
          <button data-act="redo" data-testid="redo" title="Rétablir (Ctrl+Y)">↷</button>
          <label class="toggle"><input type="checkbox" data-testid="stitch-look" checked /> Rendu points</label>
        </div>
      </div>
      <div class="canvas" data-testid="canvas"></div>
      <ul class="warnings" data-testid="warnings"></ul>
    </div>

    <aside class="side panel" aria-label="Réglages">
      <h2>Produit</h2>
      <label>Article
        <select data-field="garment" data-testid="garment">${Object.entries(C).map(([s,i])=>`<option value="${s}">${i.name} — ${g(i.base)}</option>`).join("")}</select>
      </label>
      <label>Emplacement <select data-field="zone" data-testid="zone"></select></label>
      <div class="field-label">Couleur de l'article</div>
      <div class="swatches" data-testid="garment-colors">
        ${ne.map(s=>`<button class="swatch" data-act="garment-color" data-hex="${s.hex}" style="--c:${s.hex}" title="${s.name}" aria-label="${s.name}"></button>`).join("")}
      </div>

      <div class="props" data-testid="props"></div>

      <h2>Devis</h2>
      <div class="quote" data-testid="quote"></div>
      <div class="actions">
        <button class="primary" data-act="cart" data-testid="add-to-cart">Ajouter au panier</button>
        <button data-act="save" data-testid="save-design">Enregistrer</button>
        <button data-act="export-svg" data-testid="export-svg">Export SVG</button>
        <button data-act="export-png" data-testid="export-png">Export PNG</button>
        <button data-act="sheet" data-testid="production-sheet">Fiche de production</button>
        <button data-act="new" data-testid="new-design">Nouveau</button>
      </div>
    </aside>
  </section>`;const c=e.querySelector(".studio"),d=s=>c.querySelector(s),r=d(".canvas"),m=d(".design-name"),w=d('[data-testid="stitch-look"]'),h=()=>t.design.elements.find(s=>s.id===t.selectedId);function b(s=null){const i=Date.now();if(s&&s===t.lastCommit.key&&i-t.lastCommit.at<800){t.lastCommit.at=i;return}t.lastCommit={key:s,at:i},t.past.push(structuredClone(t.design)),t.past.length>Ue&&t.past.shift(),t.future=[]}function j(){t.past.length&&(t.future.push(structuredClone(t.design)),t.design=t.past.pop(),t.lastCommit={key:null,at:0},h()||(t.selectedId=null),v())}function F(){t.future.length&&(t.past.push(structuredClone(t.design)),t.design=t.future.pop(),t.lastCommit={key:null,at:0},h()||(t.selectedId=null),v())}function S(){r.innerHTML=O(t.design,{editor:!0,selectedId:t.selectedId,stitchLook:w.checked}),P(),p.saveDraft(t.design)}function P(){const s=r.querySelector("#sel-box"),i=t.selectedId&&r.querySelector(`.el[data-id="${t.selectedId}"]`);if(!s||!i)return;let l;try{l=i.getBBox()}catch{return}const o=4;s.setAttribute("transform",i.getAttribute("transform")),s.innerHTML=`<rect x="${l.x-o}" y="${l.y-o}" width="${l.width+o*2}" height="${l.height+o*2}" fill="none" stroke="#2563eb" stroke-width="1" stroke-dasharray="4 3" vector-effect="non-scaling-stroke"/>`}function re(){const s=d(".layers");if(!t.design.elements.length){s.innerHTML='<li class="muted">Aucun élément. Ajoutez un texte, une forme ou un logo.</li>';return}s.innerHTML=[...t.design.elements].map((i,l)=>({el:i,i:l})).reverse().map(({el:i,i:l})=>`<li class="${i.id===t.selectedId?"active":""}">
          <button class="layer-pick" data-act="select" data-id="${i.id}" data-testid="layer-${l}">
            <span class="dot" style="--c:${i.color}"></span>${M(J(i))}
          </button>
          <span class="layer-tools">
            <button data-act="up" data-id="${i.id}" title="Monter" aria-label="Monter">▲</button>
            <button data-act="down" data-id="${i.id}" title="Descendre" aria-label="Descendre">▼</button>
          </span>
        </li>`).join("")}function qe(){d('[data-field="garment"]').value=t.design.garment;const s=C[t.design.garment].zones;s[t.design.zone]||(t.design.zone=Object.keys(s)[0]),d('[data-field="zone"]').innerHTML=Object.entries(s).map(([i,l])=>`<option value="${i}" ${i===t.design.zone?"selected":""}>${l.label}</option>`).join(""),c.querySelectorAll('[data-act="garment-color"]').forEach(i=>i.classList.toggle("on",i.dataset.hex===t.design.garmentColor)),m.value=t.design.name}function oe(){const s=h(),i=d(".props");if(!s){i.innerHTML=`<h2>Élément</h2><p class="muted">Sélectionnez un élément sur l'article pour le modifier. Glissez pour déplacer, flèches pour ajuster.</p>`;return}const l=N.map(o=>`<button class="swatch thread ${o.hex===s.color?"on":""}" data-act="thread" data-hex="${o.hex}" style="--c:${o.hex}" title="${o.code} ${o.name}" aria-label="Fil ${o.name}"></button>`).join("");i.innerHTML=`
      <h2>Élément — ${M(s.type==="text"?"Texte":s.type==="shape"?"Forme":"Image")}</h2>
      ${s.type==="text"?`<label>Texte <textarea rows="2" data-prop="text" data-testid="prop-text">${M(s.text)}</textarea></label>
             <label>Police <select data-prop="font" data-testid="prop-font">${te.map(o=>`<option value="${o.id}" ${o.id===s.font?"selected":""}>${o.label}</option>`).join("")}</select></label>
             <label>Taille <span class="val">${s.size}</span><input type="range" min="6" max="90" data-prop="size" data-num value="${s.size}" data-testid="prop-size"/></label>
             <label>Espacement <span class="val">${s.spacing||0}</span><input type="range" min="-5" max="20" data-prop="spacing" data-num value="${s.spacing||0}" data-testid="prop-spacing"/></label>`:""}
      ${s.type==="shape"?`<label>Forme <select data-prop="shape" data-testid="prop-shape">${Object.keys(B).map(o=>`<option ${o===s.shape?"selected":""}>${o}</option>`).join("")}</select></label>`:""}
      <label>Échelle <span class="val">${s.scale.toFixed(2)}</span><input type="range" min="0.2" max="3" step="0.05" data-prop="scale" data-num value="${s.scale}" data-testid="prop-scale"/></label>
      <label>Rotation <span class="val">${s.rotation}°</span><input type="range" min="-180" max="180" data-prop="rotation" data-num value="${s.rotation}" data-testid="prop-rotation"/></label>
      ${s.type!=="image"?`<label>Point <select data-prop="stitch" data-testid="prop-stitch">${ae.map(o=>`<option value="${o.id}" ${o.id===s.stitch?"selected":""}>${o.label}</option>`).join("")}</select></label>
      <div class="field-label">Fil — ${M(X(s.color).code)} ${M(X(s.color).name)}</div>
      <div class="swatches threads" data-testid="threads">${l}</div>`:'<p class="muted">Les images sont digitalisées par notre équipe avant broderie.</p>'}
      <div class="row">
        <button data-act="center" data-testid="center">Centrer</button>
        <button data-act="duplicate" data-testid="duplicate">Dupliquer</button>
        <button class="danger" data-act="delete" data-testid="delete">Supprimer</button>
      </div>
      <p class="muted small">≈ ${ie(s).toLocaleString("fr-FR")} points</p>`}function _(){const s=H(t.design,t.qty);d(".quote").innerHTML=`
      <label class="qty">Quantité <input type="number" min="1" max="5000" value="${t.qty}" data-testid="qty"/></label>
      <dl>
        <dt>Points</dt><dd data-testid="stitch-count">${s.stitches.toLocaleString("fr-FR")}</dd>
        <dt>Couleurs de fil</dt><dd>${s.colors.length}</dd>
        <dt>Temps machine</dt><dd>${s.minutes} min / pièce</dd>
        <dt>Article</dt><dd>${g(s.garmentBase)}</dd>
        <dt>Broderie${s.discount?` (−${s.discount*100}%)`:""}</dt><dd>${g(s.embroidery)}</dd>
        <dt>Prix unitaire</dt><dd data-testid="unit-price">${g(s.unit)}</dd>
        ${s.digitizing?`<dt>Digitalisation</dt><dd>${g(s.digitizing)}</dd>`:""}
        <dt class="total">Total</dt><dd class="total" data-testid="total-price">${g(s.total)}</dd>
      </dl>
      <p class="muted small">Digitalisation offerte dès ${$.digitizingFreeFrom} pièces. Remises : 5+ −10%, 12+ −20%, 50+ −30%.</p>`}function Q(){const s=I(t.design),i=[];for(const o of t.design.elements)(o.x<s.x||o.x>s.x+s.w||o.y<s.y||o.y>s.y+s.h)&&i.push(`« ${J(o)} » est hors de la zone de broderie.`),o.type==="text"&&o.size*(o.scale||1)<8&&i.push(`« ${J(o)} » est trop petit pour être brodé lisiblement (min. ~5 mm).`);new Set(t.design.elements.map(o=>o.color)).size>12&&i.push("Plus de 12 couleurs : la machine ne peut pas broder ce design en une passe."),d(".warnings").innerHTML=i.map(o=>`<li>⚠ ${M(o)}</li>`).join("")}function v(){qe(),S(),re(),oe(),_(),Q()}function de(){S(),re(),_(),Q()}function K(s){b();const i=I(t.design),l=ve({x:i.x+i.w/2,y:i.y+i.h/2,...s});return t.design.elements.push(l),t.selectedId=l.id,v(),l}function ce(){h()&&(b(),t.design.elements=t.design.elements.filter(s=>s.id!==t.selectedId),t.selectedId=null,v())}function le(s,i){const l=t.design.elements,o=l.findIndex(f=>f.id===s),u=o+i;o<0||u<0||u>=l.length||(b(),[l[o],l[u]]=[l[u],l[o]],v())}function ze(s,i){const l=h();l&&(b("nudge"),l.x+=s,l.y+=i,de())}async function Ee(s){if(!s)return;if(s.size>He)return q("Image trop lourde (max 2 Mo).","error");const i=await new Promise((f,T)=>{const E=new FileReader;E.onload=()=>f(E.result),E.onerror=T,E.readAsDataURL(s)}),l=await new Promise(f=>{const T=new Image;T.onload=()=>f({w:T.naturalWidth||100,h:T.naturalHeight||100}),T.onerror=()=>f({w:100,h:100}),T.src=i}),o=I(t.design),u=Math.min(o.w*.8/l.w,o.h*.8/l.h);K({type:"image",href:i,w:Math.round(l.w*u),h:Math.round(l.h*u),color:"#888888",stitch:"fill",name:s.name}),q("Logo ajouté — il sera digitalisé avant production.")}c.addEventListener("click",s=>{const i=s.target.closest("[data-act]");if(!i)return;const l=i.dataset.act,o=h();switch(l){case"add-text":K({type:"text",text:"Votre texte",font:"block",size:28,color:N[1].hex});break;case"add-shape":K({type:"shape",shape:i.dataset.shape,color:N[2].hex});break;case"template":{b();const f=ye[+i.dataset.i].build(I(t.design)).map(ve);t.design.elements.push(...f),t.selectedId=f[f.length-1].id,v();break}case"select":t.selectedId=i.dataset.id,v();break;case"up":le(i.dataset.id,1);break;case"down":le(i.dataset.id,-1);break;case"garment-color":b(),t.design.garmentColor=i.dataset.hex,v();break;case"thread":if(!o)break;b(),o.color=i.dataset.hex,v();break;case"center":{if(!o)break;b();const u=I(t.design);o.x=u.x+u.w/2,o.y=u.y+u.h/2,v();break}case"duplicate":{if(!o)break;b();const u={...structuredClone(o),id:Z("el"),x:o.x+10,y:o.y+10};t.design.elements.push(u),t.selectedId=u.id,v();break}case"delete":ce();break;case"undo":j();break;case"redo":F();break;case"save":{const u=p.saveDesign(t.design);t.design.id=u.id,t.design.createdAt=u.createdAt,p.saveDraft(t.design),q("Design enregistré.");break}case"cart":{if(!t.design.elements.length)return q("Ajoutez au moins un élément avant de commander.","error");const u=p.saveDesign(t.design);t.design.id=u.id,p.addToCart({designId:u.id,snapshot:structuredClone(u),qty:t.qty,size:"M"}),q("Ajouté au panier.");break}case"export-svg":V(new Blob([me(t.design)],{type:"image/svg+xml"}),`${W(t.design.name)}.svg`);break;case"export-png":je(me(t.design)).then(u=>V(u,`${W(t.design.name)}.png`)).catch(()=>q("L'export PNG a échoué.","error"));break;case"sheet":V(new Blob([JSON.stringify(Le(t.design,t.qty),null,2)],{type:"application/json"}),`${W(t.design.name)}-production.json`);break;case"new":b(),t.design=be(),t.selectedId=null,v();break}}),c.addEventListener("input",s=>{var f;const i=s.target;if(i===m){b("name"),t.design.name=i.value||"Sans titre",p.saveDraft(t.design);return}if(i.dataset.testid==="qty"){t.qty=Math.max(1,Math.min(5e3,parseInt(i.value,10)||1));const T=i.selectionStart;_();const E=d('[data-testid="qty"]');E.focus();try{E.setSelectionRange(T,T)}catch{}return}const l=i.dataset.prop,o=h();if(!l||!o)return;b(`prop:${o.id}:${l}`),o[l]="num"in i.dataset?parseFloat(i.value):i.value;const u=(f=i.closest("label"))==null?void 0:f.querySelector(".val");u&&(u.textContent=l==="rotation"?`${o.rotation}°`:l==="scale"?o.scale.toFixed(2):String(o[l])),de()}),c.addEventListener("change",s=>{const i=s.target;i.dataset.field==="garment"||i.dataset.field==="zone"?(b(),t.design[i.dataset.field]=i.value,v()):i===w?S():i.dataset.testid==="upload-image"?(Ee(i.files[0]).catch(()=>q("Impossible de lire l'image.","error")),i.value=""):(i.dataset.prop==="font"||i.dataset.prop==="stitch"||i.dataset.prop==="shape")&&oe()});let y=null;r.addEventListener("pointerdown",s=>{const i=s.target.closest(".el");if(!i){t.selectedId&&(t.selectedId=null,v());return}const l=i.dataset.id;l!==t.selectedId&&(t.selectedId=l,v());const o=r.querySelector("svg"),u=h(),f=$e(o,s);y={svg:o,el:u,ox:f.x-u.x,oy:f.y-u.y,moved:!1,id:s.pointerId},r.setPointerCapture(s.pointerId),s.preventDefault()}),r.addEventListener("pointermove",s=>{var u;if(!y)return;const i=$e(y.svg,s);y.moved||(b(),y.moved=!0),y.el.x=Math.round(i.x-y.ox),y.el.y=Math.round(i.y-y.oy);const l=r.querySelector(`.el[data-id="${y.el.id}"]`),o=`translate(${y.el.x} ${y.el.y}) rotate(${y.el.rotation}) scale(${y.el.scale})`;l==null||l.setAttribute("transform",o),(u=r.querySelector("#sel-box"))==null||u.setAttribute("transform",o)});const ue=()=>{y!=null&&y.moved&&(Q(),p.saveDraft(t.design)),y=null};r.addEventListener("pointerup",ue),r.addEventListener("pointercancel",ue);const pe=s=>{var o,u;const i=/^(INPUT|TEXTAREA|SELECT)$/.test((o=document.activeElement)==null?void 0:o.tagName),l=s.ctrlKey||s.metaKey;if(l&&s.key.toLowerCase()==="z"&&!i)s.preventDefault(),s.shiftKey?F():j();else if(l&&s.key.toLowerCase()==="y"&&!i)s.preventDefault(),F();else if(l&&s.key.toLowerCase()==="d"&&h()&&!i)s.preventDefault(),(u=c.querySelector('[data-act="duplicate"]'))==null||u.click();else if((s.key==="Delete"||s.key==="Backspace")&&!i&&h())s.preventDefault(),ce();else if(s.key.startsWith("Arrow")&&!i&&h()){s.preventDefault();const f=s.shiftKey?10:1,T={ArrowLeft:[-f,0],ArrowRight:[f,0],ArrowUp:[0,-f],ArrowDown:[0,f]}[s.key];ze(...T)}else s.key==="Escape"&&t.selectedId&&(t.selectedId=null,v())};return document.addEventListener("keydown",pe),v(),()=>document.removeEventListener("keydown",pe)}function $e(e,a){const n=e.createSVGPoint();return n.x=a.clientX,n.y=a.clientY,n.matrixTransform(e.getScreenCTM().inverse())}function J(e){return e.type==="text"?(e.text||"").replace(/\n/g," ").slice(0,24)||"Texte":e.type==="image"?e.name||"Image":`Forme ${e.shape}`}function Ve(e){return`<svg viewBox="-50 -50 100 100" width="22" height="22" aria-hidden="true"><path d="${B[e]}" fill="currentColor"/></svg>`}const W=e=>(e||"design").toLowerCase().normalize("NFD").replace(/[^\w]+/g,"-").replace(/^-|-$/g,"")||"design";function Le(e,a){var c;const n=H(e,a),t=C[e.garment];return{design:e.name,garment:t.name,garmentColor:((c=ne.find(d=>d.hex===e.garmentColor))==null?void 0:c.name)||e.garmentColor,placement:I(e).label,quantity:n.qty,totalStitches:n.stitches,machineMinutesPerPiece:n.minutes,threadSequence:n.colors.map((d,r)=>({step:r+1,...X(d)})),elements:e.elements.map(d=>({type:d.type,text:d.text,shape:d.shape,stitch:d.stitch,thread:X(d.color).code,stitches:ie(d),position:{x:d.x,y:d.y},rotation:d.rotation,scale:d.scale})),generatedAt:new Date().toISOString()}}const x=document.getElementById("app"),D={fee:30,freeFrom:500},ee=["reçue","en digitalisation","en production","expédiée","livrée"],Xe=["XS","S","M","L","XL","XXL"];let R=null;const xe={"":Ze,studio:_e,designs:se,cart:Me,orders:ke};function Ce(){const[e,a]=location.hash.replace(/^#\/?/,"").split("?"),n=xe[e]?e:"";R==null||R(),R=null,document.querySelectorAll("[data-route]").forEach(c=>c.classList.toggle("active",c.dataset.route===(n||"home")));const t=xe[n](new URLSearchParams(a||""));typeof t=="function"&&(R=t),x.focus({preventScroll:!0}),window.scrollTo(0,0)}function Te(){document.getElementById("cart-count").textContent=p.cart().reduce((e,a)=>e+a.qty,0)}Be(Te);window.addEventListener("hashchange",Ce);Te();Ce();function Ze(){const e=[...$.tiers].reverse();x.innerHTML=`
  <section class="hero">
    <div>
      <h1>Votre broderie, conçue en ligne.</h1>
      <p class="lead">Créez votre design dans le Studio, voyez le rendu point par point, obtenez un prix instantané et commandez — du t-shirt unique à la série pour votre équipe.</p>
      <div class="row">
        <a class="btn primary" href="#/studio" data-testid="cta-studio">Ouvrir le Studio</a>
        <a class="btn" href="#/designs">Mes designs</a>
      </div>
    </div>
    <div class="hero-art">${O({name:"Exemple",garment:"hoodie",garmentColor:"#1e2a4a",zone:"chest",elements:[{id:"a",type:"shape",shape:"badge",x:200,y:195,rotation:0,scale:1.1,color:"#c5a552",stitch:"run"},{id:"b",type:"text",text:`ATLAS
CLUB`,font:"block",size:22,x:200,y:195,rotation:0,scale:1,color:"#ffffff",stitch:"satin"}]})}</div>
  </section>

  <section class="steps">
    <article><span>1</span><h3>Concevez</h3><p>Texte, formes, modèles ou votre logo. Choisissez l'article, l'emplacement et les fils.</p></article>
    <article><span>2</span><h3>Estimez</h3><p>Nombre de points, temps machine et prix calculés en direct, remises de quantité incluses.</p></article>
    <article><span>3</span><h3>Commandez</h3><p>Paiement à la livraison ou virement. Suivez chaque étape : digitalisation, production, expédition.</p></article>
  </section>

  <section class="pricing">
    <h2>Tarifs</h2>
    <div class="price-grid">
      <table>
        <caption>Articles</caption>
        <tbody>${Object.values(C).map(a=>`<tr><th>${a.name}</th><td>${g(a.base)}</td></tr>`).join("")}</tbody>
      </table>
      <table>
        <caption>Broderie</caption>
        <tbody>
          <tr><th>Par 1 000 points</th><td>${g($.perThousandStitches)}</td></tr>
          <tr><th>Minimum broderie</th><td>${g($.minEmbroidery)}</td></tr>
          <tr><th>Changement de couleur</th><td>${g($.perColorChange)}</td></tr>
          <tr><th>Digitalisation (&lt; ${$.digitizingFreeFrom} pcs)</th><td>${g($.digitizingFee)}</td></tr>
        </tbody>
      </table>
      <table>
        <caption>Remises quantité</caption>
        <tbody>${e.map(a=>`<tr><th>${a.min}+ pièces</th><td>${a.discount?`−${a.discount*100}%`:"—"}</td></tr>`).join("")}</tbody>
      </table>
    </div>
    <p class="muted">Livraison ${g(D.fee)}, offerte dès ${g(D.freeFrom)}.</p>
  </section>`}function _e(e){return Ge(x,e)}function se(){const e=p.designs();return x.innerHTML=`
  <section class="page">
    <div class="page-head"><h1>Mes designs</h1><a class="btn primary" href="#/studio" data-testid="designs-new">Nouveau design</a></div>
    ${e.length?`<div class="cards" data-testid="design-list">${e.map(a=>{const n=H(a,1);return`<article class="card">
                <div class="thumb">${O(a)}</div>
                <h3>${M(a.name)}</h3>
                <p class="muted small">${C[a.garment].name} · ${n.stitches.toLocaleString("fr-FR")} points · ${g(n.unit)}<br>Modifié le ${Se(a.updatedAt)}</p>
                <div class="row">
                  <a class="btn" href="#/studio?id=${a.id}" data-testid="open-design">Ouvrir</a>
                  <button data-dup="${a.id}">Dupliquer</button>
                  <button class="danger" data-del="${a.id}">Supprimer</button>
                </div>
              </article>`}).join("")}</div>`:`<div class="empty"><p>Aucun design enregistré pour l'instant.</p><a class="btn primary" href="#/studio">Créer mon premier design</a></div>`}
  </section>`,x.onclick=a=>{var c,d;const n=(c=a.target.closest("[data-del]"))==null?void 0:c.dataset.del,t=(d=a.target.closest("[data-dup]"))==null?void 0:d.dataset.dup;if(n&&confirm("Supprimer ce design ?"))p.deleteDesign(n),se();else if(t){const r=p.design(t);p.saveDesign({...r,id:void 0,createdAt:void 0,name:`${r.name} (copie)`}),se()}},()=>x.onclick=null}function Me(){const e=p.cart();if(!e.length){x.innerHTML='<section class="page"><h1>Panier</h1><div class="empty"><p>Votre panier est vide.</p><a class="btn primary" href="#/studio">Ouvrir le Studio</a></div></section>';return}const a=e.map(r=>({...r,q:H(r.snapshot,r.qty)})),n=a.reduce((r,m)=>r+m.q.total,0),t=n>=D.freeFrom?0:D.fee,c=n+t;x.innerHTML=`
  <section class="page">
    <h1>Panier</h1>
    <div class="cart-layout">
      <div class="cart-lines" data-testid="cart-lines">
        ${a.map(r=>{const m=C[r.snapshot.garment],w=r.snapshot.garment==="tshirt"||r.snapshot.garment==="hoodie";return`<article class="line">
              <div class="thumb">${O(r.snapshot)}</div>
              <div>
                <h3>${M(r.snapshot.name)}</h3>
                <p class="muted small">${m.name} · ${r.q.stitches.toLocaleString("fr-FR")} points · ${g(r.q.unit)} / pièce${r.q.digitizing?` · digitalisation ${g(r.q.digitizing)}`:""}</p>
                <div class="row">
                  ${w?`<label>Taille <select data-size="${r.id}">${Xe.map(h=>`<option ${h===r.size?"selected":""}>${h}</option>`).join("")}</select></label>`:'<span class="muted small">Taille unique</span>'}
                  <label>Qté <input type="number" min="1" max="5000" value="${r.qty}" data-qty="${r.id}" data-testid="cart-qty"/></label>
                  <button class="danger" data-remove="${r.id}">Retirer</button>
                </div>
              </div>
              <strong class="line-total">${g(r.q.total)}</strong>
            </article>`}).join("")}
      </div>
      <form class="panel checkout" data-testid="checkout" novalidate>
        <h2>Récapitulatif</h2>
        <dl>
          <dt>Sous-total</dt><dd>${g(n)}</dd>
          <dt>Livraison</dt><dd>${t?g(t):"Offerte"}</dd>
          <dt class="total">Total</dt><dd class="total" data-testid="cart-total">${g(c)}</dd>
        </dl>
        <h2>Livraison</h2>
        <label>Nom complet <input name="name" required autocomplete="name" data-testid="ck-name"/></label>
        <label>Téléphone <input name="phone" required inputmode="tel" placeholder="06XXXXXXXX" autocomplete="tel" data-testid="ck-phone"/></label>
        <label>Ville <input name="city" required autocomplete="address-level2" data-testid="ck-city"/></label>
        <label>Adresse <textarea name="address" rows="2" required autocomplete="street-address" data-testid="ck-address"></textarea></label>
        <label>Paiement
          <select name="payment" data-testid="ck-payment">
            <option value="cod">Paiement à la livraison</option>
            <option value="transfer">Virement bancaire</option>
          </select>
        </label>
        <label>Notes <textarea name="notes" rows="2" placeholder="Date souhaitée, précisions…"></textarea></label>
        <p class="form-error" data-testid="ck-error" role="alert"></p>
        <button class="primary" type="submit" data-testid="place-order">Confirmer la commande</button>
      </form>
    </div>
  </section>`;const d=()=>Me();x.querySelectorAll("[data-qty]").forEach(r=>r.addEventListener("change",()=>{p.updateCartItem(r.dataset.qty,{qty:Math.max(1,Math.min(5e3,parseInt(r.value,10)||1))}),d()})),x.querySelectorAll("[data-size]").forEach(r=>r.addEventListener("change",()=>p.updateCartItem(r.dataset.size,{size:r.value}))),x.querySelectorAll("[data-remove]").forEach(r=>r.addEventListener("click",()=>{p.removeCartItem(r.dataset.remove),d()})),x.querySelector("form").addEventListener("submit",r=>{r.preventDefault();const m=Object.fromEntries(new FormData(r.target)),w=Qe(m);if(x.querySelector(".form-error").textContent=w||"",w)return;const h=p.cart().map(S=>({...S,q:H(S.snapshot,S.qty)})),b=h.reduce((S,P)=>S+P.q.total,0),j=b>=D.freeFrom?0:D.fee,F=p.placeOrder({customer:{name:m.name.trim(),phone:m.phone.replace(/\s/g,""),city:m.city.trim(),address:m.address.trim()},payment:m.payment,notes:(m.notes||"").trim(),items:h.map(({q:S,...P})=>({...P,unit:S.unit,total:S.total,stitches:S.stitches})),subtotal:b,shipping:j,total:b+j});p.clearCart(),q(`Commande ${F.id} confirmée !`),location.hash="#/orders"})}function Qe(e){return!e.name||e.name.trim().length<3?"Indiquez votre nom complet.":/^(\+212|0)[5-7]\d{8}$/.test((e.phone||"").replace(/[\s.-]/g,""))?!e.city||!e.city.trim()?"Indiquez votre ville.":!e.address||e.address.trim().length<5?"Indiquez une adresse de livraison complète.":"":"Numéro de téléphone invalide (ex. 0612345678 ou +212612345678)."}function ke(){const e=p.orders();x.innerHTML=`
  <section class="page">
    <h1>Commandes</h1>
    ${e.length?`<div class="orders" data-testid="order-list">${e.map(a=>`<article class="panel order">
              <header>
                <div><strong>${a.id}</strong> <span class="muted small">· ${Se(a.createdAt)}</span></div>
                <label class="small">Statut
                  <select data-status="${a.id}" data-testid="order-status">${ee.map(n=>`<option ${n===a.status?"selected":""}>${n}</option>`).join("")}</select>
                </label>
              </header>
              <ol class="progress">${ee.map((n,t)=>`<li class="${t<=ee.indexOf(a.status)?"done":""}">${n}</li>`).join("")}</ol>
              <ul class="order-items">${a.items.map((n,t)=>`<li>
                    <div class="thumb sm">${O(n.snapshot)}</div>
                    <div>${M(n.snapshot.name)} — ${C[n.snapshot.garment].name}${n.size&&["tshirt","hoodie"].includes(n.snapshot.garment)?` (${n.size})`:""} × ${n.qty}<br><span class="muted small">${n.stitches.toLocaleString("fr-FR")} points · ${g(n.total)}</span></div>
                    <button data-sheet="${a.id}:${t}" class="small">Fiche production</button>
                  </li>`).join("")}</ul>
              <footer class="muted small">${M(a.customer.name)} · ${M(a.customer.phone)} · ${M(a.customer.city)} — ${a.payment==="cod"?"Paiement à la livraison":"Virement"} · <strong>Total ${g(a.total)}</strong></footer>
            </article>`).join("")}</div>`:`<div class="empty"><p>Aucune commande pour l'instant.</p><a class="btn primary" href="#/studio">Créer un design</a></div>`}
  </section>`,x.querySelectorAll("[data-status]").forEach(a=>a.addEventListener("change",()=>{p.setOrderStatus(a.dataset.status,a.value),ke(),q("Statut mis à jour.")})),x.querySelectorAll("[data-sheet]").forEach(a=>a.addEventListener("click",()=>{const[n,t]=a.dataset.sheet.split(":"),c=p.orders().find(m=>m.id===n),d=c.items[+t],r={order:c.id,customer:c.customer,size:d.size,...Le(d.snapshot,d.qty)};V(new Blob([JSON.stringify(r,null,2)],{type:"application/json"}),`${c.id}-${+t+1}-production.json`)}))}
