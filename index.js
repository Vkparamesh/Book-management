const express = require('express');

const app = express();

app.use(express.json());

const port = 8081;

app.get("/", (req, res) => {
    res.status(200).send({
        message: "hi"
    })
})

app.get("*", (req, res) => {
    res.status(404).send(
        {
            message: "thes route doesn't exist"
        }
    );
})

app.listen(port, (req, res) => {
    console.log("server is running")
})