import { useState, useEffect } from "react";

export function useBloqueioTemporario(storageKey) {
  const [bloqueado, setBloqueado] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(0);

  useEffect(() => {
    const timestampDesbloqueio = localStorage.getItem(storageKey);

    if (timestampDesbloqueio) {
      const agora = Date.now();
      const diferencaEmSegundos = Math.ceil((parseInt(timestampDesbloqueio) - agora) / 1000);

      if (diferencaEmSegundos > 0) {
        setBloqueado(true);
        setTempoRestante(diferencaEmSegundos);
      } else {
        localStorage.removeItem(storageKey);
        setBloqueado(false);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    let intervalo = null;

    if (bloqueado && tempoRestante > 0) {
      intervalo = setInterval(() => {
        setTempoRestante((prev) => prev - 1);
      }, 1000);
    } else if (tempoRestante <= 0 && bloqueado) {
      setBloqueado(false);
      localStorage.removeItem(storageKey);
      if (intervalo) clearInterval(intervalo);
    }

    return () => {
      if (intervalo) clearInterval(intervalo);
    };
  }, [bloqueado, tempoRestante, storageKey]);

  const iniciarBloqueio = (segundos) => {
    const agora = Date.now();
    const timestampExpiracao = agora + (segundos * 1000);
    
    localStorage.setItem(storageKey, timestampExpiracao.toString());
    setTempoRestante(segundos);
    setBloqueado(true);
  };

  const formatarTempo = () => {
    const minutos = Math.floor(tempoRestante / 60);
    const segs = tempoRestante % 60;
    return `${minutos}:${segs < 10 ? "0" : ""}${segs}`;
  };

  return {
    bloqueado,
    tempoRestante,
    iniciarBloqueio,
    formatarTempo
  };
}