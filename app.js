document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menuNav = document.getElementById("menu-nav");
  const btnTopo = document.getElementById("btn-topo");

  /*
   * Menu para celular
   */
  if (menuToggle && menuNav) {
    function atualizarIconeMenu(aberto) {
      menuToggle.setAttribute("aria-expanded", String(aberto));
      menuToggle.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
      );

      menuToggle.innerHTML = aberto
        ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    }

    function abrirMenu() {
      menuNav.classList.add("aberto");
      document.body.classList.add("menu-aberto");
      atualizarIconeMenu(true);
    }

    function fecharMenu() {
      menuNav.classList.remove("aberto");
      document.body.classList.remove("menu-aberto");
      atualizarIconeMenu(false);
    }

    function alternarMenu(event) {
      event.preventDefault();

      if (menuNav.classList.contains("aberto")) {
        fecharMenu();
      } else {
        abrirMenu();
      }
    }

    /*
     * O evento click funciona com mouse, toque e teclado.
     * Não é necessário adicionar touchstart.
     */
    menuToggle.addEventListener("click", alternarMenu);

    /*
     * Fecha o menu ao clicar fora dele.
     */
    document.addEventListener("click", (event) => {
      const menuEstaAberto = menuNav.classList.contains("aberto");
      const clicouDentroDoMenu = menuNav.contains(event.target);
      const clicouNoBotao = menuToggle.contains(event.target);

      if (
        menuEstaAberto &&
        !clicouDentroDoMenu &&
        !clicouNoBotao
      ) {
        fecharMenu();
      }
    });

    /*
     * Fecha o menu com a tecla Esc.
     */
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        menuNav.classList.contains("aberto")
      ) {
        fecharMenu();
        menuToggle.focus();
      }
    });

    /*
     * Fecha o menu depois que um link é selecionado.
     */
    menuNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", fecharMenu);
    });

    /*
     * Fecha o menu caso a tela volte ao tamanho de computador.
     */
    window.addEventListener("resize", () => {
      if (
        window.innerWidth > 980 &&
        menuNav.classList.contains("aberto")
      ) {
        fecharMenu();
      }
    });

    atualizarIconeMenu(false);
  }

  /*
   * Destaque automático da página atual no menu.
   */
  const linksMenu = Array.from(
    document.querySelectorAll("#menu-nav a")
  );

  function obterArquivoDaUrl(valor) {
    if (!valor) {
      return "";
    }

    const urlSemAncora = valor
      .split("#")[0]
      .split("?")[0];

    const partes = urlSemAncora
      .split("/")
      .filter(Boolean);

    return partes.pop() || "index.html";
  }

  const paginaAtual =
    obterArquivoDaUrl(window.location.pathname) ||
    "index.html";

  const linkDaPaginaAtual = linksMenu.find((link) => {
    const href = link.getAttribute("href");

    if (!href) {
      return false;
    }

    const paginaDoLink =
      href === "/"
        ? "index.html"
        : obterArquivoDaUrl(href);

    return paginaDoLink === paginaAtual;
  });

  /*
   * Só substitui o destaque quando encontra uma página exata
   * no menu. Nos artigos, mantém "Conteúdos" destacado quando
   * isso já estiver definido no próprio HTML.
   */
  if (linkDaPaginaAtual) {
    linksMenu.forEach((link) => {
      link.classList.remove("ativo");
      link.removeAttribute("aria-current");
    });

    linkDaPaginaAtual.classList.add("ativo");
    linkDaPaginaAtual.setAttribute(
      "aria-current",
      "page"
    );
  }

  /*
   * Botão para voltar ao topo.
   */
  if (btnTopo) {
    function alternarBotaoTopo() {
      btnTopo.classList.toggle(
        "visivel",
        window.scrollY > 300
      );
    }

    alternarBotaoTopo();

    window.addEventListener(
      "scroll",
      alternarBotaoTopo,
      { passive: true }
    );

    btnTopo.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});