const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
let totalPagesRead = parseInt(localStorage.getItem('totalPagesRead')) || 0;

function Book(title, author, pages, currentPage, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.currentPage = read ? null : parseInt(currentPage);
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    updateLocalStorage();
    displayBooks();
    updateStatistics();
}

function displayBooks() {
    const bookDisplay = document.getElementById("book-display");
    bookDisplay.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.innerHTML = `
            <p>${book.title} by ${book.author}</p>
            <p>${book.pages} pages</p>
            <p>${book.read ? 'Read' : 'Not read'}${book.read ? '' : ' - Current Page: ' + (book.currentPage || 0)}</p>
            <button onclick="removeBook(${index})">Remove</button>
            <button onclick="toggleReadStatus(${index})">Toggle Read Status</button>
            <button onclick="adjustPage(${index}, 1)">+</button>
            <button onclick="adjustPage(${index}, -1)">-</button>
        `;
        bookDisplay.appendChild(bookCard);
    });
}

function openForm() {
    const formContainer = document.getElementById("book-form");
    formContainer.style.display = "block";
}

function addBook(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const currentPage = document.getElementById("currentPage").value;
    const read = document.getElementById("read").checked;

    const newBook = new Book(title, author, pages, currentPage, read);
    addBookToLibrary(newBook);

    // Clear the form fields
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("currentPage").value = "";
    document.getElementById("read").checked = false;
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    updateLocalStorage();
    displayBooks();
    updateStatistics();
}

function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    myLibrary[index].currentPage = myLibrary[index].read ? null : myLibrary[index].currentPage;
    updateLocalStorage();
    displayBooks();
    updateStatistics();
}

function adjustPage(index, increment) {
    if (!myLibrary[index].read) {
        myLibrary[index].currentPage = (myLibrary[index].currentPage || 0) + increment;
        updateLocalStorage();
        displayBooks();
        updateStatistics();
    }
}

function updateLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function updateStatistics() {
    const totalBooksElement = document.getElementById('totalBooks');
    const totalPagesReadElement = document.getElementById('totalPagesRead');

    totalBooksElement.textContent = myLibrary.length;

    // Recalculate total pages read
    totalPagesRead = myLibrary.reduce((total, book) => {
        return total + (book.read ? book.pages : (book.currentPage || 0));
    }, 0);

    totalPagesReadElement.textContent = totalPagesRead;

    localStorage.setItem('totalPagesRead', totalPagesRead);
}

displayBooks();
updateStatistics();
