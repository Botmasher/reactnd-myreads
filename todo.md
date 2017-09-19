# Plans for starters
- [X] use client template as a starter guide for what app could look like
    - [X] create a ./components folder
	- [X] break out components into files for App, Shelf, Book, Search
    - [X] subcomponents: book < shelf; shelf < app
- [ ] decide what state and passed-in props look like
	- [X] include propTypes in components
	- [X] basic setup/questions about data store
	- [X] decide how to use state and props
	- [ ] arrange and normalize the static test data
- [X] fetch books from API to replace the static test data
	- [X] study and compare logged out fetched objects
	- [X] chain onto promise results to set App state
	- [X] store books array in App state to match API state
	- [X] update past/present/future labels to match API state
- [ ] format display of book data
	- [ ] cases with >1 authors
	- [ ] image width and height
- [ ] wire up search functionality
	- [ ] controlled input component
	- [ ] further split results/bar < search
	- [ ] store data
	- [ ] regex for search -> filtering results
- [ ] replace screen state changing with routing
	- [ ] restful perstent routes between search and home screens
- [ ] wire ability to change category for book
	- [ ] control is on the book component

# Attention throughout development
- keep in step with [Udacity Rubric](https://review.udacity.com/#!/rubrics/918/view)
- if use API, ensure search results match our state in both search and home pages
- be sure to **--save** any node tools the app uses
- declaratively map/filter/reduce over arrays (state)

# Beyond mvp
- [ ] add store for data
- [ ] search filters like by author, title
- [ ] highlighting for selected book
- [ ] store user's notes about the book
- [ ] add user to store, ability to log in
- [ ] style and change page look
- [ ] API or scrape to make db
