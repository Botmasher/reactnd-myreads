import React from 'react'
import Search from './Search';
import Shelf from './Shelf';
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI';
import '../App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO:  - Utilize state to fetch books and pass to Shelf components.
     *        - Switch from test data to fetching from BookAPI
     *
     * Structure:
     * Shelf component should list its associated Book components.
     * Book component should know its past-pres-fut categorization.
     * Book component should also have a title, author, imgUrl, imgHeight, imgWidth
     * Store structure:
     * [{book_1}, {book_2}, ... {book_n}]
     * Book structure:
     * {title, author, status, imgURL, imgHeight, imgWidth}
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
          />
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              { /* div wrapping side-by-side shelf components */}
              <div>

                {this.state.shelves.map((shelf, i) => (
                  <Shelf heading={shelf.heading}
                    key={i}
                    books={this.state.books.filter(book => book.shelf===shelf.name)}
                    handleReshelving={this.handleReshelving}
                  />
                ))}
              {/* end side-by-side div wrapping shelf components */}
              </div>
            {/* end div list-books-content */}
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp