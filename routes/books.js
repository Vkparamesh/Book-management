
const express = require("express");
const { getAllBooks, getSingleBookbyid, getAllissuedBooks, addNewBook, upddateBookById } = require("../controllers/book-controller");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const Router = express.Router()

// get all books
Router.get("/", getAllBooks)

// get user by id

Router.get("/:id", getSingleBookbyid)

Router.get("/issued/books", getAllissuedBooks)


// creating the new book   
Router.post('/', addNewBook)

//updationg the books

Router.put('/:id', upddateBookById)




module.exports = Router;