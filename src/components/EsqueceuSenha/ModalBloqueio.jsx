import "./ModalSenha.css";

export default function ModalBloqueio({onClose}) {
  return (
    <section className="esqueceu" aria-labelledby="titulo-confirmacao">
      <article className="esqueceu-container">
        <header className="modal-header">
          <h2 id="titulo-senha">Login Bloqueado?</h2>
          <p>Entenda o porquê!</p>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Fechar"
          >
            ×
          </button>
        </header>

        <div className="mensagem-confirmacao">
          <p>
            Seu login foi temporariamente bloqueado devido a múltiplas tentativas de acesso inválidas. 
          </p>
          <p>
            Isso é uma medida de segurança para proteger sua conta contra acessos não autorizados.
          </p>
          <small>
            *É possível tentar novamente após o período de bloqueio temporário.
          </small>
        </div>
      </article>
    </section>
  );
}
