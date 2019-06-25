const router = require("express").Router();
const booksController = require("../../controllers/booksController");
const libraryController = require("../../controllers/libraryController");

// Matches with "/api/books"
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

  // Matches with "/api/books/google-library"
  router.route("/google-library")
    .get(libraryController.findAll)
    .post(libraryController.create);
  
  // Matches with "/api/books/google-library/:title"
  router
    .route("/google-library/:title")
    .get(libraryController.findByTitle)
    .put(libraryController.update)
    .delete(libraryController.remove);
  
  module.exports = router;
