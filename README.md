# MyReads Project

This is a bookshelf app to help readers organize their favorite tomes, built as the final assessment project for Udacity's React Fundamentals course. This project was bootstrapped using [Create React App](https://github.com/facebookincubator/create-react-app) and the starter CSS and HTML templates from Udacity.

## Purpose

Readers like to keep track of and discuss their past, present and future reads. They're also familiar with the visuals of organizing and browsing bookshelves. MyReads is a place to search for, shelve and look through through books you want to read, are reading or have already read.

## Installation

This is a light project built with React and JS.

Requirements:
* You simply need [Node.js](https://nodejs.org), [npm](https://www.npmjs.com/) and your browser to get started.
* Development aids like the Chrome [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) will come in handy if you plan to tinker.

Guide:
* Download, fork or clone the project.
* Navigate to your local project folder and run `npm install` to install project dependencies. 
* Run the command `npm start` from within the project folder to start the local server.
* Once the project compiles, view the development build in your browser.

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for the provided Udacity backend.
├── TODO.md # Completed tasks and future features wishlist for the app.
├── package.json # npm package manager file, not modified from Udacity project.
├── public
│   ├── favicon.ico # Site icon
│   └── index.html # Base template, not modified from Udacity project.
└── src
    ├── App.css # Styles for the app.
    ├── App.js # The app's root component.
    ├── App.test.js # Provided with Create React App for testing.
    ├── components # All React components for the app.
    │   ├── App.js
    │   ├── Book.js    
    │   ├── ListBooks.js
    │   ├── Search.js
    │   └── Shelf.js
    ├── icons # Images for the app.
    │   ├── arrow-back.svg
    │   ├── search.svg    
    │   ├── shelf.svg
    │   └── shelves.svg
    ├── scripts # Additional JavaScript behaviors.
    │   └── ScrollAnims.js
    ├── utils
    │   └── BooksAPI.js # API for the provided Udacity backend. Instructions for the methods are below.
    ├── index.css # Global styles.
    └── index.js # File used for DOM rendering only.
```

## Overview of Data Structures

The core state representing the current bookstore lives in the root `App` component. The `Search` component also temporarily reads stored search results while the user queries, but it passes any persistent updates to `App`. The `Book` component takes in its data as props threaded down from `App` and calls an `App` handler when updating.

Root app state structure:
* The state is divided into `{books, shelves}`
* The `books` property is paired with an array: `[{book_1}, {book_2}, ... {book_n}]`
    * This array is stored directly from the API results
    * Each `book` of `books` reflects API results, copying all properties
* The `shelves` property is paired with an array: `[{shelf_1}, ... {shelf_n}]`
    * Each `shelf` of `shelves` has a formal `name` and a display text `heading`
    * The `name` values come from performing a reduce on API results to find each unique `.shelf`
    * The `heading` values come from prettifying the shelfname into a display-ready string

Relations between components:
* App has one Search
* App has one ListBooks 
* ListBooks has many Shelves
* Shelf has many Books
* Search has many Books
* Book has one Shelf

## Flow through the App

* The root app (App):
    * stores and updates all shelved books (`state.books`) and active shelves (`state.shelves`)
    * routes to a list of bookshelves (ListBooks) or a search component (Search)
* The list of bookshelves (ListBooks):
    * displays a shelf (Shelf) for each of the active shelves
    * filters book data for each shelf
* The shelf (Shelf):
    * lists its associated Book components
    * automatically updates when a Book is added or removed
* The search (Search):
    * takes input to query the API
    * checks API results against current shelves
    * displays books (Book) found in API results
* The book (Book):
    * takes in one book's data and turns it into a visual display for that book
    * has a dropdown menu that updates the book's shelf and automatically displays that new shelf
    * is highlighted both in BookList and Search when it appears in an active shelf

## API & Backend Server

To simplify the initial class project, Udacity provided a backend server to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods needed to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list contains the _only_ terms that will work with the backend.

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the app bookshelves.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query, maxResults)
```

* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. The project code contains workarounds to ensure books have the correct state while on the search page.

## Tests

Testing not currently implemented. Once it is, update this to include a short description of how to run the tests, along with examples.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

If you'd like to add a feature or fix a bug in this application, please fork the repository and make a pull request with your updated code.

Words to live by from the original Udacity template: "Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed."

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).