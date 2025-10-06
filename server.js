const express = require("express");
// const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require('cors');

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

require('dotenv').config({ path: '.env.local'});
const pg = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    // port: 3001
  },
});

pg.raw('SELECT 1')
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((err) => {
    console.error("Database connection failed.");
  });

const app = express();

app.use(express.json());
app.use(cors())


app.get('/', (req, res)=> { res.send('Server is running') })
app.post("/signin", async (req, res) => await signin.handleSignin(req, res, pg, bcrypt));
app.post("/register", async (req, res) => await register.handleRegister(req, res, pg, bcrypt));
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, pg)});
app.put("/image", (req, res) => { image.handleImage(req, res, pg)});

app.listen(3001, () => {
  console.log("app is running on port 3001");
});
