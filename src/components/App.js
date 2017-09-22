import React from 'react'
import Search from './Search';
import Shelf from './Shelf';
import * as BooksAPI from '../utils/BooksAPI';
import '../App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
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

  // screen handler passed into search component to simulate routing (return home)
  toggleSearchHandler = () => {
    this.setState(prevState => ({
      showSearchPage: !prevState.showSearchPage
    }));
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
        {this.state.showSearchPage ? (
          <Search
            closeHandler={this.toggleSearchHandler}
            handleReshelving={this.handleReshelving}
            checkShelf={this.checkShelf}
          />
        ) : (
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
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>

          {/* end div list-books */}
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp