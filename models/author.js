const mongoose = require('mongoose');

const schema = mongoose.Schema;

const author = new schema({
    name:String,
    age: Number
})

module.exports = mongoose.model("Author",author);