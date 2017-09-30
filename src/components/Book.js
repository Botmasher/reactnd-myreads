import React from 'react';
import PropTypes from 'prop-types';

function Book(props) {
	
	const truncateTextAtAlphanum = (txt, cutIndex) => {
		// regex alphanumeric test from stackoverflow by user113716: https://stackoverflow.com/questions/4434076/best-way-to-alphanumeric-check-in-javascript
		if (/[^a-zA-Z0-9]/.test(txt[cutIndex]) || cutIndex===0) {
			return `${txt.slice(0, cutIndex)}...`;
		}
		return truncateTextAtAlphanum(txt, cutIndex-1);
	};

	// fallback thumbs for books that have undefined images
	props.data.imageLinks===undefined && (
		props.data.imageLinks = {
			thumbnail: 'http://dummyimage.com/128x180/d/0?text=No%20Cover',
			smallThumbnail: 'http://dummyimage.com/128x180/d/0?text=No%20Cover'
		}
	);

	// format author names for display
	const authors = props.data.authors
		? props.data.authors.length < 3
			? `${props.data.authors.join(' & ')}`
			: `${props.data.authors.join(', ')}`
		: ``;

	// format book title for display
	const title = props.maxTitleLength && props.data.title && props.data.title.length>=props.maxTitleLength
		? truncateTextAtAlphanum(props.data.title, props.maxTitleLength)
		: props.data.title;

	return (
		<div className="book">
			<div className="book-top">
				<div
					className={`book-cover ${props.data.shelf!=='none' ? " book-cover-highlight" : ""}`}
					style={{ backgroundImage: `url(${props.data.imageLinks.smallThumbnail})`}}
				></div>
				<div className="book-shelf-changer">
					{/* dropdown options menu to switch shelf */}
					<select defaultValue={props.data.shelf} onChange={e=>props.handleReshelving(props.data, e.target.value)}>
						<option value="none" disabled>Move to...</option>
						{props.shelves.map(shelf => (
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

Book.propTypes = {
	data: PropTypes.object,    			// seed data for this book
	maxTitleLength: PropTypes.number,
	handleReshelving: PropTypes.func,	// lift changed bookshelf up to App
	shelves: PropTypes.array	 		// prop threading to display dropdown shelves menu
};

export default Book;