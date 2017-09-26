import React from 'react';
import PropTypes from 'prop-types';
//import * as BooksAPI from '../utils/BooksAPI';

class Book extends React.Component {

	static propTypes = {
		data: PropTypes.object,    			// passed-in object for this book
		handleReshelving: PropTypes.func,	// prop threading to update book data
		shelves: PropTypes.array	 		// prop threading to display dropdown shelves menu
	};

	state = {
		shelf: 'none', 						// 
		maxTitleLength: 50
	};

	// handle controlled select component for changing bookshelf
	changeBookshelf = event => {
		this.setState({shelf: `${event.target.value}`});
		// pass up to parent so that app shelving matches dropdown selected shelf
		this.props.handleReshelving(this.props.data, event.target.value);
	};

	// Cut down excess text at a letter or number
		// e.g. long book titles
	truncateTextAtAlphanum(txt, cutIndex) {
		// check if truncated text ends in letter or numeral
		if (/[^a-zA-Z0-9]/.test(txt[cutIndex]) || cutIndex===0) {
			return `${txt.slice(0, cutIndex)}...`;
		}
		// cut the text one character sooner
		return this.truncateTextAtAlphanum(txt, cutIndex-1);
	}

	render() {
		// fallback thumbs for books that have undefined images
		this.props.data.imageLinks===undefined && (
			this.props.data.imageLinks = {
				thumbnail: 'https://placebear.com/128/180',
				smallThumbnail: 'https://placebear.com/128/180'
			}
		);

		// format author names for display
		const authors = this.props.data.authors
			? this.props.data.authors.length < 3
				? `${this.props.data.authors.join(' & ')}`
				: `${this.props.data.authors.join(', ')}`
			: ``;

		// format book title for display
		const title = this.props.data.title.length >= this.state.maxTitleLength
			? this.truncateTextAtAlphanum(this.props.data.title, this.state.maxTitleLength)
			: this.props.data.title;

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
			        		{this.props.shelves.map(shelf => (
			        			<option value={shelf.name} key={shelf.name}>
			        				{shelf.heading}
			        			</option>
			        		))}
			            </select>
			        </div>
			    </div>
				<div className="book-title">{title}</div>
				<div className="book-authors">{authors}</div>
			</div>
	    );
	}
}

export default Book;