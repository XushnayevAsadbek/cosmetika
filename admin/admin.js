const btnAdd = document.querySelector("#add");
const saveBookBtn = document.querySelector("#saveBook");
const title_book = document.querySelector("#title_book");
const author = document.querySelector("#author");
const category = document.querySelector("#category");
const price = document.querySelector("#price");
const data_publish = document.querySelector("#data_publish");
const rate = document.querySelector("#rate");
const img_url = document.querySelector("#img_url")
const form = document.querySelector("#form")

const myModal = new bootstrap.Modal("#exampleModal");


let globalImageUrl;
let booksArray = [];





let step = 3;
let page = 1;


function choppedBookItems(books) {
    let star = page * step - step;
    let end = star + step;
    return books.slice(star, end);
}

function saveBookData() {
    const bookObj = {
        author: author.value,
        title_book: title_book.value,
        category: category.value,
        price: price.value,
        data_publish: data_publish.value,
        rate: rate.value,
        img_url: globalImageUrl,
        
    };
    let arr = Object.keys(bookObj).filter((key) => !bookObj[key]);
    if (arr.length) {
        arr.forEach((item) => {
            document.querySelector(`#${item}`).classList.add("error_border")
        });
        return;
    }

    showBtnLoading(true)

    fetch('https://book-shelter-d1515-default-rtdb.firebaseio.com/books.json', {
        method: "POST",
        body: JSON.stringify(bookObj)
    }).then(res => {

        if (!res.ok) throw new Error("Something wrong ");
        return res.json();

    })
        .then((res) => {
            form.reset();
        })
        .catch((err) => {
            console.log(err);
        }).finally(() => {
            showBtnLoading(false);

            myModal.hide();

            getAllBooks();
        });

    showBtnLoading(true);
}

saveBookBtn.addEventListener("click", saveBookData);


function showBtnLoading(show) {
    if (show) {
        saveBookBtn.innerHTML = `
        <div class="spinner-border text-light"
        style="width:15px; height: 15px "
        role="status">
    </div>
        `;
    } else {
        saveBookBtn.innerHTML = `Save`;

    }
}

Array.from(form).forEach((item) => {
    item.addEventListener("change", (e) => {
        if (e.target.value) e.target.classList.remove("error_border");
        else e.target.classList.add("error_border");
    });
});



function getAllBooks() {

    loaderforBooks(true);
    fetch('https://book-shelter-d1515-default-rtdb.firebaseio.com/books.json')
        .then(res => {
            if (!res.ok) throw new Error("Something wrong ");
            return res.json();

        })
        .then((res) => {

            booksArray = Object.keys(res || {}).map((item) => {
                return {
                    ...res[item],
                    id: item,
                };
            });


            renderPageinationNumbers(booksArray.length);

            renderBookElements(
                choppedBookItems(booksArray)
            );
            // console.log(choppedBookItems(booksArray));
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            loaderforBooks(false)
        })

}

function renderBookElements(books) {

    let result = books.map((item, index) => {

        let d = new Date(item.data_publish);

        let datestring =
            d.getDate() +
            "." +
            (d.getMonth() + 1) +
            "." +
            d.getFullYear() +
            " " +
            d.getHours() +
            ":" +
            d.getMinutes();
        let starElement = "";
        for (let i = 0; i < item.rate; i++) {
            starElement += `<img src="../img/star.svg" alt=""> `;
        }
        let result = `
        <li>
                <div class="d-flex bg-light  rounded-3 mb-3">
                    <div class="bg-gray p-4">
                        <img src=${item.img_url} width="200" height="180" alt="book photo ">
                    </div>
                    <div>
                        <h2 class="text-lg">
                          ${item.title_book}
                        </h2>

                        <p>by ${item.author} | ${datestring} </p>
                        <div class="d-flex align-items-center">
                        ${starElement} 
                        </div>
                        <div>
                                <p>category ${item.category}</p>
                         </div>

                        <div>
                            <p>Cost <span class="text-bold">${item.price.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
                            </span></p>
                        </div>

                        <div class="d-flex justify-content-end">
                            <button class="btn btn-success btn_close">Edit</button>
                            <button class="btn btn-success bg-danger  btn_delet "
                             onclick="deleteBookItem(${index})"
                             >Delete</button>

                        </div>
                    </div>
                </div>
            </li>
        `

        return result;

    }).join(' ');


    document.querySelector("#list").innerHTML = result;
}

function loaderforBooks(show) {

    if (show) {
        document.querySelector("#loader").classList.add("d-flex");
    } else {
        document.querySelector("#loader").classList.remove("d-flex");
        document.querySelector("#loader").classList.add("d-none");
    }

}

getAllBooks();

function deleteBookItem(id) {

    let findEdElemt = booksArray.find((item, index) => {
        console.log(index, id);
        return index === id
    });
    console.log(findEdElemt);


    fetch(
        `https://book-shelter-d1515-default-rtdb.firebaseio.com/books/${findEdElemt.id}.json`,
        {
            method: "DELETE",
        })
        .then(res => {

            if (!res.ok) throw new Error("Something wrong ");
            return res.json();

        })
        .then((res) => {

            getAllBooks();
        })
        .catch((err) => {
        })
        .finally(() => {
        });
}



function PostImage(e) {
    const formData = new FormData();

    Promise.all(
        [...e.target.files].map((item) => {
            formData.append("formFile", item);
            return fetch("https://api.oqot.uz/api/1.0/file/upload", {
                method: "POST",
                headers: {

                },
                body: formData,
            }).then((res) => {
                return res.json();
            });
        })
    ).then((res) => {
        globalImageUrl = res.map((item) => {
            return `https://api.oqot.uz/api/1.0/file/download/${item}`;
        }).join(" ");

    });
}


document.querySelector("#img_url").addEventListener("change", PostImage);
document.querySelector("#img_url").addEventListener("change", showPostImage);
function showPostImage(e) {
    const file = e.target.files[0];

    document.querySelector("#showImageurl").setAttribute("src", URL.createObjectURL(file));


}


const loginBtn = document.querySelector(".admin-btn");

loginBtn.addEventListener("click", () => {
    window.location.replace("../index.html");
});


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