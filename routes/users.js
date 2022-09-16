const express = require("express");

const { users } = require("../data/users.json");


const Router = express.Router()

// Router:/users
// method:get
// description:Get all users
// access:Public 
// parameter : None  

Router.get('/', (req, res) => {
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

Router.get("/:id", (req, res) => {
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

Router.post("/", (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((each) => each.id === id);

    if (user) {
        return res.status(404).json({
            sucess: false,
            message: "user exits  with this id",
        })
    }

    users.push({
        id, name, surname, email, subscriptionType, subscriptionDate,
    })
    return res.status(200).json({
        sucess: true,
        data: users
    })
})

// Router:/users/id
// method:delet
// description: Updated user by id   
// access:Public 
// parameter : id

Router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const user = users.find((each) => each.id === id);

    if (!user) return res.status(404).json({ success: false, message: "user not found" })

    const updateUser = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data,
            }
        }
        return each;
    })

    return res.status(200).json({
        success: true,
        data: updateUser,
    })

})

// Router:/users/:id
// method:put
// description: delete user by id   
// access:Public 
// parameter : id

Router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);

    if (!user) {
        res.status(404).json({
            success: false,
            message: "user not found",

        })
    }

    const index = users.indexOf(user);
    users.splice(index, 1);
    res.status(200).json({
        success: true,
        message: "user is deleted",
        data: users
    })

})


module.exports = Router;
