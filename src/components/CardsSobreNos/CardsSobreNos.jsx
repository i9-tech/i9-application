import React from "react";
import integrado from "../../assets/integrado.png";
import facil from "../../assets/facil.png";
import controle from "../../assets/controle.png";
import suporte from "../../assets/suporte.png";
import ImagemSobreNos from "../SobreNos/ImagemSobreNos";
import TextoSobreNos from "../SobreNos/TextoSobreNos";

const CardsSobreNos = () => {
  return (
    <>
      <article className="card-carrossel">
        <div className="tit-desc">
          <h4>O QUE TORNA A I9 ÚNICA?</h4>
          <h2>
            Por que empresas escolhem a <span>i9</span>?
          </h2>
        </div>

        <div className="cards">
          <div className="sobreNos">
            <span className="imagem-sobre">
              <ImagemSobreNos imagem={integrado} alt="integrado" />
            </span>
            <span className="texto-sobre">
              <TextoSobreNos
                titulo={<>Tudo Integrado em Um Só Sistema</>}
                descricao={
                  <>
                    Com a i9, não há necessidade de trocar entre diferentes
                    plataformas. Tenha tudo que você precisa em um único lugar,
                    de forma prática e fácil.
                  </>
                }
              />
            </span>
          </div>

          <div className="sobreNos">
            <span className="imagem-sobre">
              <ImagemSobreNos imagem={facil} alt="facil" />
            </span>
            <span className="texto-sobre">
              <TextoSobreNos
                titulo={<>Fácil de Usar, Sem Complicação</>}
                descricao={
                  <>
                    Com a i9, a tecnologia é descomplicada. Nossa plataforma
                    permite gerenciar seu negócio de forma rápida e sem stress,
                    com recursos acessíveis e fáceis de usar em um só lugar.
                  </>
                }
              />
            </span>
          </div>

          <div className="sobreNos">
            <span className="imagem-sobre">
              <ImagemSobreNos imagem={controle} alt="controle" />
            </span>
            <span className="texto-sobre">
              <TextoSobreNos
                titulo={<>Tudo no Seu Controle</>}
                descricao={
                  <>
                    Com o nosso sistema, você centraliza a gestão de todas as
                    áreas de seu negócio em uma plataforma simples, sem precisar
                    lidar com planilhas ou registros manuais. Você tem total
                    controle sobre todas as operações.
                  </>
                }
              />
            </span>
          </div>

          <div className="sobreNos">
            <span className="imagem-sobre">
              <ImagemSobreNos imagem={suporte} alt="suporte" />
            </span>
            <span className="texto-sobre">
              <TextoSobreNos
                titulo={<>Suporte Sempre ao Seu Lado</>}
                descricao={
                  <>
                    Nosso time de suporte é rápido e sempre disponível para te
                    ajudar, seja por e-mail ou chat. Para que você nunca se
                    sinta perdido e consiga resolver qualquer dúvida com
                    agilidade.
                  </>
                }
              />
            </span>
          </div>
        </div>
      </article>
    </>
  );
};

export default CardsSobreNos;
