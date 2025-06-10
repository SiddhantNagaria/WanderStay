const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const app = express();
const methodOverride = require("method-override");

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
app.use(methodOverride("_method"));


app.get("/", (req, res) => {
    res.send("Hello World");
});


//index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
})

//new route
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs");
})


//create route
app.post("/listings", async(req,res)=>{
    // let {title, description, price, image, country, location} = req.body;
    const newlisting = new Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
})

//show route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
})

//edit
app.get("/listings/:id/edit", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
})


//update route
app.put("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

//delete route
app.delete("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})

// app.get("/testListing", async(req,res)=>{
//     let sampleListing = new Listing({
//         title:"my new villa",
//         description:"on the beach",
//         price:1200,
//         location:"Goa",
//         country:"India",
//     })
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");

// })

//run server
app.listen(4000, (req, res) => {
    console.log("Server is running on port 4000");
});
