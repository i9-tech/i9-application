import "./EstoquePratos.css";
import React, { useEffect, useState } from "react";
import FiltrosPratos from "../../components/EstoquePratos/FiltrosPratos/FiltrosPratos";
import { ResumoPratos } from "../../components/EstoquePratos/ResumoPratos/ResumoPratos";
import TabelaPratos from "../../components/EstoquePratos/TabelaPratos/TabelaPratos";
import { calcularResumoPratos } from "./DadosPratos/utilsPratos";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import api from "../../provider/api";

export function EstoquePratos() {
  const [filtros, setFiltros] = useState({
    status: null,
    categoria: "",
    setor: "",
  });
  
  const [pratos, setPratos] = useState([{}]);
  const [resumo, setResumo] = useState([{}]);

  useEffect(() => {
    buscarPratos();
  }, [pratos]);

  const buscarPratos = () => {
    api
      .get("/pratos")
      .then((res) => {
        setPratos(res.data);
        setResumo(calcularResumoPratos(res.data));
      })
      .catch((err) => {
        console.error("Erro ao buscar pratos:", err);
      });
  };

  return (
    <LayoutTela 
      titulo="Estoque de Pratos" 
      adicional={`${pratos.length} itens cadastrados`}
    >
      <div className="estoque">
        <FiltrosPratos 
          filtros={filtros}
          setFiltros={setFiltros} 
        />
        <ResumoPratos {...resumo} />
        <TabelaPratos 
          pratos={pratos} 
          filtros={filtros} 
          buscarPratos={buscarPratos}
        />
      </div>
    </LayoutTela>
  );
}


export default EstoquePratos;
