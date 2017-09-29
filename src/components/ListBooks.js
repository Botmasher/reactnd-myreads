import React from 'react';
import Shelf from './Shelf'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Books list component for displaying all bookshelves - parent of shelves
function ListBooks(props) {
  return (
    <div className="list-books">
      <div className="list-books-content">
        <div className="bookshelves-wrapper">
          {/* Iterate through passed-in shelves and create each bookshelf with its shelved books */}
          {props.shelves.map((shelf) => (
            shelf!==undefined && shelf.name!=='none' && props.books[shelf.name].length>0 && (
              <Shelf
                key={shelf.name}
                heading={shelf.heading}
                shelves={props.shelves}
                books={props.books[shelf.name]}
                handleReshelving={props.handleReshelving}
                titleLength={props.titleLength}
              />
            )
          ))}
        </div>
      </div>
      {/* Link to redirect to search component */}
      <div className="open-search">
        <Link to="/search"><span className="open-search-text">Add books</span></Link>
      </div>
    </div>
  );
}

ListBooks.propTypes = {
  handleReshelving: PropTypes.func,   // prop threading for App to change a book's shelf
  books: PropTypes.object,            // list of all books to display in shelves
  shelves: PropTypes.array,           // prop threading for Book dropdown list of all shelves
  titleLength: PropTypes.number       // prop threading for character count at which display titles are truncated
};

export default ListBooks;