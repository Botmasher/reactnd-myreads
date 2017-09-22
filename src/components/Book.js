import React from 'react';
import PropTypes from 'prop-types';
//import * as BooksAPI from '../utils/BooksAPI';

class Book extends React.Component {

	static propTypes = {
		data: PropTypes.object,    			// passed-in object for this book
		handleReshelving: PropTypes.func	// prop threading to update book data
	};

	state = {
		shelf: 'none'
	};

	// handle controlled select component for changing bookshelf
	changeBookshelf = event => {
		this.setState({shelf: `${event.target.value}`});
		// pass up to parent so that app shelving matches dropdown selected shelf
		this.props.handleReshelving(this.props.data, event.target.value);
	};

	// componentDidMount() {
	// 	// update undefined book shelf from books if it exists
	// 	if (this.props.book.shelf===undefined) {
	// 		const assignedShelf = BooksAPI.get(this.props.book.id).then(bookData => bookData);
	// 		this.setState({shelf: assignedShelf});
	// 	}
	// }

	render() {
		
		// NOTE book objects differ depending on where fetched!
		// 	- books passed in from BooksAPI .search() query DON'T have .shelf
		// 	- books passed in from BooksAPI .getAll() fetch DO have .shelf
		// SOLUTION?
		//  - check with App component if the book is in state
		// 	- if the book is in state, use that shelf
		// 	- otherwise, use a default .shelf
		
		// hardcoded test options for building list; match to book data instead
		const shelfOptions = [
			{name: 'currentlyReading', displayText: 'Currently Reading'},
			{name: 'wantToRead', displayText: 'Want to Read'},
			{name: 'read', displayText: 'Read'},
			{name: 'none', displayText: 'None'}
		];

		// fallback thumbs for books that have undefined images
		this.props.data.imageLinks===undefined && (
			this.props.data.imageLinks = {
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
			    		backgroundImage: `url(${this.props.data.imageLinks.smallThumbnail})`}}>
			        </div>
					<div className="book-shelf-changer">
			    		{/* book's options menu to switch shelf */}
			    		<select defaultValue={this.props.data.shelf} onChange={e=>this.changeBookshelf(e)}>
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
				<div className="book-title">{this.props.data.title}</div>
				<div className="book-authors">{this.props.data.author}</div>
			</div>
	    );
	}
}

export default Book;