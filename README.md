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

## API & Backend Server

From Udacity: To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

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
* This collection represents the books currently in the bookshelves in your app.

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
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Tests

Testing not currently implemented. Once it is, update this to include a short description of how to run the tests, along with examples.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

If you'd like to add a feature or fix a bug in this application, please fork the repository and make a pull request with your updated code.

Words to live by from the original Udacity template: "Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed."

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).