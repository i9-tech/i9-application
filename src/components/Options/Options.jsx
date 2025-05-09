import { Link } from "react-router-dom";
import iconeAtendimento from "../../assets/atendimento-icone-colorido-escuro.svg";
import iconeDashboard from "../../assets/dashboard-icone-colorido-escuro.svg";
import iconeCozinha from "../../assets/cozinha-icone-colorido-escuro.svg";
import iconeEstoque from "../../assets/estoque-icone-colorido-escuro.svg";
import iconeEquipe from "../../assets/equipe-icone-colorido-escuro.svg";
import iconeSair from "../../assets/sair-icone-colorido-escuro.svg";
import setorCategoriaIcone from "../../assets/setor-categoria-icon.svg";
import { getPermissoes } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export function Options() {
  const navigate = useNavigate();
  const permissoes = getPermissoes();

  if (permissoes.length === 0) {
    return null;
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <>
      {permissoes.includes("ROLE_ATENDIMENTO") && (
        <Link to="/atendente">
          <li key="atendente">
            <i>
              <img src={iconeAtendimento} alt="Icone de Atendimento" />
            </i>
            <span>Atendimento</span>
          </li>
        </Link>
      )}
      {permissoes.includes("ROLE_COZINHA") && (
        <Link to="/cozinha">
          <li key="cozinha">
            <i>
              <img src={iconeCozinha} alt="Icone de Cozinha" />
            </i>
            <span>Cozinha</span>
          </li>
        </Link>
      )}
      {permissoes.includes("ROLE_ESTOQUE") && (
        <Link to="/estoque">
          <li key="estoque">
            <i>
              <img src={iconeEstoque} alt="Icone de Estoque" />
            </i>
            <span>Estoque de Produtos</span>
          </li>
        </Link>
      )}
      {permissoes.includes("ROLE_ESTOQUE") && (
        <Link to="/estoque-pratos">
          <li key="estoque-pratos">
            <i>
              <img src={iconeEstoque} alt="Icone de Estoque" />
            </i>
            <span>Estoque de Pratos</span>
          </li>
        </Link>
      )}
      {permissoes.includes("ROLE_PROPRIETARIO") && (
        <Link to="/setor-categoria">
          <li key="setor-categoria">
            <i>
              <img src={setorCategoriaIcone} alt="Icone de Setor e Categoria" />
            </i>
            <span>Setores e Categorias</span>
          </li>
        </Link>
      )}
      {permissoes.includes("ROLE_PROPRIETARIO") && (
        <Link to="/funcionarios">
          <li key="funcionarios">
            <i>
              <img src={iconeEquipe} alt="Icone de Equipe" />
            </i>
            <span>Equipe</span>
          </li>
        </Link>
      )}
      {permissoes.includes("ROLE_PROPRIETARIO") && (
        <Link to="/dashboard">
          <li key="dashboard">
            <i>
              <img src={iconeDashboard} alt="Icone de Dashboard" />
            </i>
            <span>Dashboard</span>
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
