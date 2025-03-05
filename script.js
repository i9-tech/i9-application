const produtoForm = document.getElementById("produto-form");

const codigoInput = document.querySelector("#codigo-input");
const imagemFile = document.querySelector("#imagem-file");
const nomeInput = document.querySelector("#nome-input");
const dataInput = document.querySelector("#data-input");
const valorCompraInput = document.querySelector("#valor-compra-input");
const valorVendaInput = document.querySelector("#valor-venda-input");
const qtdCadastroInput = document.querySelector("#quantidade-input");
const descricaoInput = document.querySelector("#descricao-input");
const modais = document.querySelectorAll(".modal");
console.log("MODAIS ENCONTRADOS: ", modais);
let indexEdicao;
modais.forEach((modal) => (modal.style.display = "none"));

window.addEventListener("load", () => {
  console.log(
    "MODAIS APAGADOS: " +
      modais.forEach((modal) => (modal.style.display = "none"))
  );

  obterParametroProduto();
});

const obterParametroProduto = () => {
  const params = new URLSearchParams(window.location.search);
  const indexProduto = params.get("produto");
  console.log(indexProduto);

  if (!indexProduto) {
    indexEdicao = -1;
    console.log("saindo");
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
  descricaoInput.value = produto.descricao;
};

produtoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  validarDados();
});

const validarDados = () => {
  let status;

  if (
    !codigoInput.value.trim() ||
    !nomeInput.value.trim() ||
    !dataInput.value.trim() ||
    !valorCompraInput.value.trim() ||
    !valorVendaInput.value.trim() ||
    !qtdCadastroInput.value.trim()
  ) {
    status = 400;
    console.log("to aqui no 400");
  } else if (
    valorCompraInput.value <= 0 ||
    valorVendaInput.value <= 0 ||
    qtdCadastroInput.value <= 0
  ) {
    status = 422;
    console.log("to aqui no 422");
  }

  if (status > 399) {
    statusModal(status);
  } else {
    cadastrarProduto();
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
    fetch(`http://localhost:3000/Produto/`, {
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
          statusModal(201);
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
        statusModal(200);
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

const statusModal = (status) => {
  modais.forEach((modal) => (modal.style.display = "block"));
  const tituloModal = document.querySelector("#status-modal");
  const conteudoModal = document.querySelector("#txtstatus-modal");
  let exito = false;

  console.log("status da requisição: ", status);

  if (status > 199 && status < 300) {
    exito = true;

    if (status == 200) {
      tituloModal.innerHTML = "DADOS ATUALIZADOS";
      conteudoModal.innerHTML =
        "Os novos dados do produto foram atualizados com sucesso! Para visualizar as alterações, acesse a tela de estoque";
    }

    if (status == 201) {
      tituloModal.innerHTML = "PRODUTO REGISTRADO";
      conteudoModal.innerHTML =
        "Seu produto foi registrado com sucesso e já se encontra disponível para visualização na tela de estoque";
    }
  } else if (status > 399) {
    tituloModal.innerHTML = "ERRO AO CADASTRAR";
    console.log("to no erro");

    if (status == 400) {
      conteudoModal.innerHTML =
        "Por favor, preencha todos os campos corretamente para continuar";
    }

    if (status == 422) {
      conteudoModal.innerHTML =
        "Os valores numéricos não podem ser iguais ou inferiores a zero. Por favor, digite números válidos";
    }
  }

  setTimeout(function () {
    sumirModal(exito);
  }, 3000);
};

const sumirModal = (exito) => {
  modais.forEach((modal) => (modal.style.display = "none"));

  if (exito === true) {
    limparForms();
    return true;
  }

  return false;
};

// LIMPA O FORMS APÓS REGISTRO DE DADOS
const limparForms = () => {
  console.log("dados registrados!! limpando aqui");
  codigoInput.value = "";
  imagemFile.value = "";
  nomeInput.value = "";
  dataInput.value = "";
  valorCompraInput.value = "";
  valorVendaInput.value = "";
  qtdCadastroInput.value = "";
  descricaoInput.value = "";

  indexEdicao = -1;
  window.history.replaceState(null, "", window.location.pathname);
};
