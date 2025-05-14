import ElementoImagem from "../Hovers/HoverImagem/ElementoImagem";
import IMAGEM_PERGUNTAS from "../../assets/imagem-perguntas-frequentes.png";
import ListaPerguntas from "../ListaPerguntas/ListaPerguntas";
import { useState } from "react";

export default function Perguntas() {

  const [indiceAberto, setIndiceAberto] = useState(null);

  const perguntas = [
    {
      tipo: "Qualquer um terá acesso ao sistema de forma livre?",
      resposta: "Nosso sistema é projetado para ser simples e intuitivo, mas o acesso não é totalmente livre — é necessário criar uma conta para utilizar os recursos. Porém, uma vez cadastrado, você terá um painel completo para registrar pedidos, gerenciar estoque e acompanhar suas vendas de maneira eficiente e segura."
    },
    {
      tipo: "Eu não sou muito chegado a tecnologia, ainda assim conseguirei mexer?",
      resposta:
        "Sim! Pensamos exatamente em você ao desenvolver o sistema. Com um registro simplificado de pedidos, interface intuitiva e cardápio personalizável, tudo é feito de forma prática e sem complicação, mesmo para quem não tem familiaridade com tecnologia"
    },
    {
      tipo: "Como posso acompanhar o registro das minhas vendas e pedidos?",
      resposta: "Você poderá acompanhar tudo em tempo real! Nosso sistema oferece: Acompanhamento em tempo real das vendas e do fluxo de caixa; Histórico de pedidos com dados como lucro e volume de vendas; Controle detalhado de vendas, com insights que te ajudam a tomar decisões com mais segurança."
    },
    {
      tipo: "Como será feita a gestão do estoque dos meus produtos?",
      resposta: "A gestão é feita de forma automatizada e eficiente: Controle de entrada e saída de produtos em tempo real; Alertas automáticos de estoque baixo; Monitoramento da validade dos produtos, evitando desperdícios."
    }
  ];
  
  return (
    <>
      <div className="cabecalho-perguntas">
        Perguntas frequentes,
        <hov>saiba mais sobre o i9</hov>
      </div>
      <span className="dados">
        <div className="imagem-dados">
          <ElementoImagem imagemSecao={IMAGEM_PERGUNTAS} />
        </div>
        <span className="lista-perguntas">
        {perguntas.map((p, i) => (
          <ListaPerguntas
            key={i}
            tipoPergunta={p.tipo}
            respostaPergunta={p.resposta}
            aberta={indiceAberto === i}
            aoClicar={() =>
              setIndiceAberto(indiceAberto === i ? null : i)
            }
            selecionado={indiceAberto === i}
          />
        ))}
      </span>
      </span>
    </>
  );
}
