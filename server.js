const { createPost, getPosts } = require("./database")
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT, console.log("SERVIDOR ENCENDIDO"))

app.get("/posts", async (req, res) => {
    const posts = await getPosts()
    res.json(posts)
})

app.post("/posts", async (req, res) => {
    const payload = req.body
    await createPost(payload)
    res.send("Post agregado con exito!")
})