const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Username</title></head>");
    res.write(
      "<body><form action='/users' method='POST'><input type='text' name='users'><button>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/users" && method === "POST") {
    const username = [];
    //Lay du lieu
    req.on("data", (user) => {
      username.push(user);
    });

    // Luu vao buffer => xuat ra file du lieu
    req.on("end", () => {
      const parseUsers = Buffer.concat(username).toString();
      const user = parseUsers.split("=")[1];
      fs.writeFile("UserData", user, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
      console.log(user);
    });
  }

  if (url === "/create-user") {
  }

  res.write("<html>");
  res.write("<body><li>");
  res.write(user);
  res.write("</li></body>");

  res.write("</html>");
};

exports.handler = requestHandler;
