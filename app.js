/* ================================
   APP.JS - SITE ANA PAULA VIEIRA
   Integrado com ADMIN (posts automáticos)
   ================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ------------------- BOTÃO VOLTAR AO TOPO ------------------- */
  const btnTopo = document.getElementById("btn-topo");
  if (btnTopo) {
    btnTopo.style.display = "none";
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) btnTopo.style.display = "block";
      else btnTopo.style.display = "none";
    });
    btnTopo.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ------------------- ROLAGEM SUAVE ------------------- */
  const linksInternos = document.querySelectorAll('a[href^="#"]');
  linksInternos.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.length > 1) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target)
          window.scrollTo({ top: target.offsetTop - 60, behavior: "smooth" });
      }
    });
  });

  /* ------------------- ANIMAÇÃO ------------------- */
  const elementosAnimar = document.querySelectorAll(".animar");
  function verificarAnimacao() {
    const altura = window.innerHeight;
    elementosAnimar.forEach(el => {
      if (el.getBoundingClientRect().top < altura - 100) el.classList.add("visivel");
    });
  }
  verificarAnimacao();
  window.addEventListener("scroll", verificarAnimacao);

  /* ------------------- HERO ------------------- */
  const heroImg = document.querySelector(".hero img, .hero-img, .hero-recursos img");
  if (heroImg) heroImg.classList.add("loaded");

  /* -----------------------------------------------------
     🔥 PARTE IMPORTANTE: CARREGAR RECURSOS DO JSON + ADMIN
     ----------------------------------------------------- */
  const container = document.querySelector(".conteudo-recursos");
  if (container) {
    container.innerHTML = "<p>Carregando conteúdos...</p>";

    // 1) Carregar JSON fixo
    fetch("dados/recursos.json")
      .then(r => r.json())
      .then(jsonFixos => {

        // 2) Carregar posts criados no Admin (localStorage)
        const postsAdmin = JSON.parse(localStorage.getItem("recursosPosts")) || [];

        // 3) Unir as duas listas
        const listaFinal = [
          ...postsAdmin.map(post => ({
            titulo: post.titulo,
            imagem: post.imagem || "imagens/default.jpg",
            descricao: post.conteudo.substring(0, 160) + "...",
            link: `artigo.html?id=${post.id}`,
            data: post.data
          })),
          ...jsonFixos
        ];

        // 4) Limpar área
        container.innerHTML = "";

        // 5) Criar cards
        listaFinal.forEach((item, i) => {
          const card = document.createElement("div");
          card.className = "card-post";
          card.innerHTML = `
            <img src="${item.imagem}" alt="${item.titulo}"
                 onerror="this.src='imagens/default.jpg'">
            <div class="card-conteudo">
              <h3>${item.titulo}</h3>
              <p>${item.descricao}</p>
              <a href="${item.link}" class="btn-leia">Saiba mais</a>
            </div>
          `;
          container.appendChild(card);
        });
      })
      .catch(() => {
        container.innerHTML = `<p style="color:#6b4a99; text-align:center;">
          Conteúdos temporariamente indisponíveis.
        </p>`;
      });
  }
});

/* ------------------- ARTIGO AUTOMÁTICO ------------------- */
(function carregarArtigo() {
  const artigoContainer = document.getElementById("artigo-container");
  if (!artigoContainer) return;

  const url = new URL(window.location.href);
  const id = Number(url.searchParams.get("id"));
  if (!id) {
    artigoContainer.innerHTML = "<p>Artigo não encontrado.</p>";
    return;
  }

  const postsAdmin = JSON.parse(localStorage.getItem("recursosPosts")) || [];
  const post = postsAdmin.find(p => p.id === id);

  if (!post) {
    artigoContainer.innerHTML = "<p>Artigo não encontrado.</p>";
    return;
  }

  artigoContainer.innerHTML = `
    <div class="artigo-capa">
      <img src="${post.imagem}" alt="${post.titulo}">
    </div>

    <h1>${post.titulo}</h1>
    <p class="data-artigo">${post.data}</p>

    <div class="texto-artigo">
      ${post.conteudo.replace(/\n/g, "<br>")}
    </div>

    <a href="recursos.html" class="btn-voltar-artigos">← Voltar aos recursos</a>
  `;
})();
