const abrirFormulario = () => {
  window.location = "./forms.html";
};

window.addEventListener("load", () => {
  getProdutos();
});

const produtosList = document.querySelector("#produtos-list");

getProdutos = () => {
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  produtos.forEach((produto) => {
    const newItem = document.createElement("li");
    mapearProdutos(newItem, produto);
  });
};

const mapearProdutos = (listaProdutos, produto) => {
  const codigo = produto.codigo;
  const imagem = produto.imagem;
  const nome = produto.nome; 
  const validade = produto.validade; 
  const compra = produto.vompra; 
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
};
