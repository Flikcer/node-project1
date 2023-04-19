// //must use common JS to import
// const Person = require("./person.js");

// const person1 = new Person("John Doe", 30);
// person1.greeting();

const http = require("http");
const path = require("path");
const fs = require("fs");

//check url, if / read file indexhtml in public folder, check for error, set status status to 200, content type and serve page
// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     fs.readFile(
//       path.join(__dirname, "public", "index.html"),
//       (err, content) => {
//         if (err) throw err;
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.end(content);
//       }
//     );
//   }
// });

// const server = http.createServer((req, res) => {
//   if (req.url === "/api/users") {
//     const users = [
//       { name: "bob", age: 30 },
//       { name: "bill", age: 35 },
//     ];
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(users));
//   }
// });

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  //extension of file
  let extName = path.extname(filePath);

  //iniitla content type
  let contentType = "text/html";

  //check ext type
  switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // Check if contentType is text/html but no .html file extension
  if (contentType == "text/html" && extName == "") filePath += ".html";

  // log the filePath
  console.log(filePath);

  //read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENONET") {
        //Page not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        //some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      //success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server runing on port ${PORT}`));
