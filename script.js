const noteBtn = document.getElementById("add-btn"),
    noteTitle = document.getElementById("note-title"),
    noteText = document.getElementById("note-text"),
    clear = document.querySelector(".clear");


// go through local storage and get the array of object stored in locale storage
function getNotes() {
    let notes = localStorage.getItem("notes");
    // if there is no elements yet create an empty arra
    if(notes == null){
        notesObj = [];
    }else{
    // If there is an element use JSON.PArse to transform data stored in string to an object   
        notesObj = JSON.parse(notes)
    }
}


// add event listener
noteBtn.addEventListener("click", (e)=> {
    // because the btn is in form it will refresh the page by default
    e.preventDefault();

    if(noteTitle.value == "" || noteText.value == ""){
        return alert("please add note title and details")
    }

    getNotes() // notesObject array

    // create an object with title and text
    let myObj= {
        title: noteTitle.value,
        text: noteText.value
    }

    //push into NotesObejcts array
    notesObj.push(myObj);

    // save items to the local storage using set an JSON.stringify to be able to store in local storage in string. You have to specify the key
    localStorage.setItem("notes",JSON.stringify(notesObj))

    // clear the form after parsing

    document.querySelector("form").reset();
    showNotes()


})

// display function on page
function showNotes () {
   // get the notes saves in the local storage
   getNotes()

   
   let html = "";

    //acces to each notes with a for each stored in notesObj 
   notesObj.forEach(function(elements,index){
    // create the note format and add it to a variable (html)
    //when you use this.id it allows us to refer to the proper id where the button is in that case the index whithin th obeject is stored in the array object (notesObj)
    html += 
    `
    <div class="note">
        <div class="note-cta">
            <p class="note-counter">Note ${index + 1}</p>
            <div class="note-ca-btn">
            <button id ="${index}"class="note-btn" onclick="deleteNote(this.id)"><i class="fas fa-trash" ></i>Delete</button>
            <button id="${index}" class="note-btn edit-btn" onclick="editNote(this.id)"><i class="fas fa-edit"></i>Edit</button>
            </div>
        </div>
        <hr>
        <h3 class="note-title">Title: ${elements.title}</h3>
        <p class="note-text">${elements.text}</p>
    </div>
    `;

   })

   //display on your app
   let noteElm = document.getElementById("notes");

   if(notesObj.length !== 0){
    noteElm.innerHTML = html;
   }else{
    noteElm.innerHTML = "No notes added, please add a note"
   }

}

// delete a single note


//you have to add on the html the onclick and call the function "deleteNote(this.id)"
function deleteNote(index) {
    let confirmDel = confirm("Delete this note??")

    if(confirmDel) {

        getNotes();

        // notesObj is wath you obtain after getNotes() => it is the array of objects then you delete by selected the item in (index) and chose how many you want to delete strating from your index (1);
        notesObj.splice(index,1)

        // then you have to reset your local storage
        localStorage.setItem("notes", JSON.stringify(notesObj))

        showNotes();

    }
}

//delete all the notes

clear.addEventListener("click", ()=>{
    localStorage.clear();
    showNotes()
})

// Edit note

function editNote (index) {
// in order to edit a an already existing note check if the form is empty
    if(noteTitle.value !== "" || noteText.value !== ""){
        alert("Please clear the form before editing an existing note")
    }
        getNotes();

        //we have to acces to the title and text stored in the array of object in local storage
        noteTitle.value = notesObj[index].title;
        noteText.value = notesObj[index].text;

        notesObj.splice(index,1)

        localStorage.setItem("notes", JSON.stringify(notesObj))
        showNotes();
}


// allow notes to appear when you relaod the page
showNotes();


