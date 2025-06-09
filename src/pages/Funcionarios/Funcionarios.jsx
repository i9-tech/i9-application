import { useState, useEffect } from "react";
import CadastroFuncionarioFormulario from "../../components/Funcionario/FuncionarioForm/CadastroFuncionarioFormulario";
import TabelaFuncionarios from "../../components/Funcionario/FuncionarioTab/TabelaFuncionarios";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import "./Funcionarios.css";
import api from "../../provider/api";
import { getFuncionario } from "../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { ENDPOINTS } from "../../utils/endpoints";
import CarregamentoFormulario from "../../components/Carregamento/CarregamentoFormulario";


export function Funcionarios() {
  const funcionarioLogin = getFuncionario();
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
  const [funcionarios, setFuncionarios] = useState([]);

  const [loading, setLoading] = useState(false);
  const [porcentagemCarregamento, setPorcentagemCarregamento] = useState(0);

  useEffect(() => {
    if (!funcionarioLogin?.userId) return;

    api
      .get(`${ENDPOINTS.FUNCIONARIOS}/${funcionarioLogin.empresaId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setFuncionarios(response.data);
      })
      .catch((error) => {
        toast.error("Erro ao buscar os funcionários!");
        console.error("Erro ao buscar os funcionários:", error);
      });
  }, [funcionarioLogin.empresaId, funcionarioLogin.userId]);

  const handleSelecionar = (funcionario) => {
    setFuncionarioSelecionado(funcionario);
  };

  const handleEditar = (funcionario) => {
    setFuncionarioSelecionado(funcionario);
    console.log("Editar", funcionario);
  };

  const handleDeletar = (funcionario) => {
    if (funcionario.id === funcionarioLogin.id || funcionario.proprietario) {
      toast.error("Você não pode excluir a si mesmo ou o proprietário!");
      return;
    }

    Swal.fire({
      title: "Tem certeza?",
      text: `Deseja excluir ${funcionario.nome}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: 'btn-aceitar',
        cancelButton: 'btn-cancelar',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");

        setLoading(true);
        setPorcentagemCarregamento(0);

        let progresso = 0;
        const interval = setInterval(() => {
          progresso += 10;
          setPorcentagemCarregamento(progresso);
          if (progresso >= 100) clearInterval(interval);
        }, 400);


        api
          .delete(
            `${ENDPOINTS.FUNCIONARIOS}/${funcionario.id}/${funcionarioLogin.empresaId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            clearInterval(interval);
            setPorcentagemCarregamento(100);
            if (funcionarioSelecionado?.id === funcionario.id) {
              setFuncionarioSelecionado(null);
            }
            toast.success("Funcionário excluído com sucesso!");
            atualizarListaFuncionarios();
          })
          .catch((error) => {
            console.error("Erro ao deletar funcionário:", error);
            toast.error("Erro ao deletar funcionário!");
          })
          .finally(() => {
            setTimeout(() => {
              setLoading(false);
            }, 400);
          });
      }
    });
  };

  const atualizarListaFuncionarios = () => {
    api.get(`${ENDPOINTS.FUNCIONARIOS}/${funcionarioLogin.empresaId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(response => {
        setFuncionarios(response.data);
      })
      .catch(error => {
        console.error("Erro ao atualizar lista de funcionarios", error)
        toast.error("Erro ao atualizar lista dea funcionários");
      });
  };

  return (
    <>
      {loading && <CarregamentoFormulario porcentagemCarregamento={porcentagemCarregamento} />}

      <LayoutTela titulo={"Cadastro de Funcionário"}>
        <div className="container-funcionario">
          <div className="coluna-esquerda">
            <CadastroFuncionarioFormulario
              funcionarioSelecionado={funcionarioSelecionado}
              setFuncionarioSelecionado={setFuncionarioSelecionado}
              atualizarListaFuncionarios={atualizarListaFuncionarios}
            />
          </div>

          <div className="coluna-direita">
            <TabelaFuncionarios
              funcionarios={funcionarios}
              onEditar={handleEditar}
              onDeletar={handleDeletar}
              onSelecionar={handleSelecionar}
              funcionarioSelecionado={funcionarioSelecionado}
            />
          </div>
        </div>
      </LayoutTela>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />
    </>
  );
}

export default Funcionarios;