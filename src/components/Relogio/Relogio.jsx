import React, { useEffect, useState } from "react";

export default function Relogio() {
  const [horarioAtual, setHorarioAtual] = useState(formatarHorario());

  function formatarHorario() {
    return new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  useEffect(() => {
    setHorarioAtual(formatarHorario());

    const agora = new Date();
    const delay = (60 - agora.getSeconds()) * 1000;

    const timeout = setTimeout(() => {
      setHorarioAtual(formatarHorario());

      const intervalo = setInterval(() => {
        setHorarioAtual(formatarHorario());
      }, 60 * 1000);

      return () => clearInterval(intervalo);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return <span>{horarioAtual}</span>;
}
