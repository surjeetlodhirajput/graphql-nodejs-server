const mongoose = require('mongoose');

const schema = mongoose.Schema;

const book = new schema({
    name:String,
    genre: String,
    authorid: String
})

module.exports = mongoose.model("Book",book)