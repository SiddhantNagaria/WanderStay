const express = require("express");
const app = express();
const users = require("./user");
const posts = require("./post")
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(cookieParser("secretcode"));


const sessionOptions = { secret: "mysupersecretstring", resave: false, saveUninitialized: true };

app.use(session(sessionOptions));

app.get("/", (req, res) => {
    res.send("Hi i am root");
})

app.get("/test", (req, res) => {
    res.send("test successful");
})

app.get("/reqcount", (req, res) => {
    res.session.count = 1;
    res.send(`You sent a request ${req.session.count} times`);
})

app.get("/register", (req, res) => {
    let { name = "anoynomous" } = req.query;
    req.session.name = name;
    console.log(req.session.name);
    res.redirect("/hello");

})

app.get("/hello", (req, res) => {
    res.send(`hello, ${req.session.name}`);
})

app.use("/users", users);
app.use("/posts", posts);


//cookies
app.get("/getcookies", (req, res) => {
    res.cookie("greet", "hello");
    res.cookie("hello", "world");
    res.send("cookies attached");
});


//cookie-parser
app.get("/", (req, res) => {
    console.dir(req.cookies);
    res.send("hi i am root");
})

app.get("/greet", (req, res) => {
    let { name = "anonymous" } = req.cookies;
    res.send(`hi ${name}`);
})

app.get("/getsignedcookie", (req, res) => {
    res.cookie("color", "red", { signed: true });
    res.send("signed cookie sent");
})

app.get("/verify", (req, res) => {
    console.log(req.cookies);
    res.send("verified");
})

app.listen(8080, (req, res) => {
    console.log("serverlistening on 8080");
})