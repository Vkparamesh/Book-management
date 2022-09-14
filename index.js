const { Router } = require('express');
const express = require('express');
const { books } = require("./data/books.json");
const { users } = require("./data/users.json");


const app = express();

app.use(express.json());

const port = 8081;

app.get("/", (req, res) => {
    res.status(200).send({
        message: "hi"
    })
})


// Router:/users
// method:get
// description:Get all users
// access:Public 
// parameter : None  

app.get('/users', (req, res) => {
    res.status(200).json({
        sucess: true,
        data: users,
    });
})

// Router:/users/id
// method:get
// description:Get particular person 
// access:Public 
// parameter : id  

app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            sucess: false,
            message: "user not found"
        })
    }
    return res.status(200).json({
        sucess: true,
        data: user
    })
})
// Router:/users
// method:post
// description: create the new user   
// access:Public 
// parameter : none

app.post("/users", (req, res) => {

})






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