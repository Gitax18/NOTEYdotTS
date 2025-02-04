import Note from "./classes/class.Note";

// Form Elements
const formContainer = document.getElementById("form-container");
const form = document.getElementById("add-note-form");
const titleInput = document.getElementById("title") as HTMLInputElement;
const bodyInput = document.getElementById("description") as HTMLInputElement;
const showForm = document.getElementById("add-btn");
const hideForm = document.getElementById("form-close-btn");
// Note Element
const notesContainer = document.getElementById("notes");
const noteMenuBtns = document.getElementsByClassName("note-option");
const noteArchiveBtn = document.getElementsByClassName("note-archive-btn");
const noteDeleteBtns = document.getElementsByClassName("note-delete-btn");
// Managing state
const store = JSON.parse(localStorage.getItem("notes") || "[]");

// creating note element for existing notes
if (store)
  store.forEach((note) => {
    const newNote = new Note(note);
    if (notesContainer) notesContainer.appendChild(newNote.noteElement());
  });

// Handling note toggle menu
for (const hamburger of noteMenuBtns) {
  hamburger.addEventListener("click", function () {
    // const menu = this.firstChild;
    const menu = this.firstElementChild;
    const style = window.getComputedStyle(menu);
    console.log(style.visibility);
    if (style.visibility == "hidden") menu.style.visibility = "visible";
    else menu.style.visibility = "hidden";
  });
}

// Handling note Deletion
let count = 0;
for (const btn of noteDeleteBtns) {
  btn.addEventListener("click", function () {
    store.pop(count);
    localStorage.setItem("notes", JSON.stringify(store));

    this.closest(".note").remove();
  });
  count++;
}

showForm?.addEventListener("click", function (): void {
  if (formContainer) {
    formContainer.style.visibility = "visible";
    formContainer.style.pointerEvents = "all";
  }
});

hideForm?.addEventListener("click", function (): void {
  if (formContainer) {
    formContainer.style.visibility = "hidden";
    formContainer.style.pointerEvents = "none";
  }
});

form?.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = {
    title: titleInput.value,
    body: bodyInput.value,
  };
  if (notesContainer) {
    const newNote = new Note(data);
    try {
      newNote.validateNoteData();
      notesContainer.appendChild(newNote.noteElement());
      store?.push(data);
      localStorage.setItem("notes", JSON.stringify(store));
      titleInput.value = "";
      bodyInput.value = "";
      window.location.reload();
    } catch (err) {
      titleInput.value = titleInput.value.slice(0, 24);
    }
  } else {
    alert(
      "notesContainer is not available: error in main.ts form.addEventListener()"
    );
  }
});
