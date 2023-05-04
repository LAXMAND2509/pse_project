const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductHistorySchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        default: "No link"
    },
    date: {
        type: String,
        default: "NO TIME SHOWN"
    }
});
const producthistory = mongoose.model('producthistory', ProductHistorySchema);
module.exports = producthistory;