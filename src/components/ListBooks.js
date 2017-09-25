import React from 'react';
import Shelf from './Shelf'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ListBooks(props) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        { /* div wrapping side-by-side shelf components */}
        <div>

          {props.shelves.map((shelf, i) => (
            <Shelf heading={shelf.heading}
              key={i}
              books={props.books.filter(book => book.shelf===shelf.name)}
              handleReshelving={props.handleReshelving}
            />
          ))}
        {/* end side-by-side div wrapping shelf components */}
        </div>
      {/* end div list-books-content */}
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

ListBooks.propTypes = {
  handleReshelving: PropTypes.func,   // prop threading for App to change a book's shelf
  books: PropTypes.array,             // list of all books to display in shelves
  shelves: PropTypes.array            // list of names and titles for each shelf
};

export default ListBooks;