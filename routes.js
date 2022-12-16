const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>LAB2.1</title></head>");
    res.write(
      "<body><h1>Welcome to my LAB2.1!</h1><form action='/users' method='POST'><input type='text' name='users'><button>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/users") {
    res.write("<html>");
    res.write("<body><li>User 1</li></body>");
    res.write("<body><li>User 2</li></body>");
    res.write("</html>");
    res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const username = [];
    //Lay du lieu
    req.on("data", (user) => {
      username.push(user);
    });

    // Luu vao buffer => xuat ra file du lieu
    req.on("end", () => {
      const parseUsers = Buffer.concat(username).toString();
      const user = parseUsers.split("=")[1];
      // push user vao mang users
      users.push(user);
      fs.writeFile("UserData", users, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/users");
        return res.end();
      });
      console.log(user);
    });
  }

  // Tra ve trang HTML = page not found
};

exports.handler = requestHandler;
