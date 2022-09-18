const mongoose = require("mongoose");
const bookModel = require("./book-model");
const Schema = mongoose.Schema;
// const books = require("../data/books.json")
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },

        issuedBook: {
            type: mongoose.Schema.Types.ObjectId,
            ref: bookModel,
            required: false,
        },
        returnDate: {
            type: String,
            required: false,
        },
        subscriptionType: {
            type: String,
            required: true,
        },
        subscriptionDate: {
            type: String,
            required: false,
        }

    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("user", userSchema)