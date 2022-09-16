const express = require("express");

const { books } = require("../data/books.json");

const Router = express.Router()

// get all books
Router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: books,
    })
})

// get user by id

Router.get("/:id", (req, res) => {
    const { id } = req.params;
    const book = books.find((each) => each.id === id)
    if (!book) {
        res.status(404).json({ message: "book not found" })
    }
    return res.status(200).json({
        success: true,
        data: book,
    })

})




module.exports = Router;