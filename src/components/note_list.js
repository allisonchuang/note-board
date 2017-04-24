import React from 'react';
import Note from './note';

const NoteList = (props) => {
  const noteItems = props.notes.entrySeq().map(([id, note]) => {
    return (<Note id={id}
      updateNote={props.updateNote}
      renderEditing={props.renderEditing}
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
