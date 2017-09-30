import React from 'react';
import * as BooksAPI from '../utils/BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

// Search - parent of Books
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',        // search string for controlled input
      results: []       // saved books from API .search()
    };
  }

  static propTypes = {
    handleReshelving: PropTypes.func,   // lift changed shelf up to App for proper reshelving
    checkShelf: PropTypes.func,
    shelves: PropTypes.array            // prop threading for Book dropdown list of all shelves
  };

  updateResultShelf = (book, shelf) => {
    // update results to contain the new shelf and trigger rerendering of the changed book
    this.setState((prevState) => {
      const results=prevState.results.map(result => result.id===book.id ? {...book, shelf} : result);
      return {results};
    });
    this.props.handleReshelving(book, shelf);
  };

  handleInputField = (e) => {
    this.setState({query: e.target.value}, () => {
      if (this.state.query!=='') {
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
            {this.state.results.length>0 && this.state.results.map(book => (
              <li key={book.id}>
                <Book
                  data={book}
                  handleReshelving={this.updateResultShelf}
                  shelves={this.props.shelves}
                />
              </li>
            ))}
            {/* cases where there are not good results to display */}
            {this.state.results.length<1 && this.state.query!=='' && this.state.query.length>1 && <p>No results match your search.</p>}
            {this.state.query==='' && <p>Results will display here.</p>}
            </ol>
        </div>
      </div>
    );
  }
}

export default Search;