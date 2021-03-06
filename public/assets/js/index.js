var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");
var $delBtn = $(".delete-note");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};


////////////////////////////////////////////////////////////////////////////////
// A function for getting all notes from the db
// '$.ajax' performs an asynchronous AJAX request, here a 'get'
var getNotes = function() {

  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

////////////////////////////////////////////////////////////////////////////////
// A function for saving a note to the db
// '$.ajax' performs an asynchronous AJAX request, here a 'post'
var saveNote = function(note) {

  return $.ajax({
    url: "/api/notes",
    data: note,
    //type: "POST"
    method: "POST"
  });
};


//////////////////////////////////////////////////////////////////////////////////
// BONUS A function for deleting a note from the db
// '$.ajax' performs an asynchronous AJAX request, here a 'delete'
var deleteNote = function(id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};

//////////////////////////////////////////////////////////////////////////////////////
// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function() {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};


///////////////////////////////////////////////////////////////////////////////////////
// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function() {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val()
  };

  saveNote(newNote).then(function(data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};
//////////////////////////////////////////////////////////////////////////////////////////
// BONUS Delete the clicked note
var handleNoteDelete = function(event) {


  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  var note = $(this)
    .parent(".list-group-item")
    .data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  console.log( "Delete ID is: ", note.id );

  deleteNote(note.id).then(function() {
    getAndRenderNotes();
    renderActiveNote();
  });
};


/////////////////////////////////////////////////////////////////////////////////////////
// Sets the activeNote and displays it
var handleNoteView = function() {
  activeNote = $(this).data();
  renderActiveNote();
};


/////////////////////////////////////////////////////////////////////////////////////////
// Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};


///////////////////////////////////////////////////////////////////////////////////////////
// If a note's title or text are empty, hide the save button
// Or else show it
var handleRenderSaveBtn = function() {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};


////////////////////////////////////////////////////////////////////////////////////////////////
// Render's the list of note titles
var renderNoteList = function(notes) {

  $noteList.empty();

  var noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    var $li = $("<li class='list-group-item'>").data(note);
    var $span = $("<span>").text(note.title);
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );

    $li.append($span, $delBtn);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};

//////////////////////////////////////////////////////////////////////////
// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {

  return getNotes().then(function(data) {

    //console.log( "Notes data to be rendered: ", data );
    //console.log( "data.notes[0].title: ", data[0].title );

    // 'data' is a json object that contains the 'notes' array.
    renderNoteList(data);
  });
};


//////////////////////////////////////////////////////////////////////////////
// Event Listeners

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
//$delBtn.on( "click", handleNoteDelete );
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);


////////////////////////////////////////////////////////////////////////////
// Gets and renders the initial list of notes
getAndRenderNotes();
