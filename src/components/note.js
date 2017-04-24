import React from 'react';
import Draggable from 'react-draggable';
import '../style.scss';

const Note = (props) => {
  return (
    <Draggable
      handle=".note-mover"
      grid={[25, 25]}
      position={{ x: props.note.x, y: props.note.y }}
      zIndex={props.note.zIndex}
      onStart={props.onStartDrag}
      // help from Tim
      onDrag={(e, ui) => props.updateNote(props.id, { x: ui.x, y: ui.y })}
      onStop={props.onStopDrag}
    >
      <div className="note">
        {props.renderEditing(props.id, props.note.title, props.note.text)}
      </div>
    </Draggable>
  );
};


export default Note;
