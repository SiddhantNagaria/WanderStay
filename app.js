const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const app = express();

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

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/testListing", async(req,res)=>{
    let sampleListing = new Listing({
        title:"my new villa",
        description:"on the beach",
        price:1200,
        location:"Goa",
        country:"India",
    })
    await sampleListing.save();
    console.log("sample was saved");
    res.send("successful testing");

})
 
//run server
app.listen(4000, (req, res) => {
    console.log("Server is running on port 4000");
});
