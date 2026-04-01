document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menuNav = document.getElementById("menu-nav");
  const cabecalho = document.querySelector(".cabecalho");
  const btnTopo = document.getElementById("btn-topo");

  const menuLinks = document.querySelectorAll('.menu-nav a[href^="#"]');
  const linksInternos = document.querySelectorAll('a[href^="#"]');
  const secoes = document.querySelectorAll("section[id], footer[id]");
  const elementosAnimar = document.querySelectorAll(".animar");

  function getHeaderOffset() {
    return cabecalho ? cabecalho.offsetHeight + 14 : 104;
  }

  function fecharMenuMobile() {
    if (!menuNav || !menuToggle) return;

    menuNav.classList.remove("aberto");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    document.body.classList.remove("menu-aberto");
  }

  function abrirMenuMobile() {
    if (!menuNav || !menuToggle) return;

    menuNav.classList.add("aberto");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    document.body.classList.add("menu-aberto");
  }

  function atualizarCabecalho() {
    if (!cabecalho) return;
    cabecalho.classList.toggle("scrolled", window.scrollY > 16);
  }

  function rolarParaSecao(hash, atualizarURL = true) {
    if (!hash || hash === "#") return;

    const destino = document.querySelector(hash);
    if (!destino) return;

    const topo = destino.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();

    window.scrollTo({
      top: Math.max(topo, 0),
      behavior: "smooth"
    });

    if (atualizarURL) {
      history.replaceState(null, "", hash);
    }
  }

  function destacarMenu() {
    const posicaoAtual = window.scrollY + getHeaderOffset() + 80;
    let linkAtivo = null;

    secoes.forEach((secao) => {
      const topo = secao.offsetTop;
      const altura = secao.offsetHeight;
      const id = secao.getAttribute("id");
      const link = document.querySelector(`.menu-nav a[href="#${id}"]`);

      if (!link) return;

      if (posicaoAtual >= topo && posicaoAtual < topo + altura) {
        linkAtivo = link;
      }
    });

    menuLinks.forEach((link) => link.classList.remove("ativo"));

    if (linkAtivo) {
      linkAtivo.classList.add("ativo");
    }
  }

  function animarAoEntrar() {
    const alturaTela = window.innerHeight;

    elementosAnimar.forEach((elemento) => {
      const topoElemento = elemento.getBoundingClientRect().top;

      if (topoElemento < alturaTela - 80) {
        elemento.classList.add("visivel");
      }
    });
  }

  if (menuToggle && menuNav) {
    menuToggle.addEventListener("click", () => {
      const aberto = menuNav.classList.contains("aberto");
      aberto ? fecharMenuMobile() : abrirMenuMobile();
    });

    document.addEventListener("click", (event) => {
      if (
        menuNav.classList.contains("aberto") &&
        !menuNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        fecharMenuMobile();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) {
        fecharMenuMobile();
      }
    });
  }

  linksInternos.forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");

      if (!hash || !hash.startsWith("#")) return;

      const destino = document.querySelector(hash);
      if (!destino) return;

      event.preventDefault();
      rolarParaSecao(hash);
      fecharMenuMobile();
    });
  });

  if (btnTopo) {
    function toggleTopo() {
      btnTopo.classList.toggle("visivel", window.scrollY > 300);
    }

    toggleTopo();
    window.addEventListener("scroll", toggleTopo);

    btnTopo.addEventListener("click", () => {
      history.replaceState(null, "", "#inicio");
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  atualizarCabecalho();
  destacarMenu();
  animarAoEntrar();

  window.addEventListener("scroll", () => {
    atualizarCabecalho();
    destacarMenu();
    animarAoEntrar();
  });

  if (window.location.hash) {
    setTimeout(() => {
      rolarParaSecao(window.location.hash, false);
    }, 120);
  }
});