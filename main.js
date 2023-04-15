const loginButton = document.querySelector("#loginButton");

loginButton.addEventListener("click", () => {
    window.location.replace("./login/login.html");
});

const cardButton = document.querySelector(".cardButton");

cardButton.addEventListener("click", () => {
    window.location.replace("./card/card.html");
});



let books = [];


function getAllBooks() {

    // loaderforBooks(true);
    fetch('https://book-shelter-d1515-default-rtdb.firebaseio.com/books.json')
        .then(res => {
            if (!res.ok) throw new Error("Something wrong ");
            return res.json();

        })
        .then((res) => {

            books = Object.keys(res || {}).map((item) => {
                return {
                    ...res[item],
                    id: item,
                    ok: +Math.random().toFixed(8)
                };
            });


    renderPageinationNumbers(books.length);


            console.log(books);
            renderHtmlElements(choppedBookItems(books));
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            // loaderforBooks(false)
        })



}
getAllBooks()
const elements = document.getElementById("elements");

let url = new URLSearchParams(window.location.search);
let step = 4;
let page = url.get('page') || 1;
// let step = 4;
// let page = 1;


function choppedBookItems(books) {
    let star = page * step - step;
    let end = star + step;
    return books.slice(star, end);
}

renderHtmlElements(books);
function renderHtmlElements(allBook) {
    let result = allBook.map((item, index) => {
        let element = `
     
        <div class="section4-card__box">
        <p class="section4-card__box--position">${item.category}</p>
        <img src="${item.img_url}" alt="" class="section4-card__box--img">
        <p class="section4-card__box--text">${item.author}</p>
       <div class="section4-card__box--math">
        <span class="section4-card__box--span">${item.price} so'm </span>
        <button type='button' onclick="bookmarkFunc(${item.ok})" id="MathBtn"><img src="./img/math.png" alt=""></button>
       </div>
    </div>
        `
        return element;
    }).join(" ");

    elements.innerHTML = result;
}

let bookmarArray = [];
function bookmarkFunc(imdbId) {
    let findedElement = books.find((item, index) => {
        console.log(item.ok, imdbId);
        return item.ok == imdbId;
    })
    if (!bookmarArray.includes(findedElement)) {
        bookmarArray.push(findedElement);
        document.querySelector(".saqlangan_cosmetika").innerHTML = bookmarArray.length;
    }

    console.log(bookmarArray);
    renderPageinationNumbers(bookmarArray.length);
    
}






function renderPageinationNumbers(lenght) {
    let pageNumber = Math.ceil(lenght / step);

    let result = ""
    for (let i = 0; i < pageNumber; i++) {
        result += `
        
              <button class="page-btn ${page == i + 1 ? "active" : ""}">${i + 1}</button>
                
        `
    }
    document.querySelector("#page-list").innerHTML = result;



    document.querySelectorAll(".page-btn").forEach((item) => {
        item.addEventListener("click", (e) => {
            // console.log(e.target.innerHTML);
            page = +e.target.innerHTML;
            console.log(page);

            searchElements(page);
            getAllBooks();

        });
    });
};

function searchElements(searchValue) {
    let url = new URL(window.location.href);
    let query = new URLSearchParams();

    
    query.append("page", searchValue);
    
    const URLSearchQuery = query.toString();
    
    url.search = URLSearchQuery;

    window.history.pushState( {} ,"", url.toString());

}



let searchArray = [];
searchArray = books.filter(item => {
    return item.category == 'New';
    
})
// console.log(searchArray);
function searchArrayFunc(value) {

    let findedElement = books.filter((item) => {
        return
    })
    if (!searchArray.includes(findedElement)) {
        searchArray.push(findedElement);
        document.querySelector(".section4-car").innerHTML = bookmarArray;
    }

    console.log(findedElement);
    // console.log(searchArray);
    
}

let newproductArray =[];
newproductArray = books.filter(item => {
    return item.category == 'New';
    
})
let onsaleArray =[];
onsaleArray = books.filter(item => {
    return item.category == 'Onsale';
    
    
})
let upcomingArray =[];

upcomingArray = books.filter(item => {
    console.log(item);
    return item.category == 'Upcoming';
    
})


document.getElementById('Newproducts').addEventListener('click', () => {
    page = url.get('page') || 1;
    searchElements(page);
    renderPageinationNumbers(newproductArray.length);
    renderHtmlElements(choppedBookItems(newproductArray));
  })
  document.getElementById('Onsale').addEventListener('click', () => {
    page = url.get('page') || 1;
    searchElements(page);
    renderPageinationNumbers(onsaleArray.length);
    renderHtmlElements(choppedBookItems(onsaleArray));
  })
  document.getElementById('UpcomingProducts').addEventListener('click', () => {
    page = url.get('page') || 1;
    searchElements(page);
    renderPageinationNumbers(upcomingArray.length);
    renderHtmlElements(choppedBookItems(upcomingArray));
  })