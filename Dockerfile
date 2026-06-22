FROM node:20-alpine
WORKDIR /app
RUN echo '<html><body><h1>BLINK Exchange - Test</h1></body></html>' > index.html
RUN npm init -y && npm install express
RUN echo 'const express = require("express"); const app = express(); app.get("/", (req, res) => res.sendFile(__dirname + "/index.html")); app.listen(3000, "0.0.0.0", () => console.log("Running on 3000"));' > server.js
EXPOSE 3000
CMD ["node", "server.js"]
