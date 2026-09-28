FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar primero los archivos de dependencias (para aprovechar la cache de Docker)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# Exponer el puerto que usa la aplicación
EXPOSE 3000

# Comando para ejecutar el servidor
CMD ["npm", "start"]