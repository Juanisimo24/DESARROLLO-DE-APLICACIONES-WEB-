const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3000;


// TODO: configure the express server
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));



let posts = [];
let name= "";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.get("/login", (req, res) => {
  name = req.query.name || "Guest";
  res.render("test", { name: name, method: "GET" });
});

app.post("/login", (req, res) => {
  name = req.body.name || "Guest";
  res.render("test", { name: name, method: "POST" });
});

app.post("/new-post", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(newPost);
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  if (!name) return res.redirect("/");
  res.render("home", { name: name, posts: posts });
});

app.get("/post/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.redirect("/home");
  res.render("post", { post: post });
});

app.post("/edit-post/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    post.content = req.body.content;
  }
  res.redirect("/home");
});

app.post("/delete-post/:id", (req, res) => {
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  res.redirect("/home");
});

app.listen(port, () => {
  console.log("Listening on port 3000");
});
