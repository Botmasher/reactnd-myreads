import React from 'react';

function Shelf(props) {
	return (
		<div className="bookshelf">
    	<h2 className="bookshelf-title">{props.title}</h2>
   		<div className="bookshelf-books">
    		<ol className="books-grid">
    		
    			{props.books.map(book => (
    				<li key={book.title}>
    					<div className="book">
	              <div className="book-top">
	                <div className="book-cover"
	                	style={{width: book.img.width,
	                	height: book.img.height,
	                	backgroundImage: `url(${book.img.url})`}}>
	                </div>
	                <div className="book-shelf-changer">
	                  <select>
	                    <option value="none" disabled>Move to...</option>
	                    <option value="currentlyReading">Currently Reading</option>
	                    <option value="wantToRead">Want to Read</option>
	                    <option value="read">Read</option>
	                    <option value="none">None</option>
	                  </select>
	                </div>
	              </div>
	              <div className="book-title">{book.title}</div>
	              <div className="book-authors">{book.author}</div>
	            </div>
    				</li>
    			))}

        </ol>
      </div>
    </div>
	);
}

export default Shelf;