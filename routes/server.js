const express = require("express");
const app = express();
const users = require("./user");
const posts = require("./post")

app.get("/",(req,res)=>{
    res.send("Hi i am root");
})

app.use("/users", users);
app.use("/posts", posts);


app.listen(8080, (req, res) => {
    console.log("serverlistening on 8080");
})