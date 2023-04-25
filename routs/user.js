const express = require("express");
const router = express.Router();
const UserModel = require("../model/user");

router.get("/",(req, res) => {
    UserModel.find({}).then((data) => res.json(data)).catch((e) => res.status(400).json("Error" + e))
})

router.route("/add").post((req, res) => {
    const username  = req.body.userName;
    const newUser = new UserModel({userName : username});
    newUser.save()
    .then((newUser)=> res.json("User Added Successfully "+newUser) )
    .catch((e)=>{res.json("Unexpected Error Accored "+e)})

})

module.exports = router ;