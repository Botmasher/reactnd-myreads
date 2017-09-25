import React from 'react'
import Search from './Search';
import ListBooks from './ListBooks';
import { Route } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import '../App.css';

/*
 * Behavior:
 *  - App component routes to a list of Shelves or a Search component
 *  - Shelf component lists its associated Book components.
 *  - Search component returns query results as Book components.
 *  - Book component takes in JSON object and uses title, author, thumb, id, shelf.
 *  - Book component has dropdown that updates its shelf categorization.
 */
class BooksApp extends React.Component {
  state = {
    /*
     * Store structure:
     * {books, shelves}
     * Property structure for 'books'
     * [{book_1}, {book_2}, ... {book_n}]
     * Property structure for each book of books - directly mirrors from API results
     *
     * Map of relations:
     * - Book has one Shelf
     * - Shelf has many Books
     * - Store has many Shelves
     */

    // name and display heading for each shelf
    books: [],
    shelves: [
      {
        name: 'currentlyReading',
        heading: 'Currently Reading'
      },
      {
        name: 'wantToRead',
        heading: 'Want to Read'
      },
      {
        name: 'read',
        heading: 'Read'
      }
    ]
  };

  // take in a book id and return its current shelf (if any)
  // - added to handle API query results, which return objects with no shelf property
  // - only called within the Search component to shelve query results 
  checkShelf = (book) => {
    const shelvedBooks = this.state.books.filter(b => b.id===book.id);
    return shelvedBooks.length > 0 ? shelvedBooks[0].shelf : 'none';
  }

  // take in a book id and return its authors
  // - added to handle API query results, which return objects with no authors property
  // - only called within Search component to display query results
  checkAuthor = (book) => {
    const authoredBooks = this.state.books.filter(b => b.id===book.id);
    return authoredBooks[0] === undefined ? [''] : authoredBooks[0].authors;
  }

  // Change the book's backend shelf and update the local shelf state to match
  // - take a single book object  /!\ currently sending in already-modified book /!\
  // - run an API update
  // - update the local array
  handleReshelving = (reshelvedBook, shelf) => {
    // update the book through the backend
    BooksAPI.update(reshelvedBook, shelf)
    // update book's state in app
    .then((updatedShelves) => {
      // API returns an object with {shelf:[id,...],} pairs for the three shelves
      // Use the object to update local shelf state for the book
      this.setState({books: [
          ...this.state.books.filter(b => b.id!==reshelvedBook.id),
          {...reshelvedBook, shelf}
        ]
      });
    });
  }
  
  // Get API data once component has rendered
  componentDidMount() {
    // then-chaining on API promise to get resolved array object
    BooksAPI.getAll().then(books => (
      this.setState({books})
    ));
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search
            handleReshelving={this.handleReshelving}
            checkShelf={this.checkShelf}
            checkAuthor={this.checkAuthor}
          />
        )}/>
        <Route exact path="/" render={() => (
          <ListBooks
            handleReshelving={this.handleReshelving}
            books={this.state.books}
            shelves={this.state.shelves}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp;