const cardbuttonIndex = document.querySelector("#cardbuttonIndex");

cardbuttonIndex.addEventListener("click", () => {
    window.location.replace("../index.html");
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




            console.log(books);
            renderHtmlElements(books);
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





renderHtmlElements(books);
function renderHtmlElements(allBook) {
    let result = allBook.map((item, index) => {
        let element = `
     
        <table>
   
        <tbody>
           <tr>
              <td>
                <img src="${item.img_url}" style="width: 100px ; height: 100px;" alt="Bu yerda rasm bor">
              </td>
              <td>
               
                    <p class="section4-card__box--text">${item.author}</p>
                
              </td>
              <td>
                <span class="instock">In Stock</span>
              </td>
              <td>
              
               <input  onclick="bookmarkFunc(${item.ok})" class="button" type="number" value="1" min="0">
              
              </td>
              <td>
              <span class="section4-card__box--span">${item.price} so'm </span>
               </td>
               <td>
                <button  onclick="removeTodoApp(${item.ok})" id="deleteButton"><ion-icon name="trash-outline"></ion-icon></button>
               </td>
               <td>
                <button class="closebtn">add to cart</button>
               </td>
           </tr>

       
          
        </tbody>
     </table>
      
        `
        return element;
    }).join(" ");

    elements.innerHTML = result;
}



function removeTodoApp(index){
    books = books.filter((item)=>item.ok !==index);
     console.log(books);


     renderHtmlElements(books);

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

    console.log(bookmarArray );
    
}

bookmarkFunc()




