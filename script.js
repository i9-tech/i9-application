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
let indexEdicao;

window.addEventListener("load", () => {
  obterParametroProduto();
  console.log("Oi")
});

const obterParametroProduto = () => {
  const params = new URLSearchParams(window.location.search);
  const indexProduto = params.get("produto");
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  console.log(indexProduto, produtos)

  if (!indexProduto) {
    indexEdicao = -1;
    console.log("saindo")
    return;
  }

  // indice vem como string pela url, preciso converter pra numero
  indexEdicao = Number(indexProduto);

  produtos.forEach((p, index) => {
    if (index === indexEdicao) {
      editarProduto(p);
    }
  })
}

const editarProduto = (produto) => {
  codigoInput.value = produto.codigo;
  imagemFile.value = produto.imagem;
  nomeInput.value = produto.nome;
  dataInput.value = produto.validade;
  valorCompraInput.value = produto.compra;
  valorVendaInput.value = produto.venda;
  qtdCadastroInput.value = produto.quantidadeCadastro;
  descricaoCheckbox.value = produto.descricao;

  console.log(produto)
}


produtoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  validarDados();
});

const validarDados = () => {
  if (
    !codigoInput.value.trim() ||
    !nomeInput.value.trim() ||
    !dataInput.value.trim() ||
    !valorCompraInput.value.trim() ||
    !valorVendaInput.value.trim() ||
    !qtdCadastroInput.value.trim()
  ) {
    alert("campos em branco!");
    return false;
  }

  if (
    valorCompraInput.value <= 0 ||
    valorVendaInput.value <= 0 ||
    qtdCadastroInput.value <= 0
  ) {
    alert("valores numéricos precisam ser maiores que 0!");
    return false;
  }

  cadastrarProduto();
};

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
// * a fazer *

const cadastrarProduto = () => {
  const produto = {
    codigo: codigoInput.value,
    imagem: imagemFile.value,
    nome: nomeInput.value,
    validade: dataInput.value,
    compra: Number(valorCompraInput.value),
    venda: Number(valorVendaInput.value),
    quantidadeCadastro: Number(qtdCadastroInput.value),
    descricao: descricaoInput.value,
    dtHora: new Date().toLocaleString(),
  };

  console.log("cadastrarProduto: ", produto);

  tratarDados(produto);
};

const tratarDados = (dadosProduto) => {
  // TRATAR DATA
// * a fazer *

  // ADICIONAR DATA E HORA DE REGISTRO
// * a fazer *

  // ADICIONAR USUÁRIO QUE REGISTROU
// * a fazer *

  // APÓS FORMATAR OS DADOS, ELES FICARÃO ARMAZENADOS AQUI
  const dadosFormatados = dadosProduto;

  console.log("dadosFormatados: ", dadosFormatados);
  salvarProduto(dadosFormatados);
};


const salvarProduto = (dadosFormatados) => {

  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  console.log("DADOS FORMATADOS: " + dadosFormatados);

  if (indexEdicao == -1) {
  const jsonProduto = {
    codigo: dadosFormatados.codigo,
    imagem: dadosFormatados.imagem,
    nome: dadosFormatados.nome,
    validade: dadosFormatados.validade,
    compra: dadosFormatados.compra,
    venda: dadosFormatados.venda,
    quantidadeCadastro: dadosFormatados.quantidadeCadastro,
    descricao: dadosFormatados.descricao,
    dtRegistro: dadosFormatados.dtHora,
  };

  // precisa primeiro recuperar o json para adicionar o iten, senão ele vai ser sobrescrito toda vez
  // const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  produtos.push(jsonProduto);
  console.log("PRODUTOS: ", produtos);

  localStorage.setItem("produtos", JSON.stringify(produtos));
  limparForms();
  return;
  }

  if(indexEdicao !== -1) {
    console.log("INDEX: " + indexEdicao)
    console.log(produtos[indexEdicao])

    const edicao = {
      codigo: dadosFormatados.codigo,
      imagem: dadosFormatados.imagem,
      nome: dadosFormatados.nome,
      validade: dadosFormatados.validade,
      compra: dadosFormatados.compra,
      venda: dadosFormatados.venda,
      quantidadeCadastro: dadosFormatados.quantidadeCadastro,
      descricao: dadosFormatados.descricao,
      dtRegistro: dadosFormatados.dtHora,

    };

    produtos[indexEdicao] = edicao;
    console.log("edição concluida!");
    localStorage.setItem("produtos", JSON.stringify(produtos));
    limparForms();
    return;
  }


};

const cancelarCadastro = () => {
  event.preventDefault();

  if(
    !codigoInput.value.trim() &&
    !nomeInput.value.trim() &&
    !dataInput.value.trim() &&
    !valorCompraInput.value.trim() &&
    !valorVendaInput.value.trim() &&
    !qtdCadastroInput.value.trim()
  ) {
    window.location = "./estoque.html";
    return;
  }

  const confirmacao = confirm("Deseja cancelar o cadastro?");

  if (confirmacao) {
    window.location = "./estoque.html";
  }
};

const limparForms = () => {
  alert("dados registrados!")
  codigoInput.value = '';
  imagemFile.value = '';
  nomeInput.value = '';
  dataInput.value = '';
  valorCompraInput.value = '';
  valorVendaInput.value = '';
  qtdCadastroInput.value = '';
  descricaoCheckbox.value = '';
  indexEdicao = -1;
  window.history.replaceState(null, "", window.location.pathname);

}

