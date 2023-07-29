const bookUrl = 'http://localhost:3000/books'

const bookList = document.getElementById('list')
const bookDetailPanel = document.getElementById('show-panel')

// fetch list of books
fetch(bookUrl)
    .then(r => r.json())
    .then(data => renderBooks(data))

// render book list
function renderBooks(allBooks) {
    allBooks.forEach((singleBook) => {
        const bookListItem = document.createElement('li')
        bookListItem.innerText = singleBook.title
        bookListItem.onclick = () => showDetails(singleBook)

        bookList.appendChild(bookListItem)
    })
}

// show details of book on click
function showDetails(singleBook) {
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

    const bookLikers = document.createElement('ul')

    singleBook.users.forEach((user) => {
        const bookLiker = document.createElement('li')
        bookLiker.innerText = user.username
        bookLikers.appendChild(bookLiker)

        const likeBtn = document.createElement('button')
        likeBtn.innerText = 'LIKE 👍'
        likeBtn.onclick = () => likeBook(singleBook)

        bookDetailPanel.innerText = ""
        bookDetailPanel.append(bookTitle, bookImage, bookAuthor, bookSubtitle, bookDescription, bookLikers, likeBtn)
    })
}

// like a book and update in server
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
}