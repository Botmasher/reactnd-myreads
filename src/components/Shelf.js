import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// Single Shelf - parent of Books
function Shelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.heading}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.length>0 && props.books.map(book => (
            <li key={book.id}>
              <Book
                data={book}
                shelves={props.shelves}
                maxTitleLength={props.titleLength}
                handleReshelving={props.handleReshelving}
              />
            </li>
          ))}
          {/* empty shelf message when no books are available to display */}
          {props.books.length===0 && (
            <Link to="/search">
              <div className="bookshelf-empty">
                Your <em>{`${props.heading}`}</em> shelf is empty. Search for books to get started!
              </div>
            </Link>
          )}
        </ol>
      </div>
    </div>
  );
}

Shelf.propTypes = {
  heading: PropTypes.string,          // display heading text for this shelf
  books: PropTypes.array,             // book data already filtered for books that belong in this shelf
  handleReshelving: PropTypes.func,   // prop threading to lift updated shelf from Book
  shelves: PropTypes.array,           // prop threading for Book dropdown list of all shelves
  titleLength: PropTypes.number       // prop threading for max book title length to display before truncating
};

export default Shelf;