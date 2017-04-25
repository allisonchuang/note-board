import React from 'react';
import Note from './note';

const NoteList = (props) => {
  const noteItems = props.notes.entrySeq().map(([id, note]) => {
    return (<Note id={id}
      updateNote={props.updateNote}
      deleteNote={props.deleteNote}
      startEditing={props.startEditing}
      endEditing={props.endEditing}
      renderEditing={props.renderEditing}
      marked={props.marked}
      key={id}
      note={note}
    />);
  });

  return (
    <div id="noteList">
      { noteItems }
    </div>
  );
};

export default NoteList;
