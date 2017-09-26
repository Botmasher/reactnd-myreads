import React from 'react';
import * as BooksAPI from '../utils/BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class Search extends React.Component {
  state = {
    query: '',          // empty query string to fill from controlled component
    maxResults: 20,     // results count limit to pass into API .search()
    results: []         // store results data returned from API .search()
  };

  static propTypes = {
    handleReshelving: PropTypes.func,   // prop threading for App book shelf update
    checkShelf: PropTypes.func,         // check shelving for a book in the bookstore
    shelves: PropTypes.array            // prop threading for all shelves
  };

  // controlled component for input search box - called on query input
  handleInputField = (e) => {
    this.setState({query: e.target.value}, () => {
      if (this.state.query!=='') {
        // get query results from the API
        // CAUTION: book objects differ depending on where fetched!
        //  - books passed in from BooksAPI .search() query DON'T have .shelf
        //  - books passed in from BooksAPI .getAll() fetch DO have .shelf
        // SOLUTION: add .shelf to searched books
        //  - check with App component if the book is in state
        //  - if the book is in state, use that shelf
        //  - otherwise, use a default .shelf

        BooksAPI.search(this.state.query, this.state.maxResults).then((results) => {
          // get properties from parent since query results are missing certain properties
          const properlyShelvedBooks = [];
          !results.error && results.map(unshelvedBook => (
            properlyShelvedBooks.push(
              // add the parent authors and shelf properties since query results lack them
              {
                ...unshelvedBook,
                shelf: this.props.checkShelf(unshelvedBook)
              }
            )
          ));

          // update local results to include the shelf property
          this.setState({results: properlyShelvedBooks});
        });
        // TODO deal with empty results array [] - render out results are 0
        // TODO display zero results instead of previous results when erase search
        // TODO update search results when type a single letter
        // TODO poor results
          // - "stylistics" query does not match to "Practical Stylistics"
          // - "ra" query matches to "Robotics"
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
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
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
          {/*
            problems:
              - results empty: map cannot map over undefined
                - current workaround: set this.state.results only if API results are >-1
              - query empty: cannot get API results for undefined (403 error)
                - current workaround: only run API .search() if query is not empty string
              - book component shelf: for all books their shelf is undefined
                - when subcomponents of Search only (not when in Shelf)
              - book added to shelf: book's handleReshelving is not a function
                - run in: Books.js input onChange
                - current workaround: none
          */}
            {this.state.results.length>0 && this.state.results.map(book => (
              <li key={book.id}>
                <Book
                  data={book}
                  handleReshelving={this.props.handleReshelving}
                  shelves={this.props.shelves}
                />
              </li>
            ))}
            {this.state.results.length<1 && this.state.query!=='' && this.state.query.length>1 && <p>No results match your search.</p>}
            {this.state.query==='' && <p>Results will display here.</p>}
            </ol>
        </div>
      </div>
    );
  }
}

export default Search;