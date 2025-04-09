import BotaoOpcao from "../Hovers/HoverBotoes/BotaoOpcao";
import ElementoImagem from "../Hovers/HoverImagem/ElementoImagem";

export default function OpcoesCardSobreposto() {
  return (
    <>
      <article className="opcoes-desktop">
        <span className="options">
          <button className="botao-option">Gestão de Comandas</button>
          <button className="botao-option selecionado">
            Frente de Caixa PDV
          </button>
          <button className="botao-option">Gestão de Estoque</button>
        </span>
        <span className="infos-sistema">
          <div className="botoes-opcoes">
            <p>
              O nosso sistema facilita o registro de pedidos e pagamentos,
              garantindo um atendimento rápido, eficiente e sem complicações
            </p>
            <BotaoOpcao texto={"Registro Simplificado de Pedidos"} />
            <BotaoOpcao texto={"Cardápio Personalizável"} />
            <BotaoOpcao texto={"Controle de Vendas"} />
          </div>
          <div className="imagem-opcao">
            <ElementoImagem />
          </div>
        </span>
      </article>
      <article className="opcoes-tablet">tamanho tablet</article>
      <article className="opcoes-mobile">tamanho mobile</article>
    </>
  );
}
