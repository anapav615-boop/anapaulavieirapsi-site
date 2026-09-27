/* Ana Paula Aparecida Vieira | Google Analytics 4 (GA4)
   O Google Analytics so e carregado quando a pessoa aceita cookies opcionais.
   Mede visualizacoes de paginas e cliques em links para WhatsApp.
   Nunca envia conteudo de mensagens, telefone ou dados de formularios no evento. */
(function () {
  'use strict';
  var MEASUREMENT_ID = 'G-EG6WL7P4R1';
  var CHOICE_KEY = 'apav_consent_analytics_v1';
  var started = false;

  function readChoice() {
    try { return window.localStorage.getItem(CHOICE_KEY); }
    catch (_) { return null; }
  }
  function saveChoice(value) {
    try { window.localStorage.setItem(CHOICE_KEY, value); } catch (_) {}
  }
  function isWhatsAppLink(anchor) {
    try {
      var u = new URL(anchor.href, window.location.href);
      return u.protocol === 'https:' &&
        (u.hostname === 'wa.me' || u.hostname === 'api.whatsapp.com' ||
         u.hostname === 'web.whatsapp.com' || u.hostname === 'www.whatsapp.com' ||
         u.hostname === 'whatsapp.com');
    } catch (_) { return false; }
  }
  function loadAnalytics() {
    if (started || readChoice() !== 'accepted') return;
    started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID);
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
    document.head.appendChild(tag);
  }
  function removeFirstPartyAnalyticsCookies() {
    document.cookie.split(';').forEach(function (pair) {
      var name = pair.split('=')[0].trim();
      if (/^_ga(?:_|$)/.test(name)) {
        var host = window.location.hostname;
        document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax';
        document.cookie = name + '=; Max-Age=0; path=/; domain=' + host + '; SameSite=Lax';
        document.cookie = name + '=; Max-Age=0; path=/; domain=.' + host.replace(/^www\./, '') + '; SameSite=Lax';
      }
    });
  }

  function init() {
    if (readChoice() === 'accepted') loadAnalytics();

    // Track only the fact of clicking a WhatsApp link, never its number or message.
    document.addEventListener('click', function (event) {
      var node = event.target && (event.target.nodeType === 3 ? event.target.parentElement : event.target);
      var anchor = node && node.closest && node.closest('a[href]');
      if (!anchor || !isWhatsAppLink(anchor)) return;
      if (readChoice() === 'accepted' && typeof window.gtag === 'function') {
        window.gtag('event', 'clique_whatsapp', { pagina: window.location.pathname });
      }
    }, true);

    var style = document.createElement('style');
    style.textContent = '#apav-cookie-banner{position:fixed;z-index:2147483000;left:14px;right:14px;bottom:14px;max-width:900px;margin:0 auto;padding:17px 20px;border:1px solid #d9cce9;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.16);background:#fff;color:#45384e;font:15px/1.55 Arial,sans-serif;display:flex;flex-wrap:wrap;align-items:center;gap:14px}#apav-cookie-banner p{margin:0;flex:1 1 360px}#apav-cookie-banner a{color:#674498;text-decoration:underline}#apav-cookie-banner .apav-actions{display:flex;flex-wrap:wrap;gap:8px}#apav-cookie-banner button{font:inherit;cursor:pointer;border:1px solid #674498;border-radius:22px;padding:9px 15px;background:white;color:#674498}#apav-cookie-banner button.apav-accept{background:#674498;color:white}#apav-cookie-banner button:focus-visible{outline:3px solid #ab89d4;outline-offset:2px}';
    document.head.appendChild(style);
    var banner = document.createElement('section');
    banner.id = 'apav-cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Preferências de cookies');
    banner.innerHTML = '<p>Utilizamos cookies opcionais do Google Analytics para entender as visitas e os cliques no WhatsApp. Você pode aceitar ou recusar sem afetar o atendimento. Leia nossa <a href="/privacidade.html">Política de Privacidade</a>.</p><div class="apav-actions"><button type="button" class="apav-reject">Recusar</button><button type="button" class="apav-accept">Aceitar análise</button></div>';
    banner.style.display = 'none';
    document.body.appendChild(banner);

    function showBanner() { banner.style.display = 'flex'; }
    function hideBanner() { banner.style.display = 'none'; }

    banner.querySelector('.apav-accept').addEventListener('click', function () {
      saveChoice('accepted');
      hideBanner();
      loadAnalytics();
    });
    banner.querySelector('.apav-reject').addEventListener('click', function () {
      var previouslyLoaded = started;
      saveChoice('rejected');
      hideBanner();
      if (previouslyLoaded) {
        if (typeof window.gtag === 'function') {
          window.gtag('consent', 'update', { analytics_storage: 'denied' });
        }
        removeFirstPartyAnalyticsCookies();
        window.location.reload(); // Do not load GA again after withdrawing consent.
      }
    });

    document.addEventListener('click', function (event) {
      var node = event.target && (event.target.nodeType === 3 ? event.target.parentElement : event.target);
      if (node && node.closest && node.closest('[data-apav-cookie-settings]')) {
        event.preventDefault();
        showBanner();
      }
    });
    if (!readChoice()) showBanner();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
