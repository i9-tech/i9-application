export function calcularResumoPratos(pratos) {
  const totalPratos = pratos.length;

  const valorTotal = pratos.reduce((acc, p) => {
    const preco = typeof p.valorVenda === "string"
      ? parseFloat(p.valorVenda.replace("R$", "").replace(",", "."))
      : p.valorVenda || 0;
    return acc + (isNaN(preco) ? 0 : preco);
  }, 0);

  const pratosAtivos = pratos.filter((p) => p.disponivel === true).length;
  const pratosInativos = pratos.filter((p) => p.disponivel === false).length;

  const categoriaIds = new Set(pratos.map((p) => p.categoria?.id));
  const totalCategorias = categoriaIds.size;

  const setorIds = new Set(pratos.map((p) => p.setor?.id));
  const totalSetores = setorIds.size;

  return {
    totalPratos,
    pratosAtivos,
    pratosInativos,
    totalCategorias,
    totalSetores,
    valorTotal,
  };
}