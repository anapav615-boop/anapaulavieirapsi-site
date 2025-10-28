
const $ = (s, doc=document)=>doc.querySelector(s);
const $$ = (s, doc=document)=>[...doc.querySelectorAll(s)];
const nav = $("#nav");
const toggle = $("#menuToggle");
if (toggle) toggle.addEventListener("click", ()=> nav.classList.toggle("open"));
$("#year") && ($("#year").textContent = new Date().getFullYear());
fetch('/site-config.json').then(r=>r.json()).then(cfg=>{
  $$('[data-config="address"]').forEach(el=> el.textContent = cfg.address);
  $$('[data-config="phone_display"]').forEach(el=> el.textContent = cfg.phone_display);
  const wa = $('.floating-wa');
  if (wa && cfg.whatsapp_link) wa.href = cfg.whatsapp_link;
}).catch(()=>{});
