import "./ModalSenha.css";

export default function ModalNotificacao({onClose}) {
  return (
    <section className="esqueceu" aria-labelledby="titulo-confirmacao">
      <article className="esqueceu-container">
        <header className="modal-header">
          <h2 id="titulo-senha">Tudo Certo!</h2>
          <p>E-mail enviado com sucesso!</p>
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
            Enviamos um e-mail com um link para você criar uma nova senha.
          </p>
          <p>
            Basta abrir o e-mail e clicar no link.
          </p>
          <small>
            *O e-mail vai para o dono do negócio. Não é possível recuperar a senha de outro jeito.
          </small>
        </div>
      </article>
    </section>
  );
}
