// Função que calcula KPIs relevantes para o cardápio
export function calcularResumoPratos(pratos) {
    // Total de pratos cadastrados
    const totalPratos = pratos.length;

    const valorTotal = pratos.reduce((acc, p) => {
        // Verificando se p.compra existe e está no formato correto
        const preco = p.preco ? parseFloat(p.preco.replace("R$", "").replace(",", ".")) : 0;
        return acc + preco;
    }, 0);
  
    // Total de pratos ativos
    const pratosAtivos = pratos.filter((p) => p.status === "ativo").length;
  
    // Total de pratos inativos
    const pratosInativos = pratos.filter((p) => p.status === "inativo").length;
  
    // Total de categorias distintas
    const categorias = new Set(pratos.map((p) => p.categoria));
    const totalCategorias = categorias.size;
  
    // Preços de venda convertidos para número
    const precosVenda = pratos
      .map((p) => parseFloat(p.venda.replace("R$", "").replace(",", ".")))
      .filter((v) => !isNaN(v));
  
    const precoMedio = precosVenda.reduce((acc, v) => acc + v, 0) / precosVenda.length;
    const precoMin = Math.min(...precosVenda);
    const precoMax = Math.max(...precosVenda);
  
    return {
      totalPratos,
      pratosAtivos,
      pratosInativos,
      totalCategorias,
      precoMedio,
      precoMin,
      precoMax,
      valorTotal
    };
  }
  