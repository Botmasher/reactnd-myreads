import React from 'react'
import Search from './Search';
import ListBooks from './ListBooks';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import logo from '../logo.svg'
import '../App.css';

/*  Issues:
 *  - on fresh load, since database has no books in shelf, None is the only option
 *    - me: what's the API query that allows you to see books organized by shelves again?
 *  - "Bad Dropdowns": when change a book's shelf in main page, it moves BUT book that takes its place now dropsdown to new shelf!
 *    - this problem disappears on refresh (the explanation's more confusing than visuals, so try it)
 *    - it's worse when you start recategorizing multiple books in a shelf, or setting the bad-dropdown book's shelf
 *  - empty shelves on main page actually become deleted shelves on main page
 *    - if a shelf isn't in the API, it doesn't exist anywhere in App
 *
 * Testing:
 * 1) Set all books' .shelf to none in API. Do shelves appear on main page? Do shelves appear in book dropdown?
 * 2) Ensure three shelves show up on home page
 * 3) Ensure three shelves show in dropdown menus in both home and search pages
 * 4) The dropdown should correctly and immediately reshelf a book
 * 5) Each book left in shelf should not have broken "bad dropdown"
 * 6) No other book in search results should have broken "bad dropdown"

 * Is Shelf rerendering on book handler change? It should be, and I guess it is, but maybe only ListBooks is?
 */

// Root app component - parent of Search and ListBooks
class App extends React.Component {
  state = {
    books: [],                                // app representation of book data in API
    shelves: [{name: '', heading: ''}]        // name and display text for each app shelf, based on shelves in API data
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
  buildShelves = (shelvesData) => {
    // obtain set of all unique shelves from data
    const shelves = Object.keys(shelvesData);
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
    // Store data for currently shelved books
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    });
    // Empty API request to return all active shelves
    BooksAPI.update('','none').then((booksPerShelf) => {
      // store both API shelf name and pretty display text for all shelves
      const shelves = this.buildShelves(booksPerShelf);
      this.setState({shelves});
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
            titleLength={40}
          />
        )} />
      </div>
    )
  }
}

export default App;