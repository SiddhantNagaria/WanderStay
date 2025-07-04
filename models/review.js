const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSChema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("Review", reviewSChema);