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
const noteArchiveBtns = document.getElementsByClassName("note-archive-btn");
const noteDeleteBtns = document.getElementsByClassName("note-delete-btn");
// Archive Element
const archiveContainer = document.getElementById("archive-notes");
const archiveDeleteBtns = document.getElementsByClassName("archive-delete-btn");
// Managing state
const store = JSON.parse(localStorage.getItem("notes") || "[]");
const archive = JSON.parse(localStorage.getItem("archive") || "[]");

// creating note element for existing notes
if (store)
  store.forEach((note) => {
    const newNote = new Note(note);
    if (notesContainer) notesContainer.appendChild(newNote.noteElement());
  });

// creating archive note elements for archived notes
if (archive)
  archive.forEach((note) => {
    const newNote = new Note(note);
    if (archiveContainer)
      archiveContainer.appendChild(newNote.archiveNoteElement());
  });

// Handling note toggle menu
for (const hamburger of noteMenuBtns) {
  hamburger.addEventListener("click", function () {
    // const menu = this.firstChild;
    const menu = this.firstElementChild;
    const style = window.getComputedStyle(menu);
    if (style.visibility == "hidden") menu.style.visibility = "visible";
    else menu.style.visibility = "hidden";
  });
}

// handling archive addition
let arh_count = 0;
for (const btn of noteArchiveBtns) {
  btn.addEventListener("click", function () {
    store.pop(arh_count);
    const note = this.closest(".note");
    const title = note.querySelector(".note-title").innerText;
    const description = note.querySelector(".note-description").innerText;
    archive.push({ title, body: description });
    localStorage.setItem("archive", JSON.stringify(archive));
    localStorage.setItem("notes", JSON.stringify(store));
    note.remove();
  });
  arh_count++;
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

// Handling archive note Deletion
let arh_count_del = 0;
for (const btn of archiveDeleteBtns) {
  btn.addEventListener("click", function () {
    archive.pop(arh_count_del);
    localStorage.setItem("archive", JSON.stringify(archive));

    this.closest(".note").remove();
  });
  arh_count_del++;
}

// showing form
showForm?.addEventListener("click", function (): void {
  if (formContainer) {
    formContainer.style.visibility = "visible";
    formContainer.style.pointerEvents = "all";
  }
});

// hiding form
hideForm?.addEventListener("click", function (): void {
  if (formContainer) {
    formContainer.style.visibility = "hidden";
    formContainer.style.pointerEvents = "none";
  }
});

// handling form
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
