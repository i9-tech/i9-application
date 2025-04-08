import BotaoOpcaoHover from "../Hovers/HoverBTN/BotaoOpcaoHover";

export default function OpcoesCardSobreposto() {
  return (
    <>
      <article className="opcoes-desktop">
        <span className="options">
          <button className="botao-opcao">Gestão de Comandas</button>
          <button className="botao-opcao selecionado">
            Frente de Caixa PDV
          </button>
          <button className="botao-opcao">Gestão de Estoque</button>
        </span>
        <span className="infos-sistema">
          <div className="botoes-opcoes">
          <p>
            O nosso sistema facilita o registro de pedidos e pagamentos,
            garantindo um atendimento rápido, eficiente e sem complicações
          </p>
            <BotaoOpcaoHover texto={"Registro Simplificado de Pedidos"} />
            <BotaoOpcaoHover texto={"Cardápio Personalizável"} />
            <BotaoOpcaoHover texto={"Controle de Vendas"} />
          </div>
        </span>
      </article>
      <article className="opcoes-tablet">tamanho tablet</article>
      <article className="opcoes-mobile">tamanho mobile</article>
    </>
  );
}
