const produtoForm = document.getElementById("produto-form");
const produtosList = document.querySelector("#produtos-list");

const codigoInput = document.querySelector("#codigo-input");
const imagemFile = document.querySelector("#imagem-file");
const nomeInput = document.querySelector("#nome-input");
const dataInput = document.querySelector("#data-input");
const valorCompraInput = document.querySelector("#valor-compra-input");
const valorVendaInput = document.querySelector("#valor-venda-input");
const qtdCadastroInput = document.querySelector("#quantidade-input");
const descricaoCheckbox = document.querySelector("#descricao-checkbox");
const descricaoInput = document.querySelector("#descricao-input");

produtoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const listaProdutos = document.createElement("li");
  cadastrarProduto(listaProdutos);
});

// ATIVAR E DESATIVAR O INPUT DE DESCRIÇÃO DE PRODUTO
const adicionarDescricao = () => {
  const addDesc = descricaoCheckbox.checked ? true : false;

  if (addDesc) {
    descricaoInput.style.display = "flex";
  } else {
    descricaoInput.style.display = "none";
  }
};

// FORMATAR DATA CONFORME O USUÁRIO DIGITA

const cadastrarProduto = (listaProdutos, produto) => {
  const codigo = codigoInput.value;
  const imagem = imagemFile.value;
  const nome = nomeInput.value;
  const validade = dataInput.value;
  const compra = Number(valorCompraInput.value);
  const venda = Number(valorVendaInput.value);
  const quantidadeCadastro = Number(qtdCadastroInput.value);
  const descricao = descricaoInput.value;

  listaProdutos.classList.add("produto-lista-item");

  const spanCodigo = document.createElement("span");
  const spanImagem = document.createElement("span");
  const spanNome = document.createElement("span");
  const spanValidade = document.createElement("span");
  const spanCompra = document.createElement("span");
  const spanVenda = document.createElement("span");
  const spanQtdCadastro = document.createElement("span");
  const spanDescricao = document.createElement("span");

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

  listaProdutos.appendChild(spanCodigo);
  listaProdutos.appendChild(spanImagem);
  listaProdutos.appendChild(spanNome);
  listaProdutos.appendChild(spanValidade);
  listaProdutos.appendChild(spanCompra);
  listaProdutos.appendChild(spanVenda);
  listaProdutos.appendChild(spanQtdCadastro);
  listaProdutos.appendChild(spanDescricao);

  produtosList.appendChild(listaProdutos);

  tratarDados(listaProdutos);
};

const tratarDados = (listaProdutos) => {
  // TRATAR DATA

  // ADICIONAR DATA E HORA DE REGISTRO

  // ADICIONAR USUÁRIO QUE REGISTROU

  salvarProduto();
};

window.addEventListener("load", () => {
  getProdutos();
});

getProdutos = () => { 
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  produtos.forEach((produto) => {
    const newItem = document.createElement("li");
    cadastrarProduto(newItem, produto);
  });
};

const salvarProduto = () => {
  const produto = [...produtosList.children];

  const mapearInfosProduto = produto.map((li) => {
    const codigoProduto = li.querySelector("span:nth-child(1)").textContent;
    const imagemProduto = li.querySelector("span:nth-child(2)").textContent;
    const nomeProduto = li.querySelector("span:nth-child(3)").textContent;
    const dtValidadePoduto = li.querySelector("span:nth-child(4)").textContent;
    const vlrCompra = li.querySelector("span:nth-child(5)").textContent;
    const vlrVenda = li.querySelector("span:nth-child(6)").textContent;
    const qtdCadastro = li.querySelector("span:nth-child(7)").textContent;
    const descricaoProduto = li.querySelector("span:nth-child(8)").textContent;

    const jsonProduto = {
      codigo: codigoProduto,
      imagem: imagemProduto,
      nome: nomeProduto,
      validade: dtValidadePoduto,
      compra: vlrCompra,
      venda: vlrVenda,
      quantidadeCadastro: qtdCadastro,
      descricao: descricaoProduto,
    };

    return jsonProduto;
  });

  console.log(mapearInfosProduto);

  localStorage.setItem("produtos", JSON.stringify(mapearInfosProduto));
};

const cancelarCadastro = () => {
  const confirmacao = confirm("Deseja cancelar o cadastro?");

  if (confirmacao) {
    window.location = "./estoque.html";
  }
};
