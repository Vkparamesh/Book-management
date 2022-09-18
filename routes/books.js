const { json } = require("express");
const express = require("express");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

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

Router.get("/issued/books", (req, res) => {
    const userswithbooks = users.filter((each) => {
        if (each.issuedBook) return each;
    })
    const issuedbooks = [];

    userswithbooks.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedbooks.push(book);
    })
    if (issuedbooks.length === 0)
        return res.status(404).json({
            success: false,
            message: "no  issued book found"
        })


    return res.status(200).json({
        success: true,
        data: issuedbooks
    })

})


// creating the new book 
Router.post('/', (req, res) => {
    const { data } = req.body;

    if (!data) {
        return res.status(404).json({
            success: false,
            message: "no data provided"
        })

    }

    const allBooks = [...books, data];

    return res.status(200).json({
        success: true,
        message: "Book created sucessfully",
        data: allBooks
    })
})

//updationg the books

Router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const book = books.find((each) => each.id === id)

    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Books not found"
        })
    }
    const updateData = books.map((each) => {
        if (each.id === id) {
            return { ...each, ...data }
        }
        return each;

    })

    return res.status(200).json({
        success: true,
        data: updateData
    })

})

Router.get('/issued/with-fine', (req, res) => {
    const userswithbooks = users.filter((each) => {
        if (each.issuedBook) return each;
    })
    userswithbooks.forEach((each) => each)
    const getDateInDays = (data = "") => {
        let date;
        if (data === "") {
            // current date
            date = new Date();
        } else {
            // getting date on bacis of data variable
            date = new Date(data);
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
    };

    const subscriptionType = (date) => {
        if (userswithbooks.subscriptionType === "Basic") {
            date = date + 90;
        } else if (userswithbooks.subscriptionType === "Standard") {
            date = date + 180;
        } else if (userswithbooks.subscriptionType === "Premium") {
            date = date + 365;
        }
        return date;
    };

    // Subscription expiration calculation
    // January 1, 1970, UTC. // milliseconds
    let returnDate = getDateInDays(userswithbooks.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(userswithbooks.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        fine:
            returnDate < currentDate
                ? subscriptionExpiration <= currentDate
                    ? 200
                    : 100
                : 0,
    };

    res.status(200).json({
        success: true,
        data,
    });
})



module.exports = Router;