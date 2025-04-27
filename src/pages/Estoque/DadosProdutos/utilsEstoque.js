// Função que calcula vários resumos importantes do estoque
export function calcularResumoEstoque(produtos) {

  // reduce está somando o valor de cada produto (preço de compra * quantidade em estoque).
  // Ele tira o "R$" do preço e troca "," por "." para transformar em número corretamente.
  // Começa de 0 (acc inicial).

  // Valor total do estoque = (preço de compra) * (quantidade em estoque)
  // Converte o valor de string para número usando parseFloat e substitui vírgula por ponto.
  const valorEstoque = produtos.reduce((acc, p) => {
    const preco = parseFloat(p.compra.replace("R$", "").replace(",", "."));
    return acc + preco * p.estoque;
  }, 0);

  // Lucro previsto = (preço de venda - preço de compra) * (quantidade em estoque)
  // Também converte as strings de preços para número
  const lucroPrevisto = produtos.reduce((acc, p) => {
    const compra = parseFloat(p.compra.replace("R$", "").replace(",", "."));
    const venda = parseFloat(p.venda.replace("R$", "").replace(",", "."));
    return acc + (venda - compra) * p.estoque;
  }, 0);

  // Quantidade de produtos que estão acabando (estoque baixo <= 10 unidades, mas ainda não zerados)
  const estoqueBaixo = produtos.filter(
    (p) => p.estoque <= 10 && p.estoque > 0
  ).length;

  // Quantidade de produtos que estão esgotados (estoque == 0)
  const semEstoque = produtos.filter((p) => p.estoque === 0).length;

  // Quantidade de produtos que vencem em até 30 dias (considerando a data atual)
  const hoje = new Date();
  const pertoValidade = produtos.filter((p) => {
    const [dia, mes, ano] = p.validade.split("/"); // separa dia, mês e ano
    const dataValidade = new Date(`${ano}-${mes}-${dia}`); // cria um objeto Date com a data de validade
    const diffDias = (dataValidade - hoje) / (1000 * 60 * 60 * 24); // calcula a diferença em dias
    return diffDias <= 30 && p.estoque > 0; // verifica se está perto da validade e ainda tem estoque
  }).length;

  // Quantidade total de produtos que ainda têm estoque disponível (> 0)
  const totalEmEstoque = produtos.filter((p) => p.estoque > 0).length;

  return {
    valorEstoque,
    lucroPrevisto,
    estoqueBaixo,
    semEstoque,
    pertoValidade,
    totalEmEstoque,
  };
}
