# ✅ STAGE 1 — Build React App
FROM node:18 AS client-build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy React source code
COPY src ./src
COPY public ./public

# Install & build client
RUN npm install
RUN npm run build


# ✅ STAGE 2 — Build Server
FROM node:18

WORKDIR /server

# Copy server package files
COPY server/package*.json ./

RUN npm install

# Copy server source code
COPY server .

# ✅ Copy React build into server/build
COPY --from=client-build /app/build ./build

# App listens on port 8181
EXPOSE 8181

CMD ["node", "index.js"]
