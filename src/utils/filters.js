export function criarFiltros() {
   clearFiltrosPratos();
   clearFiltrosProdutos();
}

export function getFiltrosPratos() {
  const filtrosPratos = localStorage.getItem("filtrosPratos");
  return filtrosPratos ? JSON.parse(filtrosPratos) : {};
}

export function getFiltrosProdutos() {
  const filtrosProdutos = localStorage.getItem("filtrosProdutos");
  return filtrosProdutos ? JSON.parse(filtrosProdutos) : {};
}

export function setFiltrosPratos(filtro) {
  const filtrosAtuais = getFiltrosPratos();

  const filtrosMesclados = {
    ...filtrosAtuais,
    ...filtro,
  };

  localStorage.setItem("filtrosPratos", JSON.stringify(filtrosMesclados));

  return filtrosMesclados;
}

export function setFiltrosProdutos(filtro) {
  const filtrosAtuais = getFiltrosProdutos();

  const filtrosMesclados = {
    ...filtrosAtuais,
    ...filtro,
  };

  localStorage.setItem("filtrosProdutos", JSON.stringify(filtrosMesclados));

  return filtrosMesclados;
}

export function clearFiltrosPratos() {
  const filtrosPadrao = {
    status: null,
    categoria: "",
    setor: "",
    area: "",
    quantidadePorPagina: 5,
    pagina: 0,
  };

  localStorage.setItem("filtrosPratos", JSON.stringify(filtrosPadrao));
}

export function clearFiltrosProdutos() {
  const filtrosPadrao = {
    status: null,
    categoria: "",
    setor: "",
    area: "",
    quantidadePorPagina: 5,
    pagina: 0,
  };

  localStorage.setItem("filtrosProdutos", JSON.stringify(filtrosPadrao));
}
