require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  allowExitOnIdle: true,
});

const createPost = async (payload) => {
  const query = {
    text: "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *",
    values: [payload.titulo, payload.url, payload.descripcion, 0],
  };
  try {
    const result = await pool.query(query);
    console.log("Post creado");
    return result.rows;
  } catch (e) {
    console.log("Error al insertar datos en tabla posts:", e.code, e.message);
    throw new Error(e);
  }
};

const getPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  console.log(rows);
  return rows;
};

module.exports = { createPost, getPosts };
