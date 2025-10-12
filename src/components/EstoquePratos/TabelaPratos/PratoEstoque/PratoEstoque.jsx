import { useEffect, useState } from "react";
import "./PratoEstoque.css";
import { useNavigate } from "react-router-dom";
import api from "../../../../provider/api";
import { ENDPOINTS } from "../../../../utils/endpoints";
import { imagemPadrao } from "../../../../assets/imagemPadrao";
import { enviroments } from "../../../../utils/enviroments";
import { getFuncionario } from "../../../../utils/auth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const PratoEstoque = ({ prato, buscar }) => {
  const navigate = useNavigate();
  const [valorVendaFormatado, setValorVendaFormatado] = useState("");
  const tokenImagem = enviroments.tokenURL;
  const [urlImagem, setUrlImagem] = useState("");
  const funcionario = getFuncionario();

  useEffect(() => {
    // FORMATAÇÃO VALOR
    const VendaFormatado = Number(prato.valorVenda).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setValorVendaFormatado(VendaFormatado);

    if (prato.imagem) {
      if (enviroments.ambiente === "jsonserver") {
        setUrlImagem(prato.imagem);
      } else {
        setUrlImagem(prato.imagem + tokenImagem);
      }
    } else {
      setUrlImagem(null);
    }
  }, [prato, tokenImagem]);

  const editar = (prato) => {
    navigate(`formulario-pratos/${prato.id}`);
  };

  const deletar = (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Deseja excluir este prato?",
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
          .delete(`${ENDPOINTS.PRATOS}/${id}/${funcionario.userId}`, {
            headers: {
              Authorization: `Bearer ${funcionario.token}`,
            },
          })
          .then(() => {
            toast.success("Prato removido com sucesso!");
            buscar();
          })
          .catch((err) => {
            console.error("Erro ao remover prato:", err);
            toast.error("Erro ao remover prato!");
          });
      }
    });
  };

  return (
    <tr className="linha-prato">
      <td>{prato.id}</td>
      <td>
        <div className="imagem-container">
          <img src={urlImagem || imagemPadrao} alt={prato.nome} />
        </div>
      </td>
      <td>{prato.nome}</td>
      <td>{valorVendaFormatado}</td>
      <td>
        {prato.disponivel ? (
          <span className="disponível">✅ Ativo</span>
        ) : (
          <span className="indisponível">🚫 Inativo</span>
        )}
      </td>
      <td>{prato.setor?.nome}</td>
      <td>{prato.categoria?.nome}</td>
      <td>{prato.setor?.nome}</td> {/* modificar para AREA */}
      <td title={prato.descricao}>{prato.descricao}</td>
      <td className="acoes">
        <button onClick={() => editar(prato)}>✏️</button> |
        <button onClick={() => deletar(prato.id)}>🗑️</button>
      </td>
    </tr>
  );
};

export default PratoEstoque;
