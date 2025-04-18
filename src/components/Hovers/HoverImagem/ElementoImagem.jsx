import "./ElementoImagem.css";
import ImagemComida from "../assets/comida.png";
import { motion, AnimatePresence } from "framer-motion";

export function ElementoImagem({ imagemSecao, respostaPergunta }) {
  return (
    <article className="artigo-imagem">
      <div className="elemento-imagem">
        <img src={imagemSecao} alt="Imagem Comida" />

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
