FROM node:14

# Instalação do Oracle Instant Client
RUN apt-get update && apt-get install -y libaio1 unzip \
    && mkdir -p /opt/oracle \
    && cd /opt/oracle \
    && curl -o instantclient-basic-linux.x64-12.2.0.1.0 https://download.oracle.com/.../instantclient-basic-linux.x64-12.2.0.1.0 \
    && unzip instantclient-basic-linux.x64-12.2.0.1.0 \
    && rm instantclient-basic-linux.x64-12.2.0.1.0 \
    && sh -c "echo /opt/oracle/instantclient* > /etc/ld.so.conf.d/oracle-instantclient.conf" \
    && ldconfig

ENV DATABASE_USER=rm99646
ENV DATABASE_PASSWORD=120104
ENV DATABASE_HOST=//oracle.fiap.com.br:1521/orcl

# Configurações do banco de dados Oracle
ENV LD_LIBRARY_PATH="/opt/oracle/instantclient_19_8:$LD_LIBRARY_PATH"

# Use a imagem base do Node.js
FROM node:14-slim

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o código fonte para o diretório de trabalho
COPY . .

# Expõe a porta 8000 para fora do contêiner
EXPOSE 8000

# Comando para iniciar o servidor da API
CMD ["node", "server.js"]
