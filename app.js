document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menuNav = document.getElementById("menu-nav");
  const btnTopo = document.getElementById("btn-topo");

  if (menuToggle && menuNav) {
    function fecharMenu() {
      menuNav.classList.remove("aberto");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      document.body.classList.remove("menu-aberto");
    }

    function abrirMenu() {
      menuNav.classList.add("aberto");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      document.body.classList.add("menu-aberto");
    }

    menuToggle.addEventListener("click", () => {
      const aberto = menuNav.classList.contains("aberto");
      aberto ? fecharMenu() : abrirMenu();
    });

    document.addEventListener("click", (event) => {
      if (
        menuNav.classList.contains("aberto") &&
        !menuNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        fecharMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) {
        fecharMenu();
      }
    });
  }

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