import { useState, useEffect, useRef } from "react";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import "./Cozinha.css";
import LancheNatural from "../../assets/sandwich.png";
import ChickenJr from "../../assets/ChickenJr.png";

export default function TesteGrid() {
  const [pedidos, setPedidos] = useState([
    {
      numeroPedido: 250,
      cliente: "Jhonattan",
      mesa: 5,
      pagamento: "Dinheiro",
      dataHora: "19 Mar 2025, 16:54",
      itens: [
        {
          imagem: LancheNatural,
          titulo: "1x Lanche Natural",
          descricao: "Pão, Alface, Tomate e Molho.",
          observacao: "SEM TOMATE",
        },
        {
          imagem: LancheNatural,
          titulo: "1x Lanche Natural",
          descricao: "Pão, Alface, Tomate e Molho.",
        },
        {
          imagem: ChickenJr,
          titulo: "1x Chicken Jr.",
          descricao: "Pão de hambúrguer, frango empanado, queijo, presunto...",
        },
        {
          imagem: LancheNatural,
          titulo: "1x Lanche Natural",
          descricao: "Pão, Alface, Tomate e Molho.",
        },
      ],
      qtdItens: 4,
    },
    {
      numeroPedido: 251,
      cliente: "Betina",
      mesa: 13,
      pagamento: "Cartão",
      dataHora: "20 Mar 2025, 16:58",
      itens: [
        {
          imagem: LancheNatural,
          titulo: "1x Lanche Natural",
          descricao: "Pão, Alface, Tomate e Molho.",
          observacao: "SEM TOMATE",
        },
        {
          imagem: LancheNatural,
          titulo: "1x Lanche Natural",
          descricao: "Pão, Alface, Tomate e Molho.",
        },
      ],
      qtdItens: 2,
    },
    {
      numeroPedido: 252,
      cliente: "Carlos",
      mesa: 2,
      pagamento: "Pix",
      dataHora: "20 Mar 2025, 17:10",
      itens: [
        {
          imagem: ChickenJr,
          titulo: "1x Chicken Jr.",
          descricao: "Pão de hambúrguer, frango empanado, queijo, presunto...",
        },
      ],
      qtdItens: 1,
    },
    {
      numeroPedido: 253,
      cliente: "Daniela",
      mesa: 7,
      pagamento: "Cartão",
      dataHora: "20 Mar 2025, 17:22",
      itens: [
        {
          imagem: LancheNatural,
          titulo: "2x Lanche Natural",
          descricao: "Pão, Alface, Tomate e Molho.",
        },
        {
          imagem: ChickenJr,
          titulo: "1x Chicken Jr.",
          descricao: "Pão de hambúrguer, frango empanado, queijo, presunto...",
          observacao: "COM MOLHO EXTRA",
        },
      ],
      qtdItens: 3,
    },
    {
      numeroPedido: 254,
      cliente: "Eduardo",
      mesa: 1,
      pagamento: "Dinheiro",
      dataHora: "20 Mar 2025, 17:35",
      itens: [
        {
          imagem: ChickenJr,
          titulo: "1x Chicken Jr.",
          descricao: "Pão de hambúrguer, frango empanado, queijo, presunto...",
        },
        {
          imagem: ChickenJr,
          titulo: "1x Chicken Jr.",
          descricao: "Pão de hambúrguer, frango empanado, queijo, presunto...",
        },
      ],
      qtdItens: 2,
    },
    {
      numeroPedido: 255,
      cliente: "Fernanda",
      mesa: 9,
      pagamento: "Pix",
      dataHora: "20 Mar 2025, 17:50",
      itens: [
        {
          imagem: LancheNatural,
          titulo: "1x Lanche Natural",
          descricao: "Pão, Alface, Tomate e Molho.",
        },
        {
          imagem: ChickenJr,
          titulo: "2x Chicken Jr.",
          descricao: "Pão de hambúrguer, frango empanado, queijo, presunto...",
        },
        {
          imagem: LancheNatural,
          titulo: "1x Lanche Natural",
          descricao: "Pão, Alface, Tomate e Molho.",
          observacao: "SEM ALFACE",
        },
      ],
      qtdItens: 4,
    },
  ]);

  const comandaRefs = useRef([]);

  useEffect(() => {
    requestAnimationFrame(() => {
      comandaRefs.current.forEach((comanda, index) => {
        if (!comanda) return;
        const linha = comanda.closest(".linha-comandas-teste");
        if (!linha) return;

        const comandaRect = comanda.getBoundingClientRect();
        const linhaRect = linha.getBoundingClientRect();

        const distancia = linhaRect.bottom - comandaRect.bottom;

        console.log(
          `Comanda ${
            index + 1
          }: distância do final da comanda até o final da linha = ${distancia.toFixed(
            2
          )}px`
        );
      });
    });
  }, [pedidos]);

  function dividirEmGrupos(array, tamanho) {
    const grupos = [];
    for (let i = 0; i < array.length; i += tamanho) {
      grupos.push(array.slice(i, i + tamanho));
    }
    return grupos;
  }

  return (
    <LayoutTela
      titulo="Preparo de Pedidos"
      adicional={
        <p>
          {pedidos.length === 1
            ? pedidos.length + " pedido"
            : pedidos.length + " pedidos"}
        </p>
      }
    >
      <article className="tela-comandas-teste">
        {dividirEmGrupos(pedidos, 3).map((grupo, grupoIndex) => (
          <div key={grupoIndex} className="linha-comandas-teste">
            {grupo.map((pedido, indexInGroup) => {
              const globalIndex = grupoIndex * 3 + indexInGroup;
              return (
                <div
                  key={pedido.numeroPedido}
                  className="comanda-container-teste"
                >
                  <div
                    className="comanda-teste"
                    ref={(el) => (comandaRefs.current[globalIndex] = el)}
                  >
                    <div className="cabecalho-comanda-teste">
                      COMANDA {globalIndex + 1}
                    </div>
                    <div className="corpo-comanda-teste">
                      {pedido.itens.map((item, i) => (
                        <div key={i} className="item-comanda-teste">
                          {item.titulo}
                          {item.observacao ? ` - Obs: ${item.observacao}` : ""}
                        </div>
                      ))}
                      <div className="info-comanda-teste">
                        <strong>Cliente:</strong> {pedido.cliente} <br />
                        <strong>Mesa:</strong> {pedido.mesa} <br />
                        <strong>Pagamento:</strong> {pedido.pagamento} <br />
                        <strong>Data/Hora:</strong> {pedido.dataHora}
                      </div>
                    </div>
                    <div className="rodape-comanda-teste">RODAPÉ</div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </article>
    </LayoutTela>
  );
}
