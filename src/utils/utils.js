export const agruparPorItemRepetido = (itens) => {
  const agrupados = {};

  itens.forEach((item) => {
    const isProduto = !!item.produto;
    const entidade = isProduto ? item.produto : item.prato;
    const chave = `${isProduto ? "produto" : "prato"}-${entidade.codigo}`;

    if (!agrupados[chave]) {
      agrupados[chave] = {
        ...item,
        quantidade: 1,
      };
    } else {
      agrupados[chave].quantidade += 1
    }
  });

  return Object.values(agrupados);
};


export const formatarMoeda = (valor) => {
    const numero = Number(valor);
    if (isNaN(numero)) return "R$ 0,00";
    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };