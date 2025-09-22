import { useState } from "react";
import api from "../../provider/api";
import { ENDPOINTS } from "../../utils/endpoints";
import { toast } from "react-toastify";
import "./ModalRedefinirPrimeiroAcesso.css";
import { getFuncionario } from "../../utils/auth"; 

export default function ModalRedefinirPrimeiroAcesso({ onClose }) {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);


  const funcionario = getFuncionario(); 
  const idFuncionario = funcionario?.userId;
  const idEmpresa = funcionario?.empresaId;

    console.log(idFuncionario);

  const handleRedefinirSenha = (e) => {
    e.preventDefault();

    if (novaSenha !== confirmarSenha) {
      toast.error("As senhas não coincidem!");
      return;
    }

    setLoading(true);

      const body = {
        senha: novaSenha,
        primeiroAcesso: false,
      };


    const token = localStorage.getItem("token");

    api
      .patch(`${ENDPOINTS.PRIMEIRO_ACESSO}/${idFuncionario}/${idEmpresa}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success("Senha redefinida com sucesso!");
        onClose(); 
      })
      .catch((error) => {
        console.error("Erro ao redefinir senha:", error);
        toast.error(
          `Erro ao redefinir senha: ${error.response?.data?.mensagem || "Erro desconhecido"}`
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="esqueceu">
      <div className="esqueceu-container">
        <header className="modal-header">
          <h2>Redefinir Senha</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </header>

        <form onSubmit={handleRedefinirSenha}>
          <div className="input-group">
            <label htmlFor="novaSenha">Nova Senha</label>
            <input
              type="password"
              id="novaSenha"
              value={novaSenha}
             placeholder="Digite sua nova senha" 
              onChange={(e) => setNovaSenha(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              value={confirmarSenha}
               placeholder="Confirme sua nova senha" 
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Redefinindo..." : "Redefinir Senha"}
          </button>
        </form>
      </div>
    </div>
  );
}
