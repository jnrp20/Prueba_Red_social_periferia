# Archivo: frontend/Dockerfile

# --- Etapa 1: Build (Construcción) ---
# Instala dependencias y construye la app de producción
FROM node:18-alpine AS build
WORKDIR /app

# Copiar el package.json y lockfile
COPY package*.json ./

# Instalar dependencias
RUN npm install


COPY . .


RUN npm run build


FROM node:18-alpine
WORKDIR /app


COPY --from=build /app/package*.json ./
RUN npm install --omit=dev


COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public


EXPOSE 3000


CMD ["npm", "start"]