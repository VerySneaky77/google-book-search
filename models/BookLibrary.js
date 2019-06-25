// Schema for books
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    authors:String,
    description: String,
    image: String,
    link: String
  });

// Connect to a different collection
const BookLibrary = mongoose.model("library-books", bookSchema);
module.exports = BookLibrary;