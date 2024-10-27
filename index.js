const express = require("express");
const cors = require("cors");
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1886464",
  key: "8f26045999c3fc72d5a0",
  secret: "312bad14d316ac772f52",
  cluster: "ap1",
  useTLS: true,
});

const app = express();

app.use(
  cors({
    origin: ["http://localhost:8080"],
  })
);

app.use(express.json());

app.post("/api/messages", async (req, res) => {
  await pusher.trigger("chat", "message", {
    username: req.body.username,
    message: req.body.message,
  });
  res.json(["Message has been sent"]);
});

console.log("listening to port 8080");
app.listen(8000);
