const bookUrl = 'http://localhost:3000/books'

const bookList = document.getElementById('list')
const bookDetailPanel = document.getElementById('show-panel')

// call fetch function
fetchBookData()

// fetch list of books
function fetchBookData() {
    fetch(bookUrl)
        .then(r => r.json())
        .then(data => renderBooks(data))
}


// render book list
function renderBooks(allBooks) {
    allBooks.forEach((singleBook) => {
        const bookListItem = document.createElement('li')
        bookListItem.innerText = singleBook.title
        bookListItem.onclick = () => refetchBook(singleBook.id)
        
        bookList.appendChild(bookListItem)
    })
}

// re-fetch book, in case users have updated
function refetchBook(bookId) {
    fetch(bookUrl + '/' + bookId)
    .then(r => r.json())
    .then(bookData => showDetails(bookData))
}

const bookLikers = document.createElement('ul')

// show details of book on click
function showDetails(singleBook) {
    bookDetailPanel.innerText = ''

    const bookTitle = document.createElement('h2')
    bookTitle.innerText = singleBook.title

    const bookImage = document.createElement('img')
    bookImage.src = singleBook.img_url

    const bookAuthor = document.createElement('h3')
    bookAuthor.innerText = singleBook.author

    const bookSubtitle = document.createElement('h4')
    bookSubtitle.innerText = singleBook.subtitle

    const bookDescription = document.createElement('p')
    bookDescription.innerText = singleBook.description

    bookLikers.innerText = ''
    bookLikers.setAttribute('id', 'book-liker-list')

    singleBook.users.forEach((user) => {
        const bookLiker = document.createElement('li')
        bookLiker.innerText = user.username
        bookLikers.appendChild(bookLiker)
    })

    const likeBtn = document.createElement('button')
    likeBtn.innerText = singleBook.users.findIndex(user => user.id === 55) > -1 ? 'UNLIKE 👎' : 'LIKE 👍'
    likeBtn.onclick = () => {
        if (likeBtn.innerText === 'LIKE 👍') {
            likeBook(singleBook)
        } else {
            unlikeBook(singleBook)
        }
    }

    bookDetailPanel.innerText = ''
    bookDetailPanel.append(bookTitle, bookImage, bookAuthor, bookSubtitle, bookDescription, bookLikers, likeBtn)
}

// like a book and update in database
// add new user to "like list"
function likeBook(singleBook) {
    const newUserData = { id: 55, username: 'braillejord' }
    const updatedUserObject = [...singleBook.users, newUserData]

    fetch(bookUrl + '/' + singleBook.id, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'accepts': 'application/json'
        },
        body: JSON.stringify({
            users: updatedUserObject
        })
    })
        .then(() => refetchBook(singleBook.id))
}

// unlike a book and update database
function unlikeBook(singleBook) {
    console.log(singleBook.users)
    // this tells you where that user is in the array
    const userIndex = singleBook.users.findIndex((user) => user.username === 'braillejord')

    singleBook.users.splice(userIndex, 1)
    console.log(singleBook.users)

    fetch(bookUrl + '/' + singleBook.id, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'accepts': 'application/json'
        },
        body: JSON.stringify({
            users: singleBook.users
        })
    })
        .then(() => refetchBook(singleBook.id))
}








// notes for how .findIndex() works
const users = [{ name: 'Riley', stats: 1000 }, { name: 'BreElle', stats: 9000 }]

//if none found, it gives back -1. If it finds my user, it gives their index in the array. So this would give back 0
const foundUser = users.findIndex(user => user.name === 'Riley')

function findUser(user) {
    //    if user.name === 'Riley', return where that is
}