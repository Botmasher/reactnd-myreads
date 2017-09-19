import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {

	static propTypes = {
		book: PropTypes.object    // passed-in object for this book
	};

	state = {
		shelf: ''
	};

	// handle controlled select component for changing bookshelf
	handleShelving = (e) => {
		this.setState({shelf: e.target.value});
		// set the app state shelf to match local selected shelf
	};

	render() {
		const {book} = this.props;
		// hardcoded test options for building list; match to book data instead
		const shelfOptions = ['currentlyReading', 'wantToRead', 'read'];
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
			    		<select value={this.state.shelf} onChange={this.handleShelving}>
			        		<option value="none" disabled>Move to...</option>
			        		{shelfOptions.map(option => (
			        			option===this.state.shelf && (
			        				<option value={option} key={option}>{`${option.slice()}`}</option>
			        			)
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