import { Link, useNavigate } from "react-router-dom";
import iconeAtendimento from "../../assets/atendimento-icone-colorido-escuro.svg";
import iconeDashboard from "../../assets/dashboard-icone-colorido-escuro.svg";
import iconeCozinha from "../../assets/cozinha-icone-colorido-escuro.svg";
import iconeEstoque from "../../assets/estoque-icone-colorido-escuro.svg";
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

  return (
    <>
      <p style={{display: 'flex', flexDirection: 'column', height: '80%', gap: '0.5rem'}}>
        {permissoes.includes("ROLE_PROPRIETARIO") && (
          <Link
            to={ROUTERS.DASHBOARD}
            {...(!isNavbarOpen
              ? {
                  "data-tooltip-id": "tooltip-navbar",
                  "data-tooltip-content": "Dashboard",
                }
              : {})}
          >
            <li key="dashboard">
              <i>
                <img src={iconeDashboard} alt="Icone de Dashboard" />
              </i>
              <span>Dashboard</span>
            </li>
          </Link>
        )}
        {permissoes.includes("ROLE_ATENDIMENTO") && (
          <Link
            to={ROUTERS.ATENDENTE}
            {...(!isNavbarOpen
              ? {
                  "data-tooltip-id": "tooltip-navbar",
                  "data-tooltip-content": "Atendimento",
                }
              : {})}
          >
            <li key="atendente">
              <i>
                <img src={iconeAtendimento} alt="Icone de Atendimento" />
              </i>
              <span>Atendimento</span>
            </li>
          </Link>
        )}
        {permissoes.includes("ROLE_COZINHA") && (
          <Link
            to={ROUTERS.COMANDAS}
            {...(!isNavbarOpen
              ? {
                  "data-tooltip-id": "tooltip-navbar",
                  "data-tooltip-content": "Cozinha",
                }
              : {})}
          >
            <li key="cozinha">
              <i>
                <img src={iconeCozinha} alt="Icone de Cozinha" />
              </i>
              <span>Cozinha</span>
            </li>
          </Link>
        )}
        {permissoes.includes("ROLE_ESTOQUE") && (
          <Link
            to={ROUTERS.ESTOQUE_PRODUTOS}
            {...(!isNavbarOpen
              ? {
                  "data-tooltip-id": "tooltip-navbar",
                  "data-tooltip-content": "Estoque de Produtos",
                }
              : {})}
          >
            <li key="estoque">
              <i>
                <img src={iconeEstoque} alt="Icone de Estoque" />
              </i>
              <span>Estoque de Produtos</span>
            </li>
          </Link>
        )}
        {permissoes.includes("ROLE_ESTOQUE") && (
          <Link
            to={ROUTERS.ESTOQUE_PRATOS}
            {...(!isNavbarOpen
              ? {
                  "data-tooltip-id": "tooltip-navbar",
                  "data-tooltip-content": "Estoque de Pratos",
                }
              : {})}
          >
            <li key="estoque-pratos">
              <i>
                <img src={iconeEstoque} alt="Icone de Estoque" />
              </i>
              <span>Estoque de Pratos</span>
            </li>
          </Link>
        )}
        {permissoes.includes("ROLE_PROPRIETARIO") && (
          <Link
            to={ROUTERS.SETOR_CATEGORIA}
            {...(!isNavbarOpen
              ? {
                  "data-tooltip-id": "tooltip-navbar",
                  "data-tooltip-content": "Setores e Categorias",
                }
              : {})}
          >
            <li key="setor-categoria">
              <i>
                <img
                  src={setorCategoriaIcone}
                  alt="Icone de Setor e Categoria"
                />
              </i>
              <span>Setores e Categorias</span>
            </li>
          </Link>
        )}
        {permissoes.includes("ROLE_PROPRIETARIO") && (
          <Link
            to={ROUTERS.FUNCIONARIOS}
            {...(!isNavbarOpen
              ? {
                  "data-tooltip-id": "tooltip-navbar",
                  "data-tooltip-content": "Equipe",
                }
              : {})}
          >
            <li key="funcionarios">
              <i>
                <img src={iconeEquipe} alt="Icone de Equipe" />
              </i>
              <span>Equipe</span>
            </li>
          </Link>
        )}
        <Link
          to={ROUTERS.LOGIN}
          {...(!isNavbarOpen
            ? {
                "data-tooltip-id": "tooltip-navbar",
                "data-tooltip-content": "Sair",
              }
            : {})}
        >
          <li key="sair" onClick={handleLogout}>
            <i>
              <img src={iconeSair} alt="Icone de Sair" />
            </i>
            <span>Sair</span>
          </li>
        </Link>
      </p>
      <p style={{display: 'flex', height: '10%', flexDirection: 'column', justifyContent: 'end', width: '100%'}}>
        {permissoes.includes("ROLE_ATENDIMENTO") && (
          <Link
            onClick={handleNavbar}
            {...(!isNavbarOpen
              ? {
                  "data-tooltip-id": "tooltip-navbar",
                  "data-tooltip-content": "Abrir Menu",
                }
              : {})}
          >
            <li key="atendente">
              <i className="seta-nav">
                <MdOutlineKeyboardDoubleArrowRight />
              </i>
              <span>Fechar Menu</span>
            </li>
          </Link>
        )}
      </p>
    </>
  );
}
