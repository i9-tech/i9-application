import { Routes, Route } from "react-router-dom";
import { Atendente } from "./pages/Atendente/Atendente";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import "./App.css";
import { Funcionarios } from "./pages/Funcionarios/Funcionarios";
import { Estoque } from "./pages/Estoque/Estoque";
import { Cozinha } from "./pages/Cozinha/Cozinha";
import { Institucional } from "./pages/Institucional/Institucional";
import { Login } from "./pages/Login/Login";
import RotaPrivada from "./routes/RotaPrivada";
import NaoAutorizado from "./pages/NaoAutorizado/NaoAutorizado";
import { CadastroSetorCategoria } from "./pages/CadastroSetorCategoria/CadastroSetorCategoria";
import EstoquePratos from "./pages/EstoquePratos/EstoquePratos";
import Pratos from "./pages/FormularioPratos/Pratos";
import Produtos from "./pages/FormularioProdutos/Produtos";
import { ROUTERS } from "./utils/routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function App() {

  return (
    <>
      <main>
        <Routes>
          <Route path={ROUTERS.HOME} element={<Institucional />} />
          <Route path={ROUTERS.LOGIN} element={<Login />} />

          <Route
            path={ROUTERS.ATENDENTE}
            element={
              <RotaPrivada permissao="ROLE_ATENDIMENTO">
                <Atendente />
              </RotaPrivada>
            }
          />
          <Route
            path={ROUTERS.COMANDAS}
            element={
              <RotaPrivada permissao="ROLE_COZINHA">
                <Cozinha />
              </RotaPrivada>
            }
          />
          <Route
            path={ROUTERS.ESTOQUE_PRODUTOS}
            element={
              <RotaPrivada permissao="ROLE_ESTOQUE">
                <Estoque />
              </RotaPrivada>
            }
          />
          <Route
            path={ROUTERS.FORMULARIO_PRODUTOS}
            element={
              <RotaPrivada permissao="ROLE_ESTOQUE">
                <Produtos />
              </RotaPrivada>
            }
          />
          <Route
            path={`${ROUTERS.FORMULARIO_PRODUTOS}/:id`}
            element={
              <RotaPrivada permissao="ROLE_ESTOQUE">
                <Produtos />
              </RotaPrivada>
            }
          />
          <Route
            path={ROUTERS.ESTOQUE_PRATOS}
            element={
              <RotaPrivada permissao="ROLE_ESTOQUE">
                <EstoquePratos />
              </RotaPrivada>
            }
          />
          <Route
            path={ROUTERS.FORMULARIO_PRATOS}
            element={
              <RotaPrivada permissao="ROLE_ESTOQUE">
                <Pratos />
              </RotaPrivada>
            }
          />
          <Route
            path={`${ROUTERS.FORMULARIO_PRATOS}/:id`}
            element={
              <RotaPrivada permissao="ROLE_ESTOQUE">
                <Pratos />
              </RotaPrivada>
            }
          />
          <Route
            path={ROUTERS.SETOR_CATEGORIA}
            element={
              <RotaPrivada permissao="ROLE_PROPRIETARIO">
                <CadastroSetorCategoria />
              </RotaPrivada>
            }
          />
          <Route
            path={ROUTERS.FUNCIONARIOS}
            element={
              <RotaPrivada permissao="ROLE_PROPRIETARIO">
                <Funcionarios />
              </RotaPrivada>
            }
          />
          <Route
            path={ROUTERS.DASHBOARD}
            element={
              <RotaPrivada permissao="ROLE_PROPRIETARIO">
                <Dashboard />
              </RotaPrivada>
            }
          />
          <Route path={ROUTERS.UNAUTHORIZED} element={<NaoAutorizado />} />
        </Routes>
      </main>

      <ToastContainer position="top-right" autoClose={3000} />
      <Tooltip
        id="tooltip"
        place="right"
        style={{
          maxWidth: "200px",
          whiteSpace: "pre-line",
          wordBreak: "break-word",
          zIndex: 2,
        }}
      />
    </>
  );
}

export default App;
