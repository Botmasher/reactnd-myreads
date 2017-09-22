import React from 'react';
import ReactDOM from 'react-dom';
import BooksApp from './components/App';
import { BrowserRouter } from 'react-router-dom'
import './index.css';

ReactDOM.render(
	<BrowserRouter><BooksApp /></BrowserRouter>,
	document.getElementById('root')
);
