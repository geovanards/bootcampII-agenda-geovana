FROM mcr.microsoft.com/playwright:v1.56.0-jammy

WORKDIR /app
COPY package*.json ./
RUN npm ci --silent

# Garantir navegador/deps
RUN npx playwright install --with-deps chromium

COPY . .

# Build da extensão
RUN npm run build

# Rodar os testes
CMD ["npm", "test"]