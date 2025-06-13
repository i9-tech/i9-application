import { useState } from "react";
import "./ModalSenha.css";

export default function ModalSenha({ onClose, onSubmit, disabled }) {
    const [cpf, setCpf] = useState(null);
  return (
    <section className="esqueceu" aria-labelledby="titulo-senha">
      <article className="esqueceu-container">
        <header className="modal-header">
          <h2 id="titulo-senha">Esqueceu a Senha?</h2>
          <p>Sem problemas! Informe seu CPF abaixo para continuar.</p>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Fechar"
          >
            ×
          </button>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(cpf);
          }}
        >
          <div className="input-group">
            <label htmlFor="cpf">Insira seu CPF</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={cpf}
              placeholder="XXX.XXX.XXX-XX"
              maxLength={14}
              onChange={(e) => {
                let valor = e.target.value;
                valor = valor.replace(/\D/g, "");
                valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
                valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
                valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                setCpf(valor);
              }}
              //   required
              disabled={disabled}
              autoComplete="off"
              aria-label="CPF"
            />
          </div>

          <button type="submit">Enviar</button>
        </form>
      </article>
    </section>
  );
}
