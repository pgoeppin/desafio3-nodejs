const { createPost, getPosts } = require("./database")

const test = {
    titulo: "Hola",
    img: "no im",
    descripcion: "este es un test",
    likes: 2
}
// createPost(test);
getPosts();