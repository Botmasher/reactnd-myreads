import React from 'react'
import Search from './Search';
import ListBooks from './ListBooks';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import logo from '../logo.svg'
import '../App.css';

/*
 * Testing:
 * 1) Set all books' .shelf to none in API. Do shelves appear on main page? Do shelves appear in book dropdown?
 * 2) Ensure three shelves show up on home page
 * 3) Ensure three shelves show in dropdown menus in both home and search pages
 * 4) The dropdown should correctly and immediately reshelf a book
 * 5) Each book left in shelf should not have broken "bad dropdown"
 * 6) No other book in search results should have broken "bad dropdown"
 */

// Root app component - parent of Search and ListBooks
class App extends React.Component {
  state = {
    books: {}       // app representation of books per shelf in API
  };

  // words to uncaps in pretty display titles
  uncapsWordsSet = new Set(['of', 'at', 'to', 'for', 'in', 'on', 'off', 'among', 'around', 'about', 'under', 'above', 'across', 'by', 'until', 'beside', 'before', 'after', 'towards', 'before', 'over', 'through', 'onto', 'into', 'from', 'and', 'or', 'but', 'a', 'an', 'the']);

  // Take in a book id and return its current shelf - added to handle unshelved API query results
  checkShelf = (book) => {
    // find any book in the local book data with a matching id
    const matchingShelvedBook = Object.keys(this.state.books).reduce((booksSoFar, currentShelf) => {
      return [...booksSoFar, ...this.state.books[currentShelf]];
    }, []).filter(b => b.id===book.id);
    // if there is local data for a book with a matching id, output the book's shelf
    return matchingShelvedBook[0] && matchingShelvedBook[0].shelf ? matchingShelvedBook[0].shelf: 'none';
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

  // Change the book's backend shelf and update the local shelf state to match
  handleReshelving = (reshelvedBook, newShelf) => {
    console.log(newShelf);
    console.log(reshelvedBook.shelf);
    // update the book's shelf property through the backend
    // note that updating shelf to 'none' will remove from display shelves
    BooksAPI.update(reshelvedBook, newShelf)
    // update book's state in app
    .then((updatedShelves) => {  
      // API returns {shelf:[id,...],} pairs for all shelves - update state with reshelvedBook instead   
      // Use the passed-in reshelvedBook object to update local shelf state for the book
      BooksAPI.getAll().then(allBooks => this.updateLocalBookshelves(allBooks, updatedShelves));
    });
  };

  // Update the local state with both books and shelves, even empty shelves
  updateLocalBookshelves = (allShelvedBooks, bookIdsPerShelf) => {
    // store shelf and book data for all books to avoid hardcoding the three shelves
    this.setState({
      books: Object.keys(bookIdsPerShelf).reduce((bookshelves, shelf) => {
        bookshelves[shelf] = allShelvedBooks.filter(book => book.shelf===shelf);
        return bookshelves;
      }, {})
    });
  };

  // Get API data once component has rendered
  componentDidMount() {
    const allShelvedBooks = [];
    // store data for currently shelved books
    BooksAPI.getAll().then((books) => {
      allShelvedBooks.push(...books);
      // empty API request to return all active shelves
      BooksAPI.update('','none').then((booksPerShelf) => {
        this.updateLocalBookshelves(allShelvedBooks, booksPerShelf);
      });
    });
  }

  render() {
    // send subcomponents formatted shelf names based on shelves in state
    const shelves = [...Object.keys(this.state.books), 'none'].map(shelf => ({name: shelf, heading: this.prettifyCamelCaseTitle(shelf)}));
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
            shelves={shelves}
          />
        )}/>
        {/* route to display bookshelves */}
        <Route exact path="/" render={() => (
          <ListBooks
            handleReshelving={this.handleReshelving}
            books={this.state.books}
            shelves={shelves}
            titleLength={40}
          />
        )} />
      </div>
    )
  }
}

export default App;