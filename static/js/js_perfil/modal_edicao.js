document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal-edicao");
  const btnEditar = document.getElementById("editarPerfilBtn");
  const btnSalvar = document.getElementById("salvar-edicao");
  const btnCancelar = document.getElementById("cancelar-edicao");

  const campos = {
    nome: document.getElementById("edit-nome"),
    funcao: document.getElementById("edit-funcao"),
    pais: document.getElementById("edit-pais"),
    cidade: document.getElementById("edit-cidade"),
    sobre_mim: document.getElementById("edit-sobre"),
    telefone: document.getElementById("edit-telefone"),
    linkedin: document.getElementById("edit-linkedin"),
    email: document.getElementById("edit-email"),
    github: document.getElementById("edit-github"),
  };

  const elementos = {
    nome: document.querySelector(".nome"),
    funcao: document.querySelector(".funcao"),
    pais: document.querySelector(".pais"),
    cidade: document.querySelector(".cidade"),
    sobre_mim: document.querySelector(".sobre_mim"),
    telefone: document.querySelector(".telefone"),
    linkedin: document.querySelector(".linkedin"),
    email: document.querySelector(".email"),
    github: document.querySelector(".github"),
  };

  btnEditar.addEventListener("click", () => {
    for (let campo in campos) {
      campos[campo].value = elementos[campo]?.textContent?.trim() || "";
    }
    modal.style.display = "flex";
  });

  btnCancelar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  btnSalvar.addEventListener("click", async () => {
    const id = localStorage.getItem("idUsuario");
    if (!id) {
      alert("Usuário não logado!");
      return;
    }

    const dados = {};
    for (let campo in campos) {
      dados[campo] = campos[campo].value;
    }

    try {
      const resp = await fetch(`https://microidealizador.azurewebsites.net/perfil/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      const json = await resp.json();
      if (!resp.ok) throw new Error(json.detail || "Erro ao salvar alterações");

      alert(json.mensagem || "Perfil atualizado com sucesso!");
      modal.style.display = "none";
      location.reload();
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor.");
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});
