let usuarioAtual = 1;
let produtosArmazenados = {
  nomeProduto: "pastel",
  valorUnitario: 20.0,
  quantidade: 100,
  categoria: "Lanche",
  setorAlimenticio: "Pastelaria",
  descricao: "descricao_ccea61fe1443",
  dataVencimento: "2025-02-28",
  dtRegistro: "2025-02-28",
  quantidadeMin: 15,
  quantidadeMax: 100,
  idRegistro: 1,
};
sessionStorage.USUARIO = usuarioAtual;
localStorage.PRODUTOS = produtosArmazenados;

// private int id;
// private String nomeProduto;
// private double valorUnitario;
// private int quantidade;
// private String categoria;
// private String setorAlimenticio;
// private String descricao;
// private LocalDate dataVencimento;
// private LocalDate dtRegistro;
// private int quantidadeMin;
// private int quantidadeMax;
// private int idRegistro;

let id;
let nomeProduto;
let valorUnitario;
let quantidade;
let categoria;
let setorAlimenticio;
let descricao;
let dataVencimento;
let dtRegistro;
let quantidadeMin;
let quantidadeMax;
let idRegistro = usuarioAtual;

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
  spanNome.innerText = produto ? produto.codigo : nome;
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
};

const cancelarCadastro = () => {
  const confirmacao = confirm("Deseja cancelar o cadastro?");

  if (confirmacao) {
    window.location = "./estoque.html";
  }
};
