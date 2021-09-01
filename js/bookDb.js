//  default error is hide
document.getElementById("error-message").style.display = "none";
document.getElementById("error-message2").style.display = "none";

// load the book
const loadBook = () => {
  const searchInput = document.getElementById("search-field");
  const getSearchValue = searchInput.value;
  console.log(getSearchValue);
  searchInput.value = "";

  //   if user dont type anything then it show this error
  document.getElementById("error-message").style.display = "none";
  if (getSearchValue === "") {
    document.getElementById("error-message").style.display = "block";
  }

  // get response from server
  const url = `http://openlibrary.org/search.json?q=${getSearchValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayBook(data.docs));
};

// display book
const displayBook = (books) => {
  document.getElementById("error-message2").style.display = "none";
  //   console.log(books.length);
  //   chek the search result item number
  const totalBook = books.length;
  if (totalBook === 0) {
    document.getElementById("error-message2").style.display = "block";
  }
  //   create card
  const showItem = document.getElementById("items");
  showItem.innerText = `We have : ${totalBook} Books`;
  const showbooks = document.getElementById("show-books");
  showbooks.textContent = "";
  books.forEach((book) => {
    // console.log(book);
    const div = document.createElement("div");
    div.classList.add("col");

    div.innerHTML = `
      <div class="card h-100">
              <img src=https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg class="card-img-top" alt="..." />
              <div class="card-body">
              <h5 class="card-title">Title:${book.title}</h5>
              <h5 class="card-title">Author:${book.author_name}</h5>
                <p class="card-text">Publisher:${book.publisher}</p>
                <p class="card-text">publish year:${book.publish_year}</p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>

      `;
    showbooks.appendChild(div);
  });
};
