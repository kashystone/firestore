const list = document.querySelector('ul');
const form = document.querySelector('form');




const addBook = (book, id) =>{
    let time = book.created_at.toDate();
    let html = ` 
    <li data-id="${id}">
        <div>${book.title}</div>
        <div>${time}</div>
        <button class="btn btn-danger btn-sm my-2">delete</button>
    </li>
`;

list.innerHTML += html;
}

deleteBooks = (id) => {
const books = document.querySelectorAll('li')
books.forEach(book =>{
    if(book.getAttribute('data-id') === id){
        book.remove();
    };
});
};

db.collection('books').onSnapshot(snapshot =>{
    snapshot.docChanges().forEach(change =>{
        const doc = change.doc;
        if(change.type === 'added'){
            addBook(doc.data() , doc.id)
        }else if (change.type === 'removed'){
            deleteBooks(doc.id)

        };
    })
})

form.addEventListener('submit', e =>{
    e.preventDefault();

    const now = new Date();
    const book = {
        title: form.book.value,
        created_at: firebase.firestore.Timestamp.fromDate(now)

    }

        db.collection('books').add(book).then(() => {
            console.log('books added')
        }).catch((err) => {
            console.log(err)
        })
})

list.addEventListener('click', e=>{
if(e.target.tagName === 'BUTTON'){
    const id = e.target.parentElement.getAttribute('data-id');
    db.collection('books').doc(id).delete();
}

})