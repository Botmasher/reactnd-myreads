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
	changeBookshelf = event => {
		this.setState({shelf: `${event.target.value}`});
		// pass up to shelf so the shelf to match local selected shelf
		console.log(this.state.shelf);
		// component is rerendering and state.shelf is left blank again!!
		this.props.handleReshelving(this.props.book, event.target.value);
	};

	render() {
		
		// NOTE book objects differ depending on where fetched!
		// 	- books passed in from BooksAPI .search() query DON'T have .shelf
		// 	- books passed in from BooksAPI .getAll() fetch DO have .shelf
		console.log(this.props.book);

		// hardcoded test options for building list; match to book data instead
		const shelfOptions = [
			{name: 'currentlyReading', displayText: 'Currently Reading'},
			{name: 'wantToRead', displayText: 'Want to Read'},
			{name: 'read', displayText: 'Read'},
			{name: null, displayText: 'None'}
		];

		// fallback thumbs for books that have undefined images
		this.props.book.imageLinks===undefined && (
			this.props.book.imageLinks = {
				thumbnail: 'https://placebear.com/128/180',
				smallThumbnail: 'https://placebear.com/128/180'
			}
		);

		return (
    		<div className="book">
				<div className="book-top">
					<div className="book-cover"
			    		style={{
			    		width: 128,
			    		height: 180,
			    		backgroundImage: `url(${this.props.book.imageLinks.smallThumbnail})`}}>
			        </div>
					<div className="book-shelf-changer">
			    		{/* book's options menu to switch shelf */}
			    		<select defaultValue={this.props.book.shelf} onChange={e=>this.changeBookshelf(e)}>
			        		<option value="none" disabled>Move to...</option>
			        		{/* display all possible shelves */}
			        		{shelfOptions.map(option => (
			        			<option value={option.name} key={option.name}>
			        				{option.displayText}
			        			</option>
			        		))}
			            </select>
			        </div>
			    </div>
				<div className="book-title">{this.props.book.title}</div>
				<div className="book-authors">{this.props.book.author}</div>
			</div>
	    );
	}
}

export default Book;