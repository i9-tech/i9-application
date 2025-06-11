import BotaoOpcao from "../Hovers/HoverBotoes/BotaoOpcao";
import ElementoImagem from "../Hovers/HoverImagem/ElementoImagem";
import IMAGEM_COMANDAS from "../../assets/imagem-gestao-comandas.png";
import IMAGEM_PDV from "../../assets/frente_caixa.png";
import IMAGEM_ESTOQUE from "../../assets/imagem-gestao-estoque.png";
import { useState } from "react";
import SETA_DIREITA from "../../assets/seta-direita.svg"
import SETA_ESQUERDA from "../../assets/seta-esquerda.svg"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function OpcoesCardSobreposto() {
  const [blocoAtual, setBlocoAtual] = useState(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);

  const perguntas = [
    {
      introducao:
        "O nosso sistema facilita o registro de pedidos e pagamentos, garantindo um atendimento rápido, eficiente e sem complicações",
      opcoes: [
        {
          opcao: "Comunicação entre equipes",
          resposta:
            "Agilize processos com pedidos registrados e enviados para a cozinha, melhorando a comunicação e eficiência entre setores.",
        },
        {
          opcao: "Acompanhamento em tempo real",
          resposta:
            "Monitore vendas e fluxo de caixa em tempo real, permitindo que equipes identifiquem picos de demanda e tomem decisões estratégicas rapidamente.",
        },
        {
          opcao: "Histórico de pedidos",
          resposta:
            "Acesse o registro de seus pedidos e veja dados importantes como lucro e quantidade de vendas no dia. Identifique tendências e tome decisões estratégicas com mais segurança.",
        },
      ],
      imagem: IMAGEM_COMANDAS,
    },
    {
      introducao:
        "Nosso sistema otimiza a gestão de estoque, controlando entradas e saídas em tempo real para evitar desperdícios e garantir reposições no momento certo.",
      opcoes: [
        {
          opcao: "Controle de entrada e saída",
          resposta:
            "Gerencie estoque e fluxo de caixa com registros automáticos, acompanhando a movimentação em tempo real para evitar perdas e otimizar a operação.",
        },
        {
          opcao: "Alertas de estoque baixo",
          resposta:
            "O sistema PDV alerta sobre estoque baixo, permitindo reposições rápidas e evitando interrupções nas vendas.",
        },
        {
          opcao: "Gestão de validade dos produtos",
          resposta:
            "O sistema PDV alerta sobre vencimentos, evitando desperdícios e garantindo a qualidade dos produtos.",
        },
      ],
      imagem: IMAGEM_PDV,
    },
    {
      introducao:
        " O nosso sistema facilita o registro de pedidos e pagamentos, garantindo um atendimento rápido, eficiente e sem complicações",
      opcoes: [
        {
          opcao: "Registro Simplificado de Pedidos",
          resposta:
            "Registrar um pedido é rápido e fácil, evitando erros e melhorando a comunicação da equipe para um atendimento mais eficiente.",
        },
        {
          opcao: "Cardápio Personalizável",
          resposta:
            "Adapte o cardápio com facilidade, ajustando itens, preços e promoções rapidamente para mais flexibilidade na operação.",
        },
        {
          opcao: "Controle de Vendas",
          resposta:
            "Monitore vendas em tempo real com precisão, obtenha insights detalhados e tome decisões estratégicas com mais segurança.",
        },
      ],
      imagem: IMAGEM_ESTOQUE,
    },
  ];

  const bloco = perguntas[blocoAtual];
  const respostaPergunta =
    opcaoSelecionada !== null ? bloco.opcoes[opcaoSelecionada].resposta : null;

  return (
    <>
      <article className="opcoes-desktop">
        <span className="options">
          <button
            className={`botao-option ${blocoAtual === 0 ? "selecionado" : ""}`}
            onClick={() => {
              setBlocoAtual(0);
              setOpcaoSelecionada(null);
            }}
          >
            Gestão de Comandas
          </button>
          <button
            className={`botao-option ${blocoAtual === 1 ? "selecionado" : ""}`}
            onClick={() => {
              setBlocoAtual(1);
              setOpcaoSelecionada(null);
            }}
          >
            Frente de Caixa PDV
          </button>
          <button
            className={`botao-option ${blocoAtual === 2 ? "selecionado" : ""}`}
            onClick={() => {
              setBlocoAtual(2);
              setOpcaoSelecionada(null);
            }}
          >
            Gestão de Estoque
          </button>
        </span>
        <span className="infos-sistema">
          <AnimatePresence mode="wait">
            <motion.span
              key={blocoAtual}
              className="infos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="botoes-opcoes">
                <p>{bloco.introducao}</p>
                {bloco.opcoes.map((op, index) => (
                  <BotaoOpcao
                    key={index}
                    texto={op.opcao}
                    onClick={() =>
                      setOpcaoSelecionada(
                        opcaoSelecionada === index ? null : index
                      )
                    }
                    selecionado={opcaoSelecionada === index}
                  />
                ))}
              </div>
              <div className="imagem-opcao">
                <ElementoImagem
                  imagemSecao={bloco.imagem}
                  respostaPergunta={respostaPergunta}
                />
              </div>
            </motion.span>
          </AnimatePresence>
        </span>
      </article>
      <article className="opcoes-mobile">
        <span className="bloco-container">
          <select
            className="bloco-select"
            name="opcao-bloco"
            id="opcao-bloco"
            value={blocoAtual}
            onChange={(e) => {
              setBlocoAtual(Number(e.target.value));
              setOpcaoSelecionada(null);
            }}
          >
            <option value={0}>Gestão de Comandas</option>
            <option value={1}>Frente de Caixa PDV</option>
            <option value={2}>Gestão de Estoque</option>
          </select>

          <span className="bloco-conteudo">
            <p className="bloco-introducao">{bloco.introducao}</p>

            <div className="bloco-opcao">
              {bloco.opcoes && bloco.opcoes[opcaoSelecionada] ? (
                <>
                  <h3 className="bloco-opcao-titulo">
                    {bloco.opcoes[opcaoSelecionada].opcao}
                  </h3>
                  <p className="bloco-opcao-descricao">
                    {bloco.opcoes[opcaoSelecionada].resposta}
                  </p>
                </>
              ) : (
                <>
                  <h3 className="bloco-opcao-titulo">
                    {bloco.opcoes[0].opcao}
                  </h3>
                  <p className="bloco-opcao-descricao">
                    {bloco.opcoes[0].resposta}
                  </p>
                </>
              )}
            </div>

            <div className="bloco-navegacao">
              <button
                className="navegacao-botao voltar"
                onClick={() => setOpcaoSelecionada((prev) => prev - 1)}
                disabled={opcaoSelecionada === 0 || opcaoSelecionada === null}
              >
                <img src={SETA_ESQUERDA} alt="seta para esquerda" />
              </button>
              <button
                className="navegacao-botao passar"
                onClick={() => setOpcaoSelecionada((prev) => prev + 1)}
                disabled={
                  opcaoSelecionada ===
                  (bloco.opcoes ? bloco.opcoes.length - 1 : 0) ||
                  !bloco.opcoes ||
                  bloco.opcoes.length === 0
                }
              >
                <img src={SETA_DIREITA} alt="seta para direita" />
              </button>
            </div>
          </span>
        </span>
      </article>
    </>
  );
}
