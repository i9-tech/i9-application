export function getFuncionario() {
    const funcionario = localStorage.getItem("funcionario");
    return funcionario ? JSON.parse(funcionario) : {};
  }