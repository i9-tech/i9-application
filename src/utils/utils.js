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

export const buscarImagensUnsplash = async (query) => {
  const clientId = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${clientId}`;

  const resposta = await fetch(url);
  const data = await resposta.json();

  return data.results.map((img) => ({
    url: img.urls.small,
    nome: img.alt_description || "Imagem",
  }));
};
