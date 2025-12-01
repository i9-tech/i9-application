# Usa uma imagem leve do Nginx
FROM nginx:alpine

# Remove a configuração padrão do Nginx para evitar conflitos
RUN rm /etc/nginx/conf.d/default.conf

# Copia a pasta de build (que o GitHub Actions gerou e enviou) para o Nginx
COPY ./dist /usr/share/nginx/html

# Copia sua configuração personalizada do Nginx
COPY ./nginx/app.conf /etc/nginx/conf.d/

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]