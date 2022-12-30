const { createPost, getPosts } = require("./database");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.listen(process.env.PORT, console.log("SERVIDOR ENCENDIDO"));

app.get("/posts", async (req, res) => {
  const posts = await getPosts();
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const payload = req.body;
  if (
    !payload.titulo ||
    !payload.url ||
    !payload.descripcion ||
    (payload.url.endsWith(".jpg") === false &&
      payload.url.endsWith(".png") === false)
  ) {
    return res.status(400).json({
      message:
        "Error 400. Por favor, rellena todos los campos. Y la URL debe terminar en .jpg o .png",
    });
  }
  await createPost(payload);
  res.send("Post agregado con exito!");
});
