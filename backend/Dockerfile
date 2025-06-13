# backend/Dockerfile

# Usamos Node como base
FROM node:20

# Seteamos el directorio de trabajo
WORKDIR /app

# Copiamos el package.json y el package-lock.json
COPY package*.json ./

# Instalamos las dependencias
RUN npm install -g @nestjs/cli

# Copiamos todo el código
COPY . .

# Exponemos el puerto que usará NestJS
EXPOSE 3007

# Comando por defecto
CMD ["npm", "run", "start:dev"]
