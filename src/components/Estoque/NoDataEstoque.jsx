import React from "react";

export default function NoDataEstoque({tipo}) {
  return (
    <tr>
      <td
        colSpan="9"
        style={{
          padding: "24px",
          textAlign: "center",
          color: "#888",
          fontSize: "1.1rem",
          background: "#fff",
        }}
      >
        Nenhum dado de {tipo} encontrado.
      </td>
    </tr>
  );
}
