import React from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';
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
      onDrag={(e, ui) => props.updateNote(props.id, { title: props.note.title, text: props.note.text, x: ui.x, y: ui.y })}
      onStop={props.onStopDrag}
    >
      <div className="note">
        {props.renderEditing(props.id, props.note.title, props.note.text)}
        <div className="note-header">
          <div className="header-left">
            <div className="note-title">{props.note.title}</div>
            <div className="header-icon"><i onClick={() => { props.deleteNote(props.id); }} className="fa fa-trash-o fa-lg" aria-hidden="true" /></div>
            <div className="header-icon"><i onClick={() => {
              props.startEditing(props.id, props.note.title, props.note.text);
            }} className="fa fa-pencil fa-lg" aria-hidden="true"
            />
            </div>
          </div>
          <div className="header-right">
            <i className="fa fa-arrows-alt fa-lg note-mover" aria-hidden="true" />
          </div>
        </div>
        <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(props.note.text || '') }} />
      </div>
    </Draggable>
  );
};


export default Note;
