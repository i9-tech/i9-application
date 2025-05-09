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
import LayoutTela from "./components/LayoutTela/LayoutTela";
import EstoquePratos from "./pages/EstoquePratos/EstoquePratos";
import Pratos from "./pages/FormularioPratos/Pratos";
import Produtos from "./pages/FormularioProdutos/Produtos";


function App() {

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Institucional />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/atendente"
            element={
              <RotaPrivada permissao="ROLE_ATENDIMENTO">
                <Atendente />
              </RotaPrivada>
            }
          />
          <Route
            path="/cozinha"
            element={
              <RotaPrivada permissao="ROLE_COZINHA">
                <Cozinha />
              </RotaPrivada>
            }
          />
          <Route
            path="/estoque"
            element={
              <RotaPrivada permissao="ROLE_ESTOQUE">
                <Estoque />
              </RotaPrivada>
            }
          />
          <Route
            path="/estoque/formulario-produtos"
            element={
              <RotaPrivada permissao="ROLE_ESTOQUE">
                <Produtos />
              </RotaPrivada>
            }
          />
          <Route
            path="/estoque-pratos"
            element={
              <RotaPrivada permissao="ROLE_ESTOQUE">
                <EstoquePratos />
              </RotaPrivada>
            }
          />
          <Route
            path="/estoque-pratos/formulario-pratos"
            element={
              <RotaPrivada permissao="ROLE_ESTOQUE">
                <Pratos />
              </RotaPrivada>
            }
          />
            <Route
            path="/setor-categoria"
            element={
              <RotaPrivada permissao="ROLE_PROPRIETARIO">
                <CadastroSetorCategoria />
              </RotaPrivada>
            }
          />
          <Route
            path="/funcionarios"
            element={
              <RotaPrivada permissao="ROLE_PROPRIETARIO">
                <Funcionarios />
              </RotaPrivada>
            }
          />

          <Route
            path="/dashboard"
            element={
              <RotaPrivada permissao="ROLE_PROPRIETARIO">
                <Dashboard />
              </RotaPrivada>
            }
          />
        
          <Route
            path="/unauthorized"
            element={<NaoAutorizado />}
              />
        </Routes>
      </main>
    </>
  );
}

export default App;