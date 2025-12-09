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
            Basta abrir o e-mail e clicar no link de redefinição de senha.
          </p>
          <small>
            *O e-mail será enviado para o dono do negócio ou para o e-mail do funcionário. Não é possível recuperar a senha de outra forma.
          </small>
        </div>
      </article>
    </section>
  );
}
