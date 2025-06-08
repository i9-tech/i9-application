export const agruparPorItemRepetido = (itens) => {
  const agrupados = {};

  itens.forEach((item) => {
    const isProduto = !!item.produto;
    const entidade = isProduto ? item.produto : item.prato;
    const chave = isProduto ? `produto-${entidade.codigo}` : `prato-${entidade.id}`;

    if (!agrupados[chave]) {
      agrupados[chave] = {
        ...item,
        quantidade: 1,
      };
    } else {
      agrupados[chave].quantidade += 1;
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

export const corrigirDataISO = (dataISO) => {
  const [ano, mes, dia] = dataISO.split("-");
  return new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR");
};

export const getSaudacao = () => {
  const hora = new Date().getHours();
  if (hora < 12) return "Bom dia";
  if (hora < 18) return "Boa tarde";
  return "Boa noite";
};
