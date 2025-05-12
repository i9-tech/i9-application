export function calcularResumoPratos(pratos) {
  const totalPratos = pratos.length;

  const valorTotal = pratos.reduce((acc, p) => {
    const preco = typeof p.preco === "string"
      ? parseFloat(p.preco.replace("R$", "").replace(",", "."))
      : 0;
    return acc + (isNaN(preco) ? 0 : preco);
  }, 0);

  const pratosAtivos = pratos.filter((p) => p.ativo === true).length;
  const pratosInativos = pratos.filter((p) => p.ativo === false).length;

  const categorias = new Set(pratos.map((p) => p.categoria));
  const totalCategorias = categorias.size;

  const setores = new Set(pratos.map((p) => p.setor));
  const totalSetores = setores.size;

  return {
    totalPratos,
    pratosAtivos,
    pratosInativos,
    totalCategorias,
    totalSetores,
    valorTotal,
  };
}
