import ElementoImagem from "../Hovers/HoverImagem/ElementoImagem";
import IMAGEM_PDV from "../../assets/frente_caixa.png";
import ListaPerguntas from "../ListaPerguntas/ListaPerguntas";
import { useState } from "react";

export default function Perguntas() {

  const [indiceAberto, setIndiceAberto] = useState(null);

  const perguntas = [
    {
      tipo: "Qualquer um terá acesso ao sistema de forma livre?",
      resposta: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, omnis fugit. Cumque quidem quis numquam, voluptatem sunt accusantium fugiat ipsum, sed possimus magni ratione. Dolorem ullam ipsa facere laborum corrupti."
    },
    {
      tipo: "Eu não sou muito chegado a tecnologia, ainda assim conseguirei mexer?",
      resposta:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, deserunt veritatis repellendus..."
    },
    {
      tipo: "Como posso acompanhar o registro das minhas vendas e pedidos?",
      resposta: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci beatae nostrum non impedit assumenda quam corrupti saepe ullam! Ut assumenda possimus beatae nostrum quibusdam perspiciatis esse dicta unde nisi delectus?"
    },
    {
      tipo: "Como será feita a gestão do estoque dos meus produtos?",
      resposta: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quidem possimus, harum eos, ullam culpa sequi tenetur commodi, illo vero eaque omnis dolorum? Quisquam aliquid illum quis dolor sed commodi."
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
          <ElementoImagem imagemSecao={IMAGEM_PDV} />
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
          />
        ))}
      </span>
      </span>
    </>
  );
}
