var bookName=document.getElementById("bookNameInp");
var bookAuthor=document.getElementById("bookAuthorInp");
var bookPrice=document.getElementById("bookPriceInp");
var bookGenre=document.getElementById("bookGenreInp");
var addBtn=document.getElementById("addBtn");
var lightContainer=document.querySelector(".light-container");
var closeIcon=document.getElementById("closeIcon");
var deletedItem=document.getElementById("deletedItem");
var errorMsg=document.getElementById("nameError");
var booksContainer;
var currentIndex=0;

if(localStorage.getItem("books"==null)){
    booksContainer=[];
}
else{
    booksContainer=JSON.parse( localStorage.getItem("books") );
    display();
}

function addBook(){
    if(addBtn.innerHTML=="  Add new book  "){

    books={
        name:bookName.value,
        author:bookAuthor.value,
        price:bookPrice.value,
        genre:bookGenre.value
    }
    booksContainer.push(books);
    reset();
    localStorage.setItem("books",JSON.stringify(booksContainer));
    display();
}
else if (addBtn.innerHTML=` Update book `){

    updateBook()
    
    reset();
    localStorage.setItem('books',JSON.stringify(booksContainer)); 
    addBtn.innerHTML="  Add new book  ";


}
}
function display(){
    var temp=``;
    for(i=0;i<booksContainer.length;i++){
        temp+=`
        
        <tr>
        <td>${i+1}</td>
        <td>${booksContainer[i].name}</td>
        <td>${booksContainer[i].author}</td>
        <td>${booksContainer[i].price}</td>
        <td>${booksContainer[i].genre}</td>
        <td colspan="2"><i class="fas fa-pencil-alt ms-1" onclick="updateInp(${i})" id="updateIcon"></i> <i class="fas fa-trash-alt ms-3" onclick="deleteRow(${i})"id="deleteIcon"></i></td>
        </tr>
    `
    }
    document.getElementById("tableData").innerHTML=temp;
}
function reset(){
    bookName.value="";
    bookAuthor.value="";
    bookGenre.value="";
    bookPrice.value="";
}
function deleteRow(index){
    
    booksContainer.splice(index ,1);
    localStorage.setItem("books",JSON.stringify(booksContainer));
    display();

    
    lightContainer.classList.replace("d-none","d-flex");
    deletedItem.innerHTML=`You deleted item number ${index+1}`
    
    
}
function search(term){
    var temp=``;
    for (var i = 0; i < booksContainer.length; i++) {
        if(booksContainer[i].name.toLowerCase().includes(term.toLowerCase()) ||
        booksContainer[i].author.toLowerCase().includes(term.toLowerCase()) || 
        booksContainer[i].price.includes(term) || booksContainer[i].genre.toLowerCase().includes(term.toLowerCase()))
        {

            temp+=`
            <tr>
            <td>${i+1}</td>
            <td>${booksContainer[i].name}</td>
            <td>${booksContainer[i].author}</td>
            <td>${booksContainer[i].price}</td>
            <td>${booksContainer[i].genre}</td>       
            <td colspan="2"><i class="fas fa-pencil-alt ms-1" onclick="updateInp(${i})" id="updateIcon"></i> <i class="fas fa-trash-alt ms-3" onclick="deleteRow(${i})"id="deleteIcon"></i></td>

    
        </tr>`       
     }
        else{
            console.log("not contain");
        }
        document.getElementById("tableData").innerHTML=temp;
    }
}
function updateInp(index){
    currentIndex=index;
    var temp=booksContainer[index];
    bookNameInp.value=temp.name;
    bookAuthorInp.value=temp.author;
    bookPriceInp.value=temp.price;
    bookGenreInp.value=temp.genre;
    addBtn.innerHTML=` Update book `;
}
function updateBook(){
    books={
        name:bookName.value,
        author:bookAuthor.value,
        price:bookPrice.value,
        genre:bookGenre.value
    }
    booksContainer[currentIndex].name=books.name;
    booksContainer[currentIndex].author=books.author;
    booksContainer[currentIndex].price=books.price;
    booksContainer[currentIndex].genre=books.genre;
    display()
}
function closeDelWindow(){
    lightContainer.classList.replace("d-flex","d-none");

}
closeIcon.addEventListener('click',closeDelWindow)
document.addEventListener('keydown',function(e){
    if(e.code=="Escape"){
        closeDelWindow()
    }
    
})
