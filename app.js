document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menuNav = document.getElementById("menu-nav");
  const btnTopo = document.getElementById("btn-topo");

  if (menuToggle && menuNav) {
    function abrirMenu() {
      menuNav.classList.add("aberto");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      document.body.classList.add("menu-aberto");
    }

    function fecharMenu() {
      menuNav.classList.remove("aberto");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      document.body.classList.remove("menu-aberto");
    }

    function alternarMenu(event) {
      event.preventDefault();
      event.stopPropagation();

      if (menuNav.classList.contains("aberto")) {
        fecharMenu();
      } else {
        abrirMenu();
      }
    }

    menuToggle.addEventListener("click", alternarMenu);
    menuToggle.addEventListener("touchstart", alternarMenu, { passive: false });

    document.addEventListener("click", (event) => {
      if (
        menuNav.classList.contains("aberto") &&
        !menuNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        fecharMenu();
      }
    });

    const linksDoMenu = menuNav.querySelectorAll("a");
    linksDoMenu.forEach((link) => {
      link.addEventListener("click", () => {
        fecharMenu();
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) {
        fecharMenu();
      }
    });
  }

  const linksMenu = document.querySelectorAll("#menu-nav a");
  const paginaAtual = window.location.pathname.split("/").pop() || "index.html";

  linksMenu.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) return;

    if (href === paginaAtual) {
      link.classList.add("ativo");
      link.setAttribute("aria-current", "page");
    }
  });

  if (btnTopo) {
    function toggleTopo() {
      btnTopo.classList.toggle("visivel", window.scrollY > 300);
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
});