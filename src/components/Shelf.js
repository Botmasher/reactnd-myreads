import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

// Single shelf component - parent of books
class Shelf extends React.Component {  
  static propTypes = {
    heading: PropTypes.string,          // display heading text for this shelf
    books: PropTypes.array,             // book data already filtered for books that belong in this shelf
    handleReshelving: PropTypes.func,   // prop threading to update book data
    shelves: PropTypes.array            // prop threading for Book dropdown list of all shelves
  };

  // Iterate over books in this shelf and display each book component
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.heading}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book,i) => (
              <li key={i}>
                <Book
                  data={book}
                  shelves={this.props.shelves}
                  handleReshelving={this.props.handleReshelving}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
};

export default Shelf;