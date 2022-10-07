const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    productId: {
        type: Number,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    detail: {
        type: String,
    },
    image: {
        type: String
    }

});

const ProductModel = mongoose.model("ProductModel", UserSchema);

module.exports = ProductModel;