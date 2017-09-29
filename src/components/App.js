import React from 'react'
import Search from './Search';
import ListBooks from './ListBooks';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import logo from '../logo.svg'
import '../App.css';

// Root app component - parent of Search and ListBooks
class App extends React.Component {
  state = {
    // app representation of book data in API
    books: [],
    // name and display text for each app shelf, based on shelves in API data
    shelves: [{name: '', heading: ''}]
  };

  // words to uncaps in pretty display titles
  uncapsWordsSet = new Set(['of', 'at', 'to', 'for', 'in', 'on', 'off', 'among', 'around', 'about', 'under', 'above', 'across', 'by', 'until', 'beside', 'before', 'after', 'towards', 'before', 'over', 'through', 'onto', 'into', 'from', 'and', 'or', 'but', 'a', 'an', 'the']);

  // Take in a book id and return its current shelf - added to handle unshelved API query results
  checkShelf = (book) => {
    const shelvedBooks = this.state.books.filter(b => b.id===book.id);
    // return shelved query results to the Search component
    return shelvedBooks.length > 0 ? shelvedBooks[0].shelf : 'none';
  }

  // Prepare text for user-friendly display
  prettifyCamelCaseTitle = (camelCaseText) => {
    // split text into capitalized words and iterate through each word
    // regex pinpointed by stackoverflow user andrewmu: https://stackoverflow.com/questions/7888238/javascript-split-string-on-uppercase-characters
    return camelCaseText.match(/([A-Z]?[^A-Z]*)/g).slice(0,-1).map((word, i) => {
      // capitalize the first word
      if (i===0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      // leave most words capitalized
      } else if (!this.uncapsWordsSet.has(word.toLowerCase())) {
        return word;
      // uncaps any word found in the uncapsed words set
      } else {
        return word.toLowerCase();
      }
    }).join(' ');   // turn array back into a single string
  }

  // Construct and save both formal names and display headings for all shelves found in book data
  buildShelves = (booksData) => {
    // obtain set of all unique shelves in book data
    const shelves = booksData.reduce((allShelves, currentBook) => {
      return allShelves.add(currentBook.shelf);
    }, new Set() );
    // return each shelf's name (like 'wantToRead') and pretty heading (like 'Want to Read')
    return [...shelves, 'none'].map(shelf => (
      {name: shelf, heading: this.prettifyCamelCaseTitle(shelf)}
    ));
  }

  // Change the book's backend shelf and update the local shelf state to match
  handleReshelving = (reshelvedBook, shelf) => {
    // update the book's shelf property through the backend
    // note that updating shelf to 'none' will remove from display shelves
    BooksAPI.update(reshelvedBook, shelf)
    // update book's state in app
    .then((updatedShelves) => {  
      // API returns {shelf:[id,...],} pairs for all shelves - update state with reshelvedBook instead   
      // Use the passed-in reshelvedBook object to update local shelf state for the book
      this.setState({books: [
          ...this.state.books.filter(b => b.id!==reshelvedBook.id),
          {...reshelvedBook, shelf}
        ]
      });
    });
  }
  
  // Get API data once component has rendered
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      // use the array to build shelves for each book's listed shelf property
      const shelves = this.buildShelves(books);
      // save all books and shelves
      this.setState({books, shelves});
    });
  }

  render() {
    return (
      <div className="app">
        {/* app title logo */}
        <Link className="app-title" to="/">
          <h1>
            <img className="app-title-logo" src={logo} alt="MyReads" />
          </h1>
        </Link>
        {/* route to display search */}
        <Route path="/search" render={() => (
          <Search
            handleReshelving={this.handleReshelving}
            checkShelf={this.checkShelf}
            shelves={this.state.shelves}
          />
        )}/>
        {/* route to display bookshelves */}
        <Route exact path="/" render={() => (
          <ListBooks
            handleReshelving={this.handleReshelving}
            books={this.state.books}
            shelves={this.state.shelves}
          />
        )} />
      </div>
    )
  }
}

export default App;