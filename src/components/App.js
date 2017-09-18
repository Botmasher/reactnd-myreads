import React from 'react'
import Search from './Search';
import Shelf from './Shelf';
// import * as BooksAPI from '../utils/BooksAPI';
import '../App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    /**
     * TODO:  - Utilize state to fetch books and pass to Shelf components.
     *        - Switch from test data to fetching from BookAPI
     *
     * Structure:
     * Shelf component should list its associated Book components.
     * Book component should know its past-pres-fut categorization.
     * Book component should also have a title, author, imgUrl, imgHeight, imgWidth
     * Store structure:
     * [{book_1}, {book_2}, ... {book_n}]
     * Book structure:
     * {title, author, status, imgURL, imgHeight, imgWidth}
     *
     * Map of relations:
     * - Book has one Shelf
     * - Shelf has many Books
     * - Store has many Shelves
     */
    bookstore: [
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        shelf: 'present',
        img: {
          url: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
          width: 128,
          height: 193
        }
      },
      {
        title: 'Ender\'s Game',
        author: 'Orson Scott Card',
        shelf: 'present',
        img: {
          url: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api',
          width: 128,
          height: 188
        }
      },
      {
        title: '1776',
        author: 'David McCullough',
        shelf: 'future',
        img: {
          url: 'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api',
          width: 128,
          height: 193
        }
      },
      {
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling',
        shelf: 'future',
        img: {
          url: 'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api',
          width: 128,
          height: 192
        }
      },
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        shelf: 'past',
        img: {
          url: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api',
          width: 128,
          height: 192
        }
      },
      {
        title: 'Oh, the Places You\'ll Go!',
        author: 'Seuss',
        shelf: 'past',
        img: {
          url: 'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api',
          width: 128,
          height: 174
        }
      },
      {
        title: 'The Adventures of Tom Sawyer',
        author: 'Mark Twain',
        shelf: 'past',
        img: {
          url: 'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api',
          width: 128,
          height: 192
        }
      }
    ],
    // name and display heading for each shelf
    shelves: [
      {
        name: 'present',
        heading: 'Currently Reading'
      },
      {
        name: 'future',
        heading: 'Want to Read'
      },
      {
        name: 'past',
        heading: 'Read'
      }
    ]
  }

  // screen handler passed into search component to simulate routing (return home)
  toggleSearchHandler = () => {
    this.setState(prevState => ({
      showSearchPage: !prevState.showSearchPage
    }));
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search closeHandler={this.toggleSearchHandler} />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              { /* div wrapping side-by-side shelf components */}
              <div>

                {this.state.shelves.map((shelf, i) => (
                  <Shelf heading={shelf.heading} key={i} id={i} books={
                    this.state.bookstore.filter(book => book.shelf===shelf.name)
                  } />
                ))}

              {/* end side-by-side div wrapping shelf components */}
              </div>

            {/* end div list-books-content */}
            </div>

            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>

          {/* end div list-books */}
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp