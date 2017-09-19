import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {

	static propTypes = {
		book: PropTypes.object    // passed-in object for this book
	};

	render() {
		const {book} = this.props;
		return (
    		<div className="book">
				<div className="book-top">
					<div className="book-cover"
			    		style={{
			    		//width: book.img.width,
			    		//height: book.img.height,
			    		width: 128,
			    		height: 180,
			    		backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}>
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
	    );
	}
}

export default Book;