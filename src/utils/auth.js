import { jwtDecode } from "jwt-decode";

export function getFuncionario() {
    const funcionario = localStorage.getItem("funcionario");
    return funcionario ? JSON.parse(funcionario) : {};
}

export function getPermissoes() {
  const token = localStorage.getItem("token");
  
  if (token) {
    const tokenTraduzido = jwtDecode(token);
    // console.log("Token traduzido:", tokenTraduzido);  

    const permissoes = tokenTraduzido.authorities ? tokenTraduzido.authorities.split(',') : [];
    // console.log("Permissões:", permissoes);
    
    return permissoes;
  }

  return [];
}