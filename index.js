const express = require('express');
const dotenv = require("dotenv");

const DbConnection = require("./databaseConnection");

const userRoute = require("./routes/users");
const booksRoute = require("./routes/books");

const { UserModel, BookModel } = require("./models/index")

dotenv.config()


const app = express();

DbConnection();

app.use(express.json());

const port = 8081;




app.get("/", (req, res) => {
    res.status(200).send({
        message: "hi"
    })
})

app.use("/users", userRoute);
app.use("/books", booksRoute);

app.get("*", (req, res) => {
    res.status(404).json(
        {
            message: "thes route doesn't exist"
        }
    );
})

app.listen(port, (req, res) => {
    console.log("server is running")
})