// ==========================================
// 🔐 Sistema de Login
// ==========================================
function verificarSenha() {
  const senha = document.getElementById("senha").value.trim();
  if (senha === "psico2025") {
    document.getElementById("loginArea").style.display = "none";
    document.getElementById("painelAdmin").style.display = "block";
    listarPosts(); // assim que entrar no painel, já carrega os posts
  } else {
    alert("Senha incorreta! Tente novamente.");
  }
}

// ==========================================
// 💾 Publicar novo post
// ==========================================
function publicarPost() {
  const titulo = document.getElementById("titulo").value.trim();
  const imagem = document.getElementById("imagem").value.trim();
  const conteudo = document.getElementById("conteudo").value.trim();

  if (!titulo || !conteudo) {
    alert("Por favor, preencha o título e o texto.");
    return;
  }

  const posts = JSON.parse(localStorage.getItem("recursosPosts")) || [];

  const novoPost = {
    id: Date.now(),
    titulo,
    imagem,
    conteudo,
    data: new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    })
  };

  // adiciona no início da lista
  posts.unshift(novoPost);
  localStorage.setItem("recursosPosts", JSON.stringify(posts));

  // mensagem de sucesso
  const msg = document.getElementById("msgPost");
  if (msg) {
    msg.style.display = "block";
    setTimeout(() => {
      msg.style.display = "none";
    }, 2500);
  }

  // limpa formulário
  document.getElementById("titulo").value = "";
  document.getElementById("imagem").value = "";
  document.getElementById("conteudo").value = "";

  // atualiza a lista de posts na tela
  listarPosts();
}

// ==========================================
// 📋 Listar posts já cadastrados no painel
// ==========================================
function listarPosts() {
  const lista = document.getElementById("listaPosts");
  if (!lista) return;

  const posts = JSON.parse(localStorage.getItem("recursosPosts")) || [];

  if (posts.length === 0) {
    lista.innerHTML = `
      <p style="color:#6c5a6f; font-size:0.9rem;">
        Nenhuma publicação cadastrada neste navegador ainda.
      </p>
    `;
    return;
  }

  lista.innerHTML = "";

  posts.forEach(post => {
    const card = document.createElement("article");
    card.className = "card-admin";

    const imagem = post.imagem && post.imagem.trim() !== ""
      ? post.imagem.trim()
      : "imagens/default.jpg";

    card.innerHTML = `
      <div class="thumb-admin">
        <img src="${imagem}"
             alt="Capa do texto: ${post.titulo}"
             onerror="this.src='imagens/default.jpg'">
      </div>
      <div class="info-admin">
        <h3>${post.titulo}</h3>
        <p class="data-post">${post.data || ""}</p>
        <button type="button" class="btn-excluir" onclick="excluirPost(${post.id})">
          Excluir
        </button>
      </div>
    `;

    lista.appendChild(card);
  });
}

// ==========================================
// 🗑️ Excluir post
// ==========================================
function excluirPost(id) {
  const posts = JSON.parse(localStorage.getItem("recursosPosts")) || [];
  const atualizados = posts.filter(p => p.id !== id);
  localStorage.setItem("recursosPosts", JSON.stringify(atualizados));
  listarPosts();
}

// ==========================================
// Carrega lista se já estiver logada (por segurança)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // se o painel já estiver visível (por algum motivo), lista os posts
  const painel = document.getElementById("painelAdmin");
  if (painel && painel.style.display === "block") {
    listarPosts();
  }
});
