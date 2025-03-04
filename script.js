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
  console.log(indexProduto)

  if (!indexProduto) {
    indexEdicao = -1;
    console.log("saindo")
    return;
  }

  // por padrão os parametros vem como string, preciso deixar como numero
  indexEdicao = Number(indexProduto);

  fetch(`http://localhost:3000/Produto/${indexProduto}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resposta) => {
      if (resposta.ok) {
        return resposta.json();
      } else {
        throw new Error("Houve um erro ao tentar trazer o resultado");
      }
    })
    .then((produto) => {
      console.log("Produto encontrado: ", produto);
      editarProduto(produto);
    })
    .catch((erro) => {
      console.error(`#ERRO: ${erro}`);
    });
};

const editarProduto = (produto) => {
  codigoInput.value = produto.codigo;
  imagemFile.value = produto.imagem;
  nomeInput.value = produto.nome;
  dataInput.value = produto.validade;
  valorCompraInput.value = produto.compra;
  valorVendaInput.value = produto.venda;
  qtdCadastroInput.value = produto.quantidadeCadastro;

  if (produto.descricao.length > 0) {
    descricaoInput.value = produto.descricao;
    descricaoCheckbox.checked = true;
    descricaoInput.style.display = "flex";
  }
};

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
    descricaoInput.value = "";
    descricaoInput.style.display = "none";
  }
};

// FORMATAR DATA CONFORME O USUÁRIO DIGITA
// * a fazer *

// MAPEANDO OS DADOS
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

// FAZENDO O TRATAMENTO DESSES DADOS
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


// SALVANDO OU EDITANDO O PRODUTO
const salvarProduto = (dadosFormatados) => {
  console.log("DADOS FORMATADOS: " + dadosFormatados);

  // CADASTRO
  if (indexEdicao == -1) {
    fetch(`http://localhost:3000/Produto/${indexEdicao}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codigo: dadosFormatados.codigo,
        imagem: dadosFormatados.imagem,
        nome: dadosFormatados.nome,
        validade: dadosFormatados.validade,
        compra: dadosFormatados.compra,
        venda: dadosFormatados.venda,
        quantidadeCadastro: dadosFormatados.quantidadeCadastro,
        descricao: dadosFormatados.descricao,
        dtRegistro: dadosFormatados.dtHora,
      }),
    })
      .then(function (resposta) {
        console.log("ESTOU NO THEN DO function()!");

        if (resposta.ok) {
          console.log(resposta);
          alert("produto salvo com sucesso!");
          limparForms();
          return;
        } else {
          console.log(
            "Houve um erro ao tentar realizar o cadastro de produto!"
          );
          alert("Produto não registrado!");

          resposta.text().then((texto) => {
            console.error(`#ERRO: ${texto}`);
          });
        }
      })
      .catch(function (erro) {
        console.log(erro);
      });

    return;
  }

  if (indexEdicao !== -1) {
    // ATUALIZAÇÃO
    fetch(`http://localhost:3000/Produto/${indexEdicao}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codigo: dadosFormatados.codigo,
        imagem: dadosFormatados.imagem,
        nome: dadosFormatados.nome,
        validade: dadosFormatados.validade,
        compra: dadosFormatados.compra,
        venda: dadosFormatados.venda,
        quantidadeCadastro: dadosFormatados.quantidadeCadastro,
        descricao: dadosFormatados.descricao,
        dtRegistro: dadosFormatados.dtHora,
      }),
    })
      .then((resposta) => {
        if (resposta.ok) {
          return resposta.json();
        } else {
          throw new Error("Houve um erro ao atualizar o produto!");
        }
      })
      .then((data) => {
        alert("Produto atualizado com sucesso!");
        limparForms();
      })
      .catch((erro) => {
        console.log(`#ERRO: ${erro.message}`);
        alert(erro.message);
      });
    return;
  }
};

// CANCELAR CADASTRO/ATUALIZAÇÃO
const cancelarCadastro = () => {
  event.preventDefault();

  if (
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


// LIMPA O FORMS APÓS REGISTRO DE DADOS
const limparForms = () => {
  console.log("dados registrados!! limpando aqui")
  codigoInput.value = "";
  imagemFile.value = "";
  nomeInput.value = "";
  dataInput.value = "";
  valorCompraInput.value = "";
  valorVendaInput.value = "";
  qtdCadastroInput.value = "";
  descricaoCheckbox.value = "";
  descricaoCheckbox.checked = false;
  descricaoInput.style.display = "none";

  indexEdicao = -1;
  window.history.replaceState(null, "", window.location.pathname);
};
