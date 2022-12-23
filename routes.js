const fs = require("fs");
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    // Tao event listen data
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    //Luu vao buffer
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString(); // Lay data tu body luu vao buffer
      const message = parsedBody.split("=")[1]; // tach chuoi
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/"); // chuyen huong url ve localhost:3000/
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
};

// module.exports = {
//   handler: requestHandler,
//   someText: "Some hard code text",
// };
// Cach2
exports.handler = requestHandler;
exports.someText = "Some hard code text";
