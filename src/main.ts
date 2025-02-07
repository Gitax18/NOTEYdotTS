import Note from "./classes/class.Note";
import { NoteStructure } from "./classes/class.Note";
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
let store: NoteStructure[] = JSON.parse(localStorage.getItem("notes") || "[]");
let archive: NoteStructure[] = JSON.parse(
  localStorage.getItem("archive") || "[]"
);

// creating note element for existing notes
if (store)
  store.forEach((note: NoteStructure) => {
    const newNote = new Note(note);
    if (notesContainer) notesContainer.appendChild(newNote.noteElement());
  });

// creating archive note elements for archived notes
if (archive)
  archive.forEach((note: NoteStructure) => {
    const newNote = new Note(note);
    if (archiveContainer)
      archiveContainer.appendChild(newNote.archiveNoteElement());
  });

// Handling note toggle menu
for (const hamburger of noteMenuBtns) {
  hamburger.addEventListener("click", function (this: HTMLElement) {
    const menu: HTMLElement = this.firstElementChild as HTMLElement;
    const style = window.getComputedStyle(menu);
    if (style.visibility == "hidden") menu.style.visibility = "visible";
    else menu.style.visibility = "hidden";
  });
}

// handling archive addition
for (let btnNo = 0; btnNo < noteArchiveBtns.length; btnNo++) {
  noteArchiveBtns[btnNo].addEventListener(
    "click",
    function (this: HTMLElement) {
      store.splice(btnNo, 1);
      const note: HTMLElement = this.closest(".note") as HTMLElement;
      const title: string = (note.querySelector(".note-title") as HTMLElement)
        ?.innerText;
      const description: string = (
        note.querySelector(".note-description") as HTMLElement
      )?.innerText;
      archive.push({ title, body: description });
      localStorage.setItem("archive", JSON.stringify(archive));
      localStorage.setItem("notes", JSON.stringify(store));
      note.remove();
    }
  );
}

// Handling note Deletion
for (let btnNo = 0; btnNo < noteDeleteBtns.length; btnNo++) {
  noteDeleteBtns[btnNo].addEventListener("click", function (this: HTMLElement) {
    store.splice(btnNo, 1);
    localStorage.setItem("notes", JSON.stringify(store));
    this.closest(".note")?.remove();
  });
}

// Handling archive note Deletion
for (let btnNo = 0; btnNo < archiveDeleteBtns.length; btnNo++) {
  archiveDeleteBtns[btnNo].addEventListener(
    "click",
    function (this: HTMLElement) {
      archive.splice(btnNo, 1);

      localStorage.setItem("archive", JSON.stringify(archive));

      this.closest(".note")?.remove();
    }
  );
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
