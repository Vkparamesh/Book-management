const express = require('express');

const app = express();


const port = 8081;

app.get("/", (req, res) => {
    res.status(200).send({
        message: "hi"
    })
})

app.listen(port, (req, res) => {
    console.log("server is running")
})