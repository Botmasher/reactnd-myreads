import React from 'react'
import Search from './Search';
import ListBooks from './ListBooks';
import { Route } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import '../App.css';

/*
 * Behavior:
 *  - App component routes to a list of Shelves or a Search component
 *  - Shelf component lists its associated Book components.
 *  - Search component returns query results as Book components.
 *  - Book component takes in JSON object and uses title, author, thumb, id, shelf.
 *  - Book component has dropdown that updates its shelf categorization.
 */
class App extends React.Component {
  state = {
    /*
     * Store structure:
     * {books, shelves}
     * Property structure for 'books'
     * [{book_1}, {book_2}, ... {book_n}]
     * Property structure for each book of books - directly mirrors from API results
     *
     * Map of relations:
     * - Book has one Shelf
     * - Shelf has many Books
     * - Store has many Shelves
     */
    books: [],
    // name and display text for each app shelf, based on shelves in API data
    shelves: [{name: '', heading: ''}]
  };

  // words to uncaps in pretty display titles
  uncapsWordsSet = new Set(['of', 'at', 'to', 'in', 'on', 'among', 'around', 'from', 'a', 'an', 'the']);

  // Take in a book id and return its current shelf (if any)
  // - added to handle API query results, which return objects with no shelf property
  // - only called within the Search component to shelve query results 
  checkShelf = (book) => {
    const shelvedBooks = this.state.books.filter(b => b.id===book.id);
    return shelvedBooks.length > 0 ? shelvedBooks[0].shelf : 'none';
  }

  // Split text at caps and prepare for user-friendly display
  prettifyCamelCaseTitle = (camelCaseText) => {
    // split into words and iterate through each word
    return camelCaseText.match(/([A-Z]?[^A-Z]*)/g).slice(0,-1).map((word, i) => {
      // capitalize most words including any first word
      if (!this.uncapsWordsSet.has(word.toLowerCase()) ||  i===0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      // uncapitalize words found in the uncapsed words set
      return word.toLowerCase();
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
  // - take a single book object and the new shelf
  // - run an API update
  // - update the local books array
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
    // then-chaining on API promise to get resolved array object
    BooksAPI.getAll().then((books) => {
      // use the array to build shelves for each book's listed shelf property
      const shelves = this.buildShelves(books);
      // save all books and shelves
      this.setState({books, shelves});
    });
  }

  render() {
    // route to Search or List component
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search
            handleReshelving={this.handleReshelving}
            checkShelf={this.checkShelf}
            shelves={this.state.shelves}
          />
        )}/>
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