const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

port = 3001;

const User = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quote: { type: String },
  },
  {
    collection: "user-data",
  }
);

const model = mongoose.model("UserData", User);

mongoose.connect("mongodb://localhost:27017/full-stack");

// const Cat = mongoose.model("Cat", { name: String });

// const kitty = new Cat({ name: "Zildjian" });
// kitty.$getAllSubdocs()
// // kitty.save().then(() => console.log("meow"));

app.set("view engine", "ejs");

app.post("/api/register/", async (req, res) => {
  // res.send('Hello World!');
  // res.render("index.ejs");
  console.log(req.body);
  try {
    const user = await model.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ statusbar: "success" });
  } catch (error) {
    console.log(error);
    res.json({ statusbar: "error" });
  }
});

app.post("/api/login/", async (req, res) => {
  // res.send('Hello World!');
  // res.render("index.ejs");
  try {
    const user = await model.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    
    const token = jwt.sign({
      name: user.name,
      email: user.email,

    }, 'secret123')

    res.json({ statusbar: "success", message: token });

  } catch (error) {
    res.json({ statusbar: "error", message: error.message });
  }
});

// app.get("/", (req, res) => {
//   // res.send('Hello World!');
//   res.render("index.ejs");
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
