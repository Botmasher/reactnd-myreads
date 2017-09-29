import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

// Single shelf component - parent of books
function Shelf(props) {  
  // Iterate over books in this shelf and display each book component
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.heading}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book,i) => (
            <li key={i}>
              <Book
                data={book}
                shelves={props.shelves}
                maxTitleLength={props.titleLength}
                handleReshelving={props.handleReshelving}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

Shelf.propTypes = {
  heading: PropTypes.string,          // display heading text for this shelf
  books: PropTypes.array,             // book data already filtered for books that belong in this shelf
  handleReshelving: PropTypes.func,   // prop threading to update book data
  shelves: PropTypes.array,           // prop threading for Book dropdown list of all shelves
  titleLength: PropTypes.number       // prop threading for max book title length to display before truncating
};

export default Shelf;