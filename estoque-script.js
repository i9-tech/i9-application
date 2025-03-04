const abrirFormulario = () => {
  window.location = "./forms.html";
};

window.addEventListener("load", () => {
  getProdutos();
});

const produtosList = document.querySelector("#produtos-list");
let indexEdicao;

getProdutos = () => {
  fetch(`http://localhost:3000/Produto`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.ok) {
        return resposta.json();
      } else {
        throw new Error("Houve um erro ao tentar trazer o resultado");
      }
    })
    .then(function (data) {
      if (data.length === 0) {
        console.warn("Nenhum resultado encontrado");
        return;
      }
      console.log(data);
      data.forEach((produto) => {
        console.log(produto);
        const newItem = document.createElement("li");
        mapearProdutos(newItem, produto);
      });
    })
    .catch(function (erro) {
      console.error(`#ERRO: ${erro}`);
    });
};

const mapearProdutos = (listaProdutos, produto) => {
  const codigo = produto.codigo;
  const imagem = produto.imagem;
  const nome = produto.nome;
  const validade = produto.validade;
  const compra = produto.compra;
  const venda = produto.venda;
  const quantidadeCadastro = produto.quantidadeCadastro;
  const descricao = produto.descricao;

  listaProdutos.classList.add("produto-lista-item");

  const spanCodigo = document.createElement("span");
  const spanImagem = document.createElement("span");
  const spanNome = document.createElement("span");
  const spanValidade = document.createElement("span");
  const spanCompra = document.createElement("span");
  const spanVenda = document.createElement("span");
  const spanQtdCadastro = document.createElement("span");
  const spanDescricao = document.createElement("span");

  spanCodigo.classList.add("codigo-produto");

  const buttonEdit = document.createElement("button");
  const buttonDelete = document.createElement("button");

  spanCodigo.innerText = produto ? produto.codigo : codigo;
  spanImagem.innerText = produto ? produto.imagem : imagem;
  spanNome.innerText = produto ? produto.nome : nome;
  spanValidade.innerText = produto ? produto.validade : validade;
  spanCompra.innerText = produto ? produto.compra : compra;
  spanVenda.innerText = produto ? produto.venda : venda;
  spanQtdCadastro.innerText = produto
    ? produto.quantidadeCadastro
    : quantidadeCadastro;
  spanDescricao.innerText = produto ? produto.descricao : descricao;

  buttonEdit.innerHTML = "✏️";
  buttonDelete.innerHTML = "🗑️";

  // buttonEdit.setAttribute("data-index", index);

  // fazendo a edição de uma tarefa
  buttonEdit.addEventListener("click", () => {
    window.location.href = `./forms.html?produto=${produto.id}`;
  });

  // fazendo a exclusão de uma tarefa
  buttonDelete.addEventListener("click", () => {
    const confirmacao = confirm("Deseja confirmar a exclusão?");

    if (confirmacao) {
      fetch(`http://localhost:3000/Produto/${produto.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (resposta) {
          if (resposta.ok) {
            window.alert("Produto deletado com sucesso!");
          } else if (resposta.status == 404) {
            window.alert("Deu 404!");
          } else {
            throw (
              "Houve um erro ao tentar realizar a exclusão! Código da resposta: " +
              resposta.status
            );
          }
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        });

      produtosList.removeChild(listaProdutos);
      // alert("Produto excluído com sucesso!");
    }
  });

  listaProdutos.appendChild(spanCodigo);
  listaProdutos.appendChild(spanImagem);
  listaProdutos.appendChild(spanNome);
  listaProdutos.appendChild(spanValidade);
  listaProdutos.appendChild(spanCompra);
  listaProdutos.appendChild(spanVenda);
  listaProdutos.appendChild(spanQtdCadastro);
  listaProdutos.appendChild(spanDescricao);
  listaProdutos.appendChild(buttonEdit);
  listaProdutos.appendChild(buttonDelete);

  produtosList.appendChild(listaProdutos);
};

const deletarTarefa = (tarefaSelecionada) => {
  alert("deletando tarefa" + tarefaSelecionada);
};
