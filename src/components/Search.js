import React from 'react';
import * as BooksAPI from '../utils/BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

class Search extends React.Component {
  state = {
    query: '',
    maxResults: 20,
    results: []
  };

  static propTypes = {
    handleReshelving: PropTypes.func,   // prop threading for App book shelf update
    closeHandler: PropTypes.func        // function for returning home (remove with Routes)
  }

  // controlled component for input search box
  handleInputField = (e) => {
    this.setState({query: e.target.value.trim()});
    if (this.state.query!=='') {
      BooksAPI.search(this.state.query, this.state.maxResults).then((books) => {
        books.length>-1 && (
          this.setState({results: books})
        );
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
            {this.state.results.map((book) => (
              <li key={book.id}>
                {console.log(book.imageLinks)}
                <Book book={book} handleReshelving={this.props.handleReshelving} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;