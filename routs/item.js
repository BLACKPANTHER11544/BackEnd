const express = require("express");
const router = express.Router();
const ItemModel = require('../model/item')

router.route('/').get((req, res) => {
    ItemModel.find({})
        .then((data) => res.json("All Exercsie " + data))
        .catch((e) => res.json("Unexpected Error Accored " + e))
})

router.route("/add").post((req, res) => {
    const { username, description } = req.body;
    const price = Number(req.body.price);
    console.log(username , description , price) ;
    const date = Date.parse(req.body.date);
    const newExercise = new ItemModel({
        username,
        description,
        price,
        date
    });
    newExercise.save()
        .then((data) => res.json("Item Added Successfully " + data))
        .catch((e) => res.json("Item Can't be Added because " + e));
})

router.route("/:id").get((req, res) => {
    const  id  = req.params.id;
    ItemModel.findById(id)
        .then((data) => { res.json(`Item with ID ${id} is `+ data) })
        .catch((e) => { res.status(400).json("No item found"+e) });
})

router.route("/delete/:id").delete((req, res) => {
    const  id  = req.params.id ;
    ItemModel.findByIdAndDelete(id)
        .then((data) => { res.json(`Item With ID ${id} is deleted`, data) })
        .catch((e) => { res.status(400).json(`Item of ID ${id} cant be deleted `+ e) });
})

router.route("/update/:id").put((req, res) => {
    const  id  = req.params.id;
    ItemModel.findByIdAndUpdate(id)
        .then((item) => {
            item.username = req.body.username;
            item.description = req.body.description;
            item.price = req.body.price;
            item.date = req.body.date
            item.UserRef = req.body.UserRef;

            item.save()
                .then(data => { res.json(item) })
                .catch(e => { res.json("Update Error "+ e) });
        })
        .catch(e=>{res.status(400).json("update error outer catch block "+ e )})
})


module.exports = router ;