export const enviroments = {
  tokenURL: import.meta.env.VITE_IMAGE_TOKEN_URL,
  ambiente: import.meta.env.VITE_AMBIENTE,
  apiURL: (() => {
    switch (import.meta.env.VITE_AMBIENTE) {
      case "jsonserver":
        return import.meta.env.VITE_API_BASE_URL_LOCAL;
      case "spring":
        return import.meta.env.VITE_API_BASE_URL_DEV;
      case "prod":
        return import.meta.env.VITE_API_BASE_URL_PROD;
      default:
        console.warn("Ambiente desconhecido. Usando backend local.");
        return import.meta.env.VITE_API_BASE_URL_LOCAL;
    }
  })(),
};
