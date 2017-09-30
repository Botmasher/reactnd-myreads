import React from 'react'
import Search from './Search';
import ListBooks from './ListBooks';
import PageNotFound from './PageNotFound';
import { Switch, Route, Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import logo from '../logo.svg'
import '../App.css';

// Root App - parent of Search and ListBooks
class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      books: {}
    };
  }

  // words to uncaps in pretty display titles
  uncapsWordsSet = new Set(['of', 'at', 'to', 'for', 'in', 'on', 'off', 'among', 'around', 'about', 'under', 'above', 'across', 'by', 'until', 'beside', 'before', 'after', 'towards', 'before', 'over', 'through', 'onto', 'into', 'from', 'and', 'or', 'but', 'a', 'an', 'the']);

  // take a book id and find its current shelf - added to handle unshelved API query results
  checkShelf = (book) => {
    const matchingShelvedBook = Object.keys(this.state.books).reduce((booksSoFar, currentShelf) => {
      return [...booksSoFar, ...this.state.books[currentShelf]];
    }, []).filter(b => b.id===book.id);
    return matchingShelvedBook[0] && matchingShelvedBook[0].shelf ? matchingShelvedBook[0].shelf: 'none';
  };

  prettifyCamelCaseTitle = (camelCaseText) => {
    // split at caps regex from stackoverflow user andrewmu: https://stackoverflow.com/questions/7888238/javascript-split-string-on-uppercase-characters
    return camelCaseText.match(/([A-Z]?[^A-Z]*)/g).slice(0,-1).map((word, i) => {
      if (i===0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else if (!this.uncapsWordsSet.has(word.toLowerCase())) {
        return word;
      } else {
        return word.toLowerCase();
      }
    }).join(' ');
  };

  // update a book's backend shelf and local shelf state
  handleReshelving = (reshelvedBook, newShelf) => {
    BooksAPI.update(reshelvedBook, newShelf)
    .then((updatedShelves) => {  
      // API returns {shelf:[id,...],} pairs for all shelves - update state with reshelvedBook instead   
      // Use the passed-in reshelvedBook object to update local shelf state for the book
      BooksAPI.getAll().then(allBooks => this.updateLocalBookshelves(allBooks, updatedShelves));
    });
  };

  updateLocalBookshelves = (allShelvedBooks, bookIdsPerShelf) => {
    // store shelf and book data for all books
    this.setState({
      books: Object.keys(bookIdsPerShelf).reduce((bookshelves, shelf) => {
        bookshelves[shelf] = allShelvedBooks.filter(book => book.shelf===shelf);
        return bookshelves;
      }, {})
    });
  };

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
        <Link className="app-title" to="/">
          <h1>
            <img className="app-title-logo" src={logo} alt="MyReads" />
          </h1>
        </Link>
        <Switch>
          <Route path="/search" render={() => (
            <Search
              handleReshelving={this.handleReshelving}
              checkShelf={this.checkShelf}
              shelves={shelves}
            />
          )}/>
          <Route exact path="/" render={() => (
            <ListBooks
              handleReshelving={this.handleReshelving}
              books={this.state.books}
              shelves={shelves}
              titleLength={40}
            />
          )} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    )
  }
}

export default App;