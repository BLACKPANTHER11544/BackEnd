const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    UserRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
});


const Item = mongoose.model('Item', itemSchema);

module.exports = Item;