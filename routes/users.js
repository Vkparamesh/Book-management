const express = require("express");
const { getAllusers, getsingleUsersByid, deleteuser, UpdatedUserByID, getSubscriptionDetails, CreateNewUser } = require("../controllers/user-controller");

const { users } = require("../data/users.json");


const Router = express.Router()

// Router:/users
// method:get
// description:Get all users
// access:Public 
// parameter : None  

Router.get('/', getAllusers)

// Router:/users/id
// method:get
// description:Get particular person 
// access:Public 
// parameter : id  

Router.get("/:id", getsingleUsersByid)
// Router:/users
// method:post
// description: create the new user   
// access:Public 
// parameter : none

Router.post("/", CreateNewUser)

// Router:/users/id
// method:delet
// description: Updated user by id   
// access:Public 
// parameter : id

Router.put('/:id', UpdatedUserByID)

// Router:/users/:id
// method:put
// description: delete user by id   
// access:Public 
// parameter : id

Router.delete("/:id", deleteuser)

//getting user subscription details

Router.get('/subscription-details/:id', getSubscriptionDetails)



module.exports = Router;
