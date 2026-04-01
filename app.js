document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menuNav = document.getElementById("menu-nav");
  const cabecalho = document.querySelector(".cabecalho");
  const btnTopo = document.getElementById("btn-topo");

  const menuLinks = document.querySelectorAll('.menu-nav a[href^="#"]');
  const linksInternos = document.querySelectorAll('a[href^="#"]');
  const secoes = document.querySelectorAll("section[id]");
  const elementosAnimar = document.querySelectorAll(".animar");
  const perguntas = document.querySelectorAll(".faq-pergunta");

  /* =========================
     MENU MOBILE
  ========================= */
  if (menuToggle && menuNav) {
    menuToggle.addEventListener("click", () => {
      menuNav.classList.toggle("aberto");
      const aberto = menuNav.classList.contains("aberto");

      menuToggle.setAttribute("aria-expanded", aberto ? "true" : "false");
      menuToggle.innerHTML = aberto
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    document.addEventListener("click", (event) => {
      if (
        menuNav.classList.contains("aberto") &&
        !menuNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        menuNav.classList.remove("aberto");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  }

  /* =========================
     CABEÇALHO AO ROLAR
  ========================= */
  function atualizarCabecalho() {
    if (!cabecalho) return;

    if (window.scrollY > 20) {
      cabecalho.classList.add("scrolled");
    } else {
      cabecalho.classList.remove("scrolled");
    }
  }

  atualizarCabecalho();
  window.addEventListener("scroll", atualizarCabecalho);

  /* =========================
     ROLAGEM SUAVE PARA ÂNCORAS
  ========================= */
  function rolarParaSecao(id) {
    if (!id || id === "#") return;

    const destino = document.querySelector(id);
    if (!destino) return;

    const alturaHeader = cabecalho ? cabecalho.offsetHeight : 90;
    const topo = destino.offsetTop - alturaHeader - 12;

    window.scrollTo({
      top: topo,
      behavior: "smooth"
    });
  }

  linksInternos.forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");

      if (!id || !id.startsWith("#")) return;

      const destino = document.querySelector(id);
      if (!destino) return;

      event.preventDefault();
      rolarParaSecao(id);

      if (menuNav && menuNav.classList.contains("aberto")) {
        menuNav.classList.remove("aberto");
        if (menuToggle) {
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
      }
    });
  });

  /* =========================
     DESTAQUE DO MENU ATIVO
  ========================= */
  function destacarMenu() {
    const alturaHeader = cabecalho ? cabecalho.offsetHeight : 90;
    const posicao = window.scrollY + alturaHeader + 60;

    secoes.forEach((secao) => {
      const topo = secao.offsetTop;
      const altura = secao.offsetHeight;
      const id = secao.getAttribute("id");
      const link = document.querySelector(`.menu-nav a[href="#${id}"]`);

      if (!link) return;

      if (posicao >= topo && posicao < topo + altura) {
        menuLinks.forEach((a) => a.classList.remove("ativo"));
        link.classList.add("ativo");
      }
    });
  }

  destacarMenu();
  window.addEventListener("scroll", destacarMenu);

  /* =========================
     BOTÃO TOPO
  ========================= */
  if (btnTopo) {
    function toggleTopo() {
      btnTopo.style.display = window.scrollY > 300 ? "grid" : "none";
    }

    toggleTopo();
    window.addEventListener("scroll", toggleTopo);

    btnTopo.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* =========================
     ANIMAÇÃO AO ENTRAR
  ========================= */
  function animarAoEntrar() {
    const alturaTela = window.innerHeight;

    elementosAnimar.forEach((elemento) => {
      if (elemento.getBoundingClientRect().top < alturaTela - 80) {
        elemento.classList.add("visivel");
      }
    });
  }

  animarAoEntrar();
  window.addEventListener("scroll", animarAoEntrar);

  /* =========================
     FAQ
  ========================= */
  perguntas.forEach((pergunta) => {
    pergunta.addEventListener("click", () => {
      const item = pergunta.closest(".faq-item");
      if (!item) return;

      document.querySelectorAll(".faq-item").forEach((outro) => {
        if (outro !== item) {
          outro.classList.remove("ativo");
        }
      });

      item.classList.toggle("ativo");
    });
  });
});