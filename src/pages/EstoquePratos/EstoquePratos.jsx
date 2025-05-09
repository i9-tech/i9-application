import "./EstoquePratos.css";
import React, { useState, useRef } from "react";
import { pratosMock } from "./DadosPratos/pratosMock";
import FiltrosPratos from "../../components/EstoquePratos/FiltrosPratos/FiltrosPratos";
import { ResumoPratos } from "../../components/EstoquePratos/ResumoPratos/ResumoPratos";
import TabelaPratos from "../../components/EstoquePratos/TabelaPratos/TabelaPratos";
import { calcularResumoPratos } from "./DadosPratos/utilsPratos";
import LayoutTela from "../../components/LayoutTela/LayoutTela";

export function EstoquePratos() {
  const [pratos, setPratos] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState(null);
  const resumo = calcularResumoPratos(pratos);

  const gerarNovoId = () => {
    if (pratos.length === 0) return "0001";
    const ultimoId = pratos[pratos.length - 1].id;
    const numero = parseInt(ultimoId, 10) + 1;
    return String(numero).padStart(4, "0");
  };

  const handleAddPrato = () => {
    // Seleciona um prato aleatório do mock
    const aleatorio = pratosMock[Math.floor(Math.random() * pratosMock.length)];
  
    // Cria um novo prato com base no prato aleatório
    const novoPrato = {
      ...aleatorio, // Copia todas as propriedades do prato aleatório
      id: gerarNovoId(), // Gera um novo ID único para o prato
      preco: aleatorio.preco, // Mantém o preço do prato original
      registro: new Date().toLocaleDateString("pt-BR"), // Adiciona a data de registro atual
      // Se necessário, outras propriedades podem ser ajustadas aqui
    };
  
    // Atualiza o estado com o novo prato
    setPratos((prev) => [...prev, novoPrato]);
  };

  return (
    <>
    <LayoutTela titulo="Estoque de Pratos" adicional={`${pratos.length} itens cadastrados`}>

      <div className="estoque">
        <FiltrosPratos
          onAdicionarPrato={handleAddPrato}
          filtroStatus={filtroStatus}
          setFiltroStatus={setFiltroStatus}
        />
        <ResumoPratos {...resumo} />
        <TabelaPratos
          pratos={pratos}
          setPratos={setPratos}
          filtroStatus={filtroStatus}
        />
      </div>
    </LayoutTela>

    </>
  );
}

export default EstoquePratos;
