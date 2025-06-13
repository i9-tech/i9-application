import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../utils/routers";
import { FaAngleDown } from "react-icons/fa";
import PDV_1 from "../../assets/pdv_1.png";
import PDV_2 from "../../assets/pdv_2.png";
import PDV_3 from "../../assets/pdv_3.png";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const DesktopInicio = ({ navegarParaSecao }) => {
  const navigate = useNavigate();
  const imagens = [PDV_1, PDV_2, PDV_3];
  const [indiceAtual, _setIndiceAtual] = useState(0);

  // useEffect(() => {
  //   const intervalo = setInterval(() => {
  //     setIndiceAtual((indiceAnterior) => (indiceAnterior + 1) % imagens.length);
  //   }, 20000);

  //   return () => clearInterval(intervalo);
  // }, []);

  return (
    <>
      <article className="inicio">
        <span className="inicio-desktop">
          <div className="inicioConteudo">
            <div className="titulo-container">
              <h1 className="titulo1">
                Facilitamos a gestão <br />
                para que você foque no que realmente importa:
              </h1>

              <span className="titulo2">seu negócio</span>

              <p className="frase">
                Soluções integradas para otimizar seu restaurante e mercado, com
                controle de estoque e gestão de pedidos
              </p>

              <div className="inicioBotoes">
                <button
                  className="btnUm"
                  onClick={() => navigate(ROUTERS.LOGIN)}
                >
                  Entrar ›
                </button>
                <div
                  className="btnDois"
                  onClick={() => navegarParaSecao("contato")}
                >
                  Entre em contato conosco ›
                </div>
              </div>
            </div>
          </div>

          <div className="inicioImagem">
            <AnimatePresence mode="wait">
              <motion.img
                key={imagens[indiceAtual]}
                // src={imagens[indiceAtual]}
                src={imagens[0]}
                alt={`Imagem ${indiceAtual + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>
        </span>
        <span className="inicio-tablet">
          <div className="titulo-container">
            <h1 className="titulo1">
              Facilitamos a gestão <br />
              para que você foque no que realmente importa:
            </h1>
            <span className="titulo2">seu negócio</span>
          </div>
          <div className="conteudo-tablet">
            <span className="textos-tablet">
              <p className="frase">
                Soluções integradas para otimizar seu restaurante e mercado, com
                controle de estoque e gestão de pedidos
              </p>

              <div className="inicioBotoes">
                <button
                  className="btnUm"
                  onClick={() => navigate(ROUTERS.LOGIN)}
                >
                  Entrar ›
                </button>
                <div
                  className="btnDois"
                  onClick={() => navegarParaSecao("contato")}
                >
                  Entre em contato conosco ›
                </div>
              </div>
            </span>
            <div className="inicioImagem">
              <AnimatePresence mode="wait">
               <motion.img
                key={imagens[indiceAtual]}
                // src={imagens[indiceAtual]}
                src={imagens[0]}
                alt={`Imagem ${indiceAtual + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </AnimatePresence>
            </div>
          </div>
        </span>
      </article>

      <div className="saibaMais">
        <div
          onClick={() => navegarParaSecao("solucoes")}
          className="saiba-mais"
        >
          Saiba mais!
          <FaAngleDown size={32} className="seta-animada" />
        </div>
      </div>
    </>
  );
};

export default DesktopInicio;
