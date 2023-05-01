if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const methodOverride = require("method-override");
const path = require("path");
const AppError = require("./utils/AppError");
const session = require("express-session");
const flash = require("connect-flash");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const conRoutes = require("./routes/conversation");
const messageRoutes = require("./routes/message");

//SOCKET.IO setup
// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const httpServer = createServer(app);
//END

const faker = require("faker");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./utils/db");

const { json } = require("express");
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "notagoodsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(cors());
app.use(express.json());
app.use(flash());
app.use((req, res, next) => {
  res.locals.currUser = req.session.user;
  // console.log(currUser);
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/api/users/", userRoutes);
app.use("/api/posts/", postRoutes);
app.use("/api/conversation", conRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("user_side/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(path.resolve(), "user_side", "build", "index.html"));
  });
}

app.all("*", (req, res, next) => {
  next(new AppError("Page Not Found :|"));
});

app.listen(3001, () => {
  console.log("hey baby, You are listening 3001 port");
});

//SOCKET
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// let users = [];
// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId });
// };

// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
// };

// io.on("connection", (socket) => {
//   console.log(socket.id);
//   //take userId and socketId from user
//   socket.on("addUser", (userId) => {
//     addUser(userId, socket.id);
//     io.emit("getUsers", users);
//   });

//   //send and get message
//   socket.on("sendMessage", ({ senderId, recieverId, text }) => {
//     const user = getUser(recieverId);
//     io.to(user.socketId).emit("getMessage", {
//       senderId,
//       text,
//     });
//   });

//   //disconnect
//   socket.on("disconnect", () => {
//     console.log("disconnected");
//     removeUser(socket.id);
//     io.emit("getUsers", users);
//   });
// });
