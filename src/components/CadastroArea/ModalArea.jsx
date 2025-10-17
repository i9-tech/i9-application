import { useState, useEffect } from "react";
import DadosTabela from "../SetorCategoria/DadosTabela/DadosTabela";
import "./ModalArea.css";
import { ENDPOINTS } from "../../utils/endpoints";
import api from "../../provider/api";
import { getFuncionario } from "../../utils/auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


const ModalArea = ({ isOpen, onClose, isLoadingData, dados, setDados }) => {
  const [nome, setNome] = useState("");
  const [areaPreparo, setAreaPreparo] = useState([]);
  const [editandoAreaId, setEditandoAreaId] = useState(null);
  const funcionario = getFuncionario();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (dados) setAreaPreparo(dados);
  }, [dados]);

  useEffect(() => {
    api
      .get(`${ENDPOINTS.AREA_PREPARO}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setAreaPreparo(res.data);
          if (setDados) setDados(res.data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar áreas de preparo:", err);
        toast.error("Erro ao buscar áreas de preparo!");
      });
  }, [funcionario.userId, token, setDados]);

  const handleEditar = (area) => {
    setNome(area.nome);
    setEditandoAreaId(area.id);
  };

  const handleExcluir = (area) => {
    Swal.fire({
      title: "Tem certeza?",
      text: `Deseja excluir a área "${area.nome}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "btn-aceitar",
        cancelButton: "btn-cancelar",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`${ENDPOINTS.AREA_PREPARO}/${area.id}/${funcionario.userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            setAreaPreparo((prev) => prev.filter((item) => item.id !== area.id));
            if (setDados)
              setDados((prev) => prev.filter((item) => item.id !== area.id));
            toast.success("Área excluída com sucesso!");
          })
          .catch((err) => {
            console.error("Erro ao excluir área:", err);
            toast.error("Erro ao excluir área!");
          });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim()) {
      alert("Preencha o nome da área!");
      return;
    }

    const dadosNovaArea = { nome };

    if (editandoAreaId) {
      api
        .put(
          `${ENDPOINTS.AREA_PREPARO}/${editandoAreaId}/${funcionario.userId}`,
          dadosNovaArea,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setAreaPreparo((prev) =>
            prev.map((item) => (item.id === editandoAreaId ? res.data : item))
          );
          if (setDados)
            setDados((prev) =>
              prev.map((item) => (item.id === editandoAreaId ? res.data : item))
            );
          setNome("");
          setEditandoAreaId(null);
          toast.success("Área editada com sucesso!"); 
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.errors) {
            err.response.data.errors.forEach((error) => {
              toast.error(error.defaultMessage);
            });
          } else {
            console.error("Erro ao editar área:", err);
            toast.error("Erro ao editar área!");
          }
        });
    } else {
      api
        .post(`${ENDPOINTS.AREA_PREPARO}/${funcionario.userId}`, dadosNovaArea, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setAreaPreparo((prev) => [...prev, res.data]);
          if (setDados) setDados((prev) => [...prev, res.data]);
          setNome("");
          toast.success("Área cadastrada com sucesso!"); 
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.errors) {
            err.response.data.errors.forEach((error) => {
              toast.error(error.defaultMessage);
            });
          } else {
            console.error("Erro ao cadastrar área:", err);
            toast.error("Erro ao cadastrar área!");
          }
        });
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form className="modal-form" onSubmit={handleSubmit}>
              <h2>{editandoAreaId ? "Editar Área" : "Cadastro de Área"}</h2>
              <p className="modal-subtitulo">
                Cadastre uma nova área da cozinha. As áreas ajudam a organizar
                os postos de trabalho na cozinha, como chapeiro, fritadeira,
                linha fria, entre outros, para uma gestão eficiente
              </p>
              <label>Nome da Área:</label>
              <input
                type="text"
                placeholder="Área"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                maxLength={40}
              />

              <DadosTabela
                dados={areaPreparo}
                aoEditar={handleEditar}
                aoExcluir={handleExcluir}
                isLoadingData={isLoadingData}
                tipo="area"
              />

              <div className="modal-botoes">

                <button type="submit" className="btn cadastrar">
                  {editandoAreaId ? "Editar" : "Cadastrar"}
                </button>

                <button
                  type="button"
                  className="btn cancelar"
                  onClick={() => {
                    setNome("");
                    setEditandoAreaId(null);
                    onClose();
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalArea;
