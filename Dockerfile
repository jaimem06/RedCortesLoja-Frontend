# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json (o pnpm/yarn.lock)
COPY package*.json ./

# Instala las dependencias
RUN npm install --production

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación Next.js
RUN npm run build

# Expone el puerto en el que corre Next.js
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
