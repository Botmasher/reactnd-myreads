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

	render() {
		
		// hardcoded options for building dropdown list of shelves
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

		// format author names for display
		const authors = (this.props.data.authors && this.props.data.authors.length > 2)
			? `${this.props.data.authors[0]}, ...`
			: `${this.props.data.authors.join(' & ')}`;

		console.log (this.props.data);

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
			    		{/* popup options menu to switch shelf */}
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
				<div className="book-authors">{authors}</div>
			</div>
	    );
	}
}

export default Book;