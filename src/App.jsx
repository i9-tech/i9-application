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
              <RotaPrivada permissao="acesso_setor_atendimento">
                <Atendente />
              </RotaPrivada>
            }
          />
          <Route
            path="/cozinha"
            element={
              <RotaPrivada permissao="acesso_setor_cozinha">
                <Cozinha />
              </RotaPrivada>
            }
          />
          <Route
            path="/estoque"
            element={
              <RotaPrivada permissao="acesso_setor_estoque">
                <Estoque />
              </RotaPrivada>
            }
          />
          <Route
            path="/funcionarios"
            element={
              <RotaPrivada permissao="proprietario">
                <Funcionarios />
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
