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

        const likeBtn = document.createElement('button')
        likeBtn.innerText = 'LIKE 👍'
        likeBtn.onclick = () => likeBook(singleBook)

        bookDetailPanel.innerText = ''
        bookDetailPanel.append(bookTitle, bookImage, bookAuthor, bookSubtitle, bookDescription, bookLikers, likeBtn)
    })
}

// like a book and update in server
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
    const newUser = document.createElement('li')
    newUser.innerText = newUserData.username

    bookLikers.appendChild(newUser)
}