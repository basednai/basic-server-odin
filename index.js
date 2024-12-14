const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((request, response) => {
  let filePath;
  console.log(request.url);

  if (request.url == "/favicon.ico") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end();
  } else {
    const fileName = request.url == "/" ? "index.html" : `${request.url}.html`;

    filePath = path.join(__dirname, fileName);

    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        if (err.code == "ENOENT") {
          fs.readFile(
            path.join(__dirname, "404.html"),
            "utf8",
            (err, content) => {
              response.writeHead(200, { "Content-Type": "text/html" });
              response.end(content);
            }
          );
        }
        return;
      }

      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(content);
    });
  }
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(PORT));
