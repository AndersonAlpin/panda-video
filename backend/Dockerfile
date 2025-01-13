# Etapa 1: Build
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Copia apenas os arquivos necessários para instalar as dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instala apenas as dependências
# RUN npm ci --only=production
RUN npm ci

# Copia o restante do código e executa a build
COPY . .
RUN npm run build

# Etapa 2: Runtime
FROM node:22-alpine

WORKDIR /usr/src/app

# Copia apenas os arquivos necessários da etapa de build
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

# Define as portas expostas
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:migrate:deploy"]