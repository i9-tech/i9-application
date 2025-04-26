import { Link } from "react-router-dom";
import iconeAtendimento from "../../assets/atendimento-icone-colorido-escuro.svg";
import iconeDashboard from "../../assets/dashboard-icone-colorido-escuro.svg";
import iconeCozinha from "../../assets/cozinha-icone-colorido-escuro.svg";
import iconeEstoque from "../../assets/estoque-icone-colorido-escuro.svg";
import iconeEquipe from "../../assets/equipe-icone-colorido-escuro.svg";
import iconeSair from "../../assets/sair-icone-colorido-escuro.svg";
import { getFuncionario } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export function Options() {
  const navigate = useNavigate();
  const funcionario = getFuncionario();
  if (!funcionario) {
    return null;
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <>
      {funcionario.acesso_setor_atendimento && (
        <Link to="/atendente">
          <li key="atendente">
            <i>
              <img src={iconeAtendimento} alt="Icone de Atendimento" />
            </i>
            <span>Atendimento</span>
          </li>
        </Link>
      )}
      {funcionario.proprietario && (
        <Link to="/dashboard">
          <li key="dashboard">
            <i>
              <img src={iconeDashboard} alt="Icone de Dashboard" />
            </i>
            <span>Dashboard</span>
          </li>
        </Link>
      )}
      {funcionario.acesso_setor_cozinha && (
        <Link to="/cozinha">
          <li key="cozinha">
            <i>
              <img src={iconeCozinha} alt="Icone de Cozinha" />
            </i>
            <span>Cozinha</span>
          </li>
        </Link>
      )}
      {funcionario.acesso_setor_estoque && (
        <Link to="/estoque">
          <li key="estoque">
            <i>
              <img src={iconeEstoque} alt="Icone de Estoque" />
            </i>
            <span>Estoque</span>
          </li>
        </Link>
      )}
      {funcionario.proprietario && (
        <Link to="/funcionarios">
          <li key="funcionarios">
            <i>
              <img src={iconeEquipe} alt="Icone de Equipe" />
            </i>
            <span>Equipe</span>
          </li>
        </Link>
      )}
      <Link to="/login">
        <li key="sair" onClick={handleLogout}>
          <i>
            <img src={iconeSair} alt="Icone de Sair" />
          </i>
          <span>Sair</span>
        </li>
      </Link>
    </>
  );
}
