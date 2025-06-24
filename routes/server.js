const express = require("express");
const app = express();
const users = require("./user");
const posts = require("./post")
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(cookieParser("secretcode"));

app.use(session({secret:"mysupersecretstring"}));

app.get("/", (req, res) => {
    res.send("Hi i am root");
})

app.get("/test ",(req,res)=>{
    res.send("test successful");
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

app.get("/verify",(req,res)=>{
    console.log(req.cookies);
    res.send("verified");
})

app.listen(8080, (req, res) => {
    console.log("serverlistening on 8080");
})