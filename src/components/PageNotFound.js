import React from 'react';
import { Link } from 'react-router-dom';

// Component to display when routed to incorrect page
function PageNotFound(props) {
	return (
		<div className="error-block">
			<p className="error-code">404</p>
			<p className="error-text">Page not found!</p>
			<p className="error-text">Stick around though: check your <Link to="/">shelves</Link> or do a <Link to="/search">search</Link>.</p>
		</div>
	);
}

export default PageNotFound;
