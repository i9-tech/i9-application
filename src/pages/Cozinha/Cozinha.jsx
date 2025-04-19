import "./Cozinha.css";

import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Comanda from "./ComandaFinal/Comanda/Comanda";

export function Cozinha() {
  const [pedidos, setPedidos] = useState([
    {
      numeroPedido: 250,
      dataHora: "19 Mar 2025, 16:54",
      itens: [
        {
          titulo: "1x Lanche Natural",
          descricao: "Pão, Alface, Tomate e Molho.",
          observacao: "SEM TOMATE",
        },
        {
          titulo: "1x Lanche Natural",
          descricao: "Pão, Alface, Tomate e Molho.",
        },
        {
          titulo: "1x Chicken Jr.",
          descricao: "Pão de hambúrguer, frango empanado, queijo, presunto...",
        },
        {
          titulo: "1x Lanche Natural",
          descricao: "Pão, Alface, Tomate e Molho.",
        },
      ],
      qtdItens: 4,
    },
    {
      numeroPedido: 251,
      dataHora: "20 Mar 2025, 16:58",
      itens: [
        {
          titulo: "1x Lanche Natural",
          descricao: "Pão, Alface, Tomate e Molho.",
          observacao: "SEM TOMATE",
        },
        {
          titulo: "1x Lanche Natural",
          descricao: "Pão, Alface, Tomate e Molho.",
        },
      ],
      qtdItens: 2,
    },
  ]);

  return (
    <>
      <Navbar />
      <section className="cozinha">
        <header className="titulo">
          <h1>Preparo de Pedidos</h1>
          <p>
            {pedidos.length === 1
              ? pedidos.length + " pedido"
              : pedidos.length + " pedidos"}
          </p>
        </header>

        <article className="tela-comandas">
          {pedidos.map((pedido, index) => (
            <Comanda key={index} pedido={pedido} index={index} />
          ))}
        </article>
      </section>
    </>
  );
}
