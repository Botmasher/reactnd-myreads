import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {

	static propTypes = {
		book: PropTypes.object,    			// passed-in object for this book
		handleReshelving: PropTypes.func	// prop threading to update book data
	};

	state = {
		shelf: ''
	};

	// handle controlled select component for changing bookshelf
	changeBookshelf = (e) => {
		this.setState({shelf: e.target.value});
		// pass up to shelf so the shelf to match local selected shelf
		this.props.handleReshelving({...this.props.book, shelf: e.target.value});
	};

	render() {
		const {book} = this.props;
		// hardcoded test options for building list; match to book data instead
		const shelfOptions = [
			{name: 'currentlyReading', displayText: 'Currently Reading'},
			{name: 'wantToRead', displayText: 'Want to Read'},
			{name: 'read', displayText: 'Read'},
			{name: null, displayText: 'None'}
		];

		// fallback thumbs for books that have undefined images
		book.imageLinks===undefined && (
			book.imageLinks = {
				thumbnail: 'https://placebear.com/128/180',
				smallThumbnail: 'https://placebear.com/128/180'
			}
		);

		console.log(book.shelf);

		return (
    		<div className="book">
				<div className="book-top">
					<div className="book-cover"
			    		style={{
			    		width: 128,
			    		height: 180,
			    		backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}>
			        </div>
					<div className="book-shelf-changer">
			    		<select defaultValue={book.shelf} onChange={e=>this.changeBookshelf(e)}>
			        		<option value="none" disabled>Move to...</option>
			        		{shelfOptions.map(option => (
			        			<option value={option.name} key={option.name}>
			        				{option.displayText}
			        			</option>
			        		))}
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