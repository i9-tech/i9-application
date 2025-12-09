import { NavLink, Link, useNavigate } from "react-router-dom";
import iconeAtendimento from "../../assets/atendimento-icone-colorido-escuro.svg";
import iconeDashboard from "../../assets/dashboard-icone-colorido-escuro.svg";
import iconeConfiguracoes from "../../assets/settings-ui-svgrepo-com.svg";
import iconeCozinha from "../../assets/cozinha-icone-colorido-escuro.svg";
import iconeEstoqueProduto from "../../assets/estoque-produtos.svg";
import iconeEstoquePrato from "../../assets/estoque-pratos.svg";
import iconeEquipe from "../../assets/equipe-icone-colorido-escuro.svg";
import iconeSair from "../../assets/sair-icone-colorido-escuro.svg";
import setorCategoriaIcone from "../../assets/setor-categoria-icon.svg";
import { getPermissoes } from "../../utils/auth";
import { ROUTERS } from "../../utils/routers";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

export function Options({ isNavbarOpen, setIsNavbarOpen }) {
  const navigate = useNavigate();
  const permissoes = getPermissoes();

  if (permissoes.length === 0) {
    return null;
  }

  function handleLogout() {
    localStorage.clear();
    navigate(ROUTERS.LOGIN);
  }

  function handleNavbar() {
    setIsNavbarOpen(!isNavbarOpen);
  }

  const tooltipBase = !isNavbarOpen
    ? {
      "data-tooltip-id": "tooltip-navbar",
      "data-tooltip-place": "right",
    }
    : {};

  return (
    <>
      <p
        style={{
          display: "flex",
          flexDirection: "column",
          height: "70%",
          gap: "0.5rem",
        }}
      >
        {permissoes.includes("PROPRIETARIO_ROLE_PLANO_ACESSO_DASHBOARD") && (
          <NavLink
            to={ROUTERS.DASHBOARD}
            className={({ isActive }) =>
              isActive ? "nav-link clicked" : "nav-link"
            }
            {...tooltipBase}
            data-tooltip-content="Dashboard"
          >
            <li key="dashboard">
              <i>
                <img src={iconeDashboard} alt="Icone de Dashboard" />
              </i>
              <span>Dashboard</span>
            </li>
          </NavLink>
        )}

        {permissoes.includes("ROLE_ATENDIMENTO") && (
          <NavLink
            to={ROUTERS.ATENDENTE}
            className={({ isActive }) =>
              isActive ? "nav-link clicked" : "nav-link"
            }
            {...tooltipBase}
            data-tooltip-content="Atendimento"
          >
            <li key="atendente">
              <i>
                <img src={iconeAtendimento} alt="Icone de Atendimento" />
              </i>
              <span>Atendimento</span>
            </li>
          </NavLink>
        )}

        {permissoes.includes("ROLE_COZINHA") && (
          <NavLink
            to={ROUTERS.COMANDAS}
            className={({ isActive }) =>
              isActive ? "nav-link clicked" : "nav-link"
            }
            {...tooltipBase}
            data-tooltip-content="Cozinha"
          >
            <li key="cozinha">
              <i>
                <img src={iconeCozinha} alt="Icone de Cozinha" />
              </i>
              <span>Cozinha</span>
            </li>
          </NavLink>
        )}

        {permissoes.includes("ROLE_ESTOQUE") && (
          <NavLink
            to={ROUTERS.ESTOQUE_PRODUTOS}
            className={({ isActive }) =>
              isActive ? "nav-link clicked" : "nav-link"
            }
            {...tooltipBase}
            data-tooltip-content="Estoque de Produtos"
          >
            <li key="estoque">
              <i>
                <img src={iconeEstoqueProduto} alt="Icone de Estoque de Produtos" />
              </i>
              <span>Estoque de Produtos</span>
            </li>
          </NavLink>
        )}

        {permissoes.includes("ROLE_ESTOQUE") && (
          <NavLink
            to={ROUTERS.ESTOQUE_PRATOS}
            className={({ isActive }) =>
              isActive ? "nav-link clicked" : "nav-link"
            }
            {...tooltipBase}
            data-tooltip-content="Estoque de Pratos"
          >
            <li key="estoque-pratos">
              <i>
                <img src={iconeEstoquePrato} alt="Icone de Estoque de Pratos" />
              </i>
              <span>Estoque de Pratos</span>
            </li>
          </NavLink>
        )}

        {permissoes.includes("ROLE_PROPRIETARIO") && (
          <NavLink
            to={ROUTERS.SETOR_CATEGORIA}
            className={({ isActive }) =>
              isActive ? "nav-link clicked" : "nav-link"
            }
            {...tooltipBase}
            data-tooltip-content="Setores e Categorias"
          >
            <li key="setor-categoria">
              <i>
                <img src={setorCategoriaIcone} alt="Icone de Setor e Categoria" />
              </i>
              <span>Setores e Categorias</span>
            </li>
          </NavLink>
        )}

        {permissoes.includes("ROLE_PROPRIETARIO") && (
          <NavLink
            to={ROUTERS.FUNCIONARIOS}
            className={({ isActive }) =>
              isActive ? "nav-link clicked" : "nav-link"
            }
            {...tooltipBase}
            data-tooltip-content="Equipe"
          >
            <li key="funcionarios">
              <i>
                <img src={iconeEquipe} alt="Icone de Equipe" />
              </i>
              <span>Equipe</span>
            </li>
          </NavLink>
        )}

        {permissoes.includes("ROLE_PROPRIETARIO") && (
          <NavLink
            to={ROUTERS.CONFIGURACOES}
            className={({ isActive }) =>
              isActive ? "nav-link clicked" : "nav-link"
            }
            {...tooltipBase}
            data-tooltip-content="Configurações"
          >
            <li key="configuracoes">
              <i>
                <img src={iconeConfiguracoes} alt="Icone de Configurações" />
              </i>
              <span>Configurações</span>
            </li>
          </NavLink>
        )}
      </p>

      <p
        style={{
          display: "flex",
          height: "20%",
          gap: "0.5rem",
          flexDirection: "column",
          justifyContent: "end",
          width: "100%",
        }}
      >
        {/* Logout com Link e evento */}
        <Link
          to={ROUTERS.LOGIN}
          onClick={handleLogout}
          {...(!isNavbarOpen
            ? {
                "data-tooltip-id": "tooltip-navbar",
                "data-tooltip-content": "Sair",
              }
            : {})}
        >
          <li key="sair">
            <i>
              <img src={iconeSair} alt="Icone de Sair" />
            </i>
            <span>Sair</span>
          </li>
        </Link>

        {/* Toggle do menu com Link (sem to, mas estilizado corretamente) */}
        <Link
          onClick={handleNavbar}
          {...(!isNavbarOpen
            ? {
                "data-tooltip-id": "tooltip-navbar",
                "data-tooltip-content": "Abrir/Fechar Menu",
              }
            : {})}
          style={{ cursor: "pointer" }}
        >
          <li key="toggle-menu">
            <i className="seta-nav">
              <MdOutlineKeyboardDoubleArrowRight />
            </i>
            <span>{isNavbarOpen ? "Fechar Menu" : "Abrir Menu"}</span>
          </li>
        </Link>
      </p>
    </>
  );
}

export default Options;
