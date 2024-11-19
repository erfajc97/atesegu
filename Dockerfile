# Etapa 1: Construcción del proyecto
FROM node:18-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios al contenedor
COPY . .

# Instala pnpm
RUN npm install -g pnpm

# Instala las dependencias del proyecto
RUN pnpm install --frozen-lockfile

# Construye el proyecto Astro (incluyendo React)
RUN pnpm build

# Etapa 2: Servidor de producción
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto y los archivos generados
COPY --from=builder /app .

# Instala solo las dependencias necesarias para producción
RUN pnpm install --prod --frozen-lockfile

# Expone el puerto en el que se ejecutará el servidor
EXPOSE 3000

# Comando para iniciar el servidor Astro
CMD ["pnpm", "start"]
