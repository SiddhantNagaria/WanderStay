const express = require("express");
const app = express();
const users = require("./user");
const posts = require("./post")
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.use(cookieParser("secretcode"));


const sessionOptions = { secret: "mysupersecretstring", resave: false, saveUninitialized: true };

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})

// app.get("/", (req, res) => {
//     res.send("Hi i am root");
// })

app.get("/test", (req, res) => {
    res.send("test successful");
})

app.get("/reqcount", (req, res) => {
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send(`You sent a request ${req.session.count} times`);
})

app.get("/register", (req, res) => {
    let { name = "anoynomous" } = req.query;
    req.session.name = name;
    console.log(req.session.name);
    if (name == "anoynomous") {
        req.flash("error", "user not registered !");
    } else {
        req.flash("success", "user registered successfully");
    }

    res.redirect("/hello");

})

app.get("/hello", (req, res) => {
    res.render("page.ejs", { name: req.session.name });
    // res.render("page.ejs", { name: express.session.name, msg: req.flash("success") });
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