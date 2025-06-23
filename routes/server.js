const express = require("express");
const app = express();
const users = require("./user");
const posts = require("./post")
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hi i am root");
})

app.use("/users", users);
app.use("/posts", posts);


app.get("/getcookies", (req, res) => {
    res.cookie("greet", "hello");
    res.cookie("hello", "world");
    res.send("cookies attached");
});

app.get("/", (req, res) => {
    console.dir(req.cookies);
    res.send("hi i am root");
})

app.get("/greet", (req, res) => {
    let { name = "anonymous" } = req.cookies;
    res.send(`hi ${name}`);
})

app.listen(8080, (req, res) => {
    console.log("serverlistening on 8080");
})