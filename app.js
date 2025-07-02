const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js")

async function connectDB() {
    await mongoose.connect("mongodb://localhost:27017/WanderStay");
}
connectDB()
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true, //prevents cross - scripting attacks
    }
}

app.use(session(sessionOptions));

app.get("/", (req, res) => {
    res.send("Hello World");
});


app.use("/listings", listings);// parent route
app.use("/listings/:id/reviews", reviews); //parent route


//wildcard route
app.all("/{*any}", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Page not found" } = err;
    // res.status(statusCode).send(message);
    // res.send("Something went wrong");
    res.status(statusCode).render("error.ejs", { message });
})

//run server
app.listen(4000, (req, res) => {
    console.log("Server is running on port 4000");
});
