import React from 'react';
import * as BooksAPI from '../utils/BooksAPI';
import Book from './Book';
import PropTypes from 'prop-types';

class Search extends React.Component {
  state = {
    query: '',          // empty query string to fill from controlled component
    maxResults: 20,     // results count limit to pass into API .search()
    results: []         // store results data returned from API .search()
  };

  static propTypes = {
    handleReshelving: PropTypes.func,   // prop threading for App book shelf update
    closeHandler: PropTypes.func,       // function for returning home (remove with Routes)
    checkShelf: PropTypes.func          // check shelving for a book in the bookstore
  };

  // controlled component for input search box - called on query input
  handleInputField = (e) => {
    this.setState({query: e.target.value.trim()});
    if (this.state.query!=='') {
      // get query results from the API
      BooksAPI.search(this.state.query, this.state.maxResults).then((results) => {
        // get book shelf property from parent since query results have no shelf
        const properlyShelvedBooks = [];
        results.map(unshelvedBook => (
          properlyShelvedBooks.push(
            {...unshelvedBook, shelf: this.props.checkShelf(unshelvedBook)}
          )
        ));
        // update local results to include the shelf property
        results.length>-1 && this.setState({results: properlyShelvedBooks});
      });
    }
  };

  render() {

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={this.props.closeHandler}>Close</a>
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
            {this.state.results.map(book => (
              <li key={book.id}>
                <Book data={book} handleReshelving={this.props.handleReshelving} />
              </li>
            ))}
            </ol>
        </div>
      </div>
    );
  }
}

export default Search;