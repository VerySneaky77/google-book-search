import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    googleBooks: [],
    title: "",
    authors: "",
    link: "",
    description: "",
    image: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => {
        this.setState({ books: res.data, title: "", authors: "", link: "", description: "", image: "" })
      })
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.saveBook({
        title: this.state.title,
        authors: this.state.authors,
        link: this.state.link,
        description: this.state.description,
        image: this.state.image
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  handleSearch = event => {
    event.preventDefault();
    if (this.state.title) {
      API.searchLibraryTitle()
        .then(res => {
          this.setState({ googleBooks: res.data, title: "", authors: "", link: "", description: "", image: "" })
        })
    } else {
      API.searchLibrary()
        .then(res => {
          this.setState({ googleBooks: res.data, title: "", authors: "", link: "", description: "", image: "" })
        })
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Google Books Search</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title"
              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleSearch}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
        </Row>
        {/* Search results */}
        <Row>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Search Results</h1>
            </Jumbotron>
          </Col>
          {this.state.googleBooks.length ? (
            <List>
              {this.state.googleBooks.map(book => (
                <ListItem key={book._id}>
                  <Link to={"/books/google-library/" + book._id}>
                    <strong>{book.title} by {book.authors}</strong>
                  </Link>
                </ListItem>
              ))}
            </List>
          ) : (
              <h3>No Results to Display</h3>
            )}
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.authors}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
