const bookUrl = 'http://localhost:3000/books'

const bookList = document.getElementById('list')

// fetch list of books
fetch(bookUrl)
.then(r => r.json())
.then(data => renderBooks(data))

// render book list
function renderBooks(allBooks) {
    allBooks.forEach( (singleBook) => {
        const oneBook = document.createElement('li')
        oneBook.innerText = singleBook.title

        bookList.appendChild(oneBook)
    })
}   