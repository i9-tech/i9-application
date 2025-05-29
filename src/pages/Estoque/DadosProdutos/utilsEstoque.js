// Função que calcula vários resumos importantes do estoque
export function calcularResumoEstoque(produtos) {
  // Valor total do estoque = (valor de compra) * (quantidade em estoque)
  const valorEstoque = produtos.reduce((acc, p) => {
    return acc + p.valorCompra * p.quantidade;
  }, 0);

  // Valor total de venda = (valor de venda) * (quantidade em estoque)
  const valorVenda = produtos.reduce((acc, p) => {
    return acc + p.valorUnitario * p.quantidade;
  }, 0);

  // Lucro previsto = (valor de venda - valor de compra) * quantidade
  const lucroLiquido = produtos.reduce((acc, p) => {
    return acc + (p.valorUnitario - p.valorCompra) * p.quantidade;
  }, 0);

  // Quantidade de produtos com estoque baixo (<= 10 e > 0)
  const estoqueBaixo = produtos.filter(
    (p) => p.quantidade < p.quantidadeMin && p.quantidade > 0
  ).length;

  // Quantidade de produtos esgotados (estoque == 0)
  const semEstoque = produtos.filter((p) => p.quantidade === 0).length;

  // Produtos com validade em até 30 dias (se o campo "validade" existir)
  const hoje = new Date();
  const pertoValidade = produtos.filter((p) => {
    if (!p.validade) return false; // se não existir, ignora
    const [ano, mes, dia] = p.validade.split("-"); // ex: "2025-05-30"
    const dataValidade = new Date(`${ano}-${mes}-${dia}`);
    const diffDias = (dataValidade - hoje) / (1000 * 60 * 60 * 24);
    return diffDias <= 30 && p.quantidade > 0;
  }).length;

  // Total de produtos com estoque > 0
  const totalEmEstoque = produtos.filter((p) => p.quantidade > 0).length;

  return {
    valorEstoque,
    valorVenda,
    lucroLiquido,
    estoqueBaixo,
    semEstoque,
    pertoValidade,
    totalEmEstoque,
  };
}
