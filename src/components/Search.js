import React from 'react';
import * as BooksAPI from '../utils/BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

// App search component - parent of books
class Search extends React.Component {
  state = {
    query: '',          // empty query string to fill from controlled component
    results: []         // store results data returned from API .search()
  };

  static propTypes = {
    handleReshelving: PropTypes.func,   // prop threading for App book shelf update
    checkShelf: PropTypes.func,         // check shelving for a book in the bookstore
    shelves: PropTypes.array            // prop threading for Book dropdown list of all shelves
  };

  // Update a book's shelf in local results and in the root app data
  updateResultShelf = (book, shelf) => {
    // update results to contain the new shelf and trigger rerendering of the changed book
    this.setState((prevState) => {
      const results=prevState.results.map(result => result.id===book.id ? {...book, shelf} : result);
      return {results};
    });
    // pass shelf up to App for proper reshelving
    this.props.handleReshelving(book, shelf);
  };

  // Controlled input component handler called on query input
  handleInputField = (e) => {
    this.setState({query: e.target.value}, () => {
      if (this.state.query!=='') {
        /* Fetch query results from the API
         * CAUTION: book objects differ depending on where fetched!
         *  - books passed in from BooksAPI .search() query DON'T have .shelf
         *  - books passed in from BooksAPI .getAll() fetch DO have .shelf
         */
        BooksAPI.search(this.state.query).then((results) => {
          // get shelf property from parent since shelf missing from query results
          const properlyShelvedBooks = [];
          !results.error && results.map(unshelvedBook => (
            properlyShelvedBooks.push(
              {
                ...unshelvedBook,
                shelf: this.props.checkShelf(unshelvedBook)
              }
            )
          ));
          // update local results to include the shelf property
          this.setState({results: properlyShelvedBooks});
        });
      // deal with empty query since BooksAPI will not resolve with good data against it
      } else {
        this.setState({results: []});
      }
    });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/* Input controlled via query state and event handler above */}
            <input
              type="text"
              value={this.state.query}
              onChange={event => this.handleInputField(event)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/* List all books in results, including reshelved books */}
            {this.state.results.length>0 && this.state.results.map(book => (
              <li key={book.id}>
                <Book
                  data={book}
                  handleReshelving={this.updateResultShelf}
                  shelves={this.props.shelves}
                />
              </li>
            ))}
            {/* Cases where there are not good results to display */}
            {this.state.results.length<1 && this.state.query!=='' && this.state.query.length>1 && <p>No results match your search.</p>}
            {this.state.query==='' && <p>Results will display here.</p>}
            </ol>
        </div>
      </div>
    );
  }
}

export default Search;