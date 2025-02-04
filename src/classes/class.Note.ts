interface NoteStructure {
  title: String;
  body: String;
}

export default class Note {
  private noteTitle;
  private noteBody;
  private uniqid;

  constructor(data: NoteStructure) {
    this.noteTitle = data.title;
    this.noteBody = data.body;
    // generating unique id to identify note element
    const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    this.uniqid = randLetter + Date.now();
  }

  public noteElement(): HTMLElement {
    // creating html element dynamically
    const div = document.createElement("div");
    div.classList.add("note");
    div.dataset.id = this.uniqid; // adding "data-id" attribute to element
    div.innerHTML = `
            <!-- header to store note options and title -->
            <header class="note-header">
              <strong class="note-title">${this.noteTitle}</strong>
              <!-- below is the container to hold option menu and btn to show/hide it -->
              <div class="note-option">
                <!-- option menu container -->
                <div class="option-menu">
                  <ul>
                    <li id="note-archive-btn">
                      <span class="material-symbols-outlined"> archive </span>
                      <p>Add to Archive</p>
                    </li>
                    <li
                      class="note-delete-btn"
                      id="remove-note-btn"
                      role="button"
                    >
                      <span class="material-symbols-outlined"> delete </span>
                      <p>Delete Note</p>
                    </li>
                  </ul>
                </div>
                <!-- btn to show/hide menu -->
                <span class="material-symbols-outlined hamburger-note">
                  density_medium
                </span>
              </div>
            </header>
            <div class="note-body">
              <p class="note-description">
                ${this.noteBody}
              </p>
            </div>
    `;
    return div;
  }

  public validateNoteData(): never | boolean {
    if (this.noteTitle.length > 24 || this.noteTitle.length <= 0) {
      alert("Title length should not be greater than 24 chars or less than 1");
      throw new Error(
        "Title length should not be greater than 24 chars or less than 1"
      );
    }

    if (this.noteTitle.length <= 0) {
      alert("Please enter some text in the note body");
      throw new Error("Please enter some text in the note body");
    }

    return false;
  }
}
