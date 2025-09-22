import { useState } from "react";
import "../EsqueceuSenha/ModalSenha.css";

export default function ModalRedefinirSenha({ onClose, onSubmit, disabled }) {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    onSubmit(senha);
  };

  return (
    <section className="esqueceu" aria-labelledby="titulo-redefinir">
      <article className="esqueceu-container">
        <header className="modal-header">
          <h2 id="titulo-redefinir">Redefinição de Senha</h2>
          <p>Por motivos de segurança, é necessário redefinir sua senha neste primeiro acesso.</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="senha">Digite sua nova senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={senha}
              placeholder="Digite sua nova senha"
              onChange={(e) => setSenha(e.target.value)}
              required
              disabled={disabled}
              autoComplete="new-password"
              aria-label="Nova Senha"
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmarSenha">Confirme sua nova senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={confirmarSenha}
              placeholder="Confirme sua nova senha"
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
              disabled={disabled}
              autoComplete="new-password"
              aria-label="Confirmar Nova Senha"
            />
          </div>

          <button type="submit" disabled={disabled}>
            Redefinir Senha
          </button>
        </form>
      </article>
    </section>
  );
}
