import React from 'react'
import Search from './Search';
import ListBooks from './ListBooks';
import PageNotFound from './PageNotFound';
import { Switch, Route, Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import logo from '../logo.svg'
import '../App.css';

// Root app component - parent of Search and ListBooks
class App extends React.Component {
  state = {
    books: {}       // app representation of books per shelf in API
  };

  // words to uncaps in pretty display titles
  uncapsWordsSet = new Set(['of', 'at', 'to', 'for', 'in', 'on', 'off', 'among', 'around', 'about', 'under', 'above', 'across', 'by', 'until', 'beside', 'before', 'after', 'towards', 'before', 'over', 'through', 'onto', 'into', 'from', 'and', 'or', 'but', 'a', 'an', 'the']);

  // take in a book id and return its current shelf - added to handle unshelved API query results
  checkShelf = (book) => {
    // find any book in the local book data with a matching id
    const matchingShelvedBook = Object.keys(this.state.books).reduce((booksSoFar, currentShelf) => {
      return [...booksSoFar, ...this.state.books[currentShelf]];
    }, []).filter(b => b.id===book.id);
    // if there is local data for a book with a matching id, output the book's shelf
    return matchingShelvedBook[0] && matchingShelvedBook[0].shelf ? matchingShelvedBook[0].shelf: 'none';
  };

  // prepare text for user-friendly display
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
  };

  // change the book's backend shelf and update the local shelf state to match
  handleReshelving = (reshelvedBook, newShelf) => {
    // update the book's shelf property through the backend
    BooksAPI.update(reshelvedBook, newShelf)
    // update book's state in app
    .then((updatedShelves) => {  
      // API returns {shelf:[id,...],} pairs for all shelves - update state with reshelvedBook instead   
      // Use the passed-in reshelvedBook object to update local shelf state for the book
      BooksAPI.getAll().then(allBooks => this.updateLocalBookshelves(allBooks, updatedShelves));
    });
  };

  // update the local state with both books and shelves, even empty shelves
  updateLocalBookshelves = (allShelvedBooks, bookIdsPerShelf) => {
    // store shelf and book data for all books to avoid hardcoding the three shelves
    this.setState({
      books: Object.keys(bookIdsPerShelf).reduce((bookshelves, shelf) => {
        bookshelves[shelf] = allShelvedBooks.filter(book => book.shelf===shelf);
        return bookshelves;
      }, {})
    });
  };

  // get API data once component has rendered
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
        {/* exclusive routing */}
        <Switch>
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
          {/* route to 404 error if user navigates to incorrect endpoint */}
          <Route component={PageNotFound} />
        </Switch>
      </div>
    )
  }
}

export default App;