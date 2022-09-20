const { UserModel, BookModel } = require("../models/index");

exports.getAllusers = async (req, res) => {

    const users = await UserModel.find();

    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "NO Books Found"
        })
    }


    res.status(200).json({
        sucess: true,
        data: users,
    });
}

exports.getsingleUsersByid = async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);
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
}

exports.deleteuser = async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.deleteOne({
        _id: id,
    })

    if (!user) {
        res.status(404).json({
            success: false,
            message: "user not found",

        })
    }
    res.status(200).json({
        success: true,
        message: "user is deleted",

    })

}

exports.UpdatedUserByID = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const updateUserData = await UserModel.findOneAndUpdate({
        _id: id

    }, {
        $set: {
            ...data,
        }
    }, { new: true })




    return res.status(200).json({
        success: true,
        data: updateUserData,
    })

}

exports.CreateNewUser = async (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const newUser = await UserModel.create({
        name,
        surname,
        email,
        subscriptionDate,
        subscriptionType,
    })

    if (user) {
        return res.status(404).json({
            sucess: false,
            message: "user exits  with this id",
        })
    }

    return res.status(200).json({
        sucess: true,
        data: newUser
    })
}



exports.getSubscriptionDetails = async (req, res) => {
    const { id } = req.params;

    const user = await UserModel.findById(id)
    if (!user)
        return res.status(404).json({
            success: false,
            message: "User not found",
        });

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
        if (user.subscriptionType === "Basic") {
            date = date + 90;
        } else if (user.subscriptionType === "Standard") {
            date = date + 180;
        } else if (user.subscriptionType === "Premium") {
            date = date + 365;
        }
        return date;
    };

    // Subscription expiration calculation
    // January 1, 1970, UTC. // milliseconds
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        daysLeftForExpiration:
            subscriptionExpiration <= currentDate
                ? 0
                : subscriptionExpiration - currentDate,
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

}