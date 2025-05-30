// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function ListaPerguntas({
tipoPergunta, respostaPergunta, aberta, aoClicar, selecionado
}) {
  return (
    <>
      <span className={`pergunta ${selecionado ? 'selected' : ''}`}>
        <div className="tipo">{tipoPergunta}</div>
        <button className={`acionar ${selecionado ? 'selecao' : ''}`} onClick={aoClicar}>
          +
        </button>
      </span>
      <AnimatePresence>
      {aberta && (
      <motion.div
      key="resposta"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
      >
        <div className="resposta">
          {respostaPergunta}
        </div>
      </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
