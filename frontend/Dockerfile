FROM node:18-alpine

# Diretório de trabalho
WORKDIR /usr/src/app

# Copiar arquivos de configuração e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o código da aplicação
COPY . .

# Expor a porta do Next.js
EXPOSE 3000

# Comando para iniciar o servidor Next.js
CMD ["npm", "run", "dev"]
