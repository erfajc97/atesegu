# Etapa 1: Construcción
FROM node:18-alpine AS builder

# Configuración del directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY . .

# Instalar pnpm y las dependencias del proyecto
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Construir el proyecto Astro
RUN pnpm build

# Etapa 2: Producción
FROM node:18-alpine

# Configuración del directorio de trabajo
WORKDIR /app

# Copiar los archivos generados y necesarios para producción
COPY --from=builder /app /app

# Instalar solo las dependencias necesarias para producción
RUN pnpm install --prod --frozen-lockfile

# Exponer el puerto del servidor Astro
EXPOSE 3000

# Comando para iniciar el servidor Astro
CMD ["pnpm", "start"]
