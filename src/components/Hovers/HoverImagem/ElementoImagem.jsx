import "./ElementoImagem.css";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export function ElementoImagem({ imagemSecao, respostaPergunta }) {
  return (
    <article className="artigo-imagem">
      <div className="elemento-imagem">
        <AnimatePresence mode="wait">
              <motion.img
                key={imagemSecao}
                src={imagemSecao}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </AnimatePresence>

        <AnimatePresence>
          {respostaPergunta && (
            <motion.div
              className="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {respostaPergunta}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}

export default ElementoImagem;
