import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import marked from 'marked';
import SearchBar from './components/search_bar';
import NoteList from './components/note_list';
import './style.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map({}),
      isEditing: false,
      currId: null,
      tempText: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.createNote = this.createNote.bind(this);
    this.startEditing = this.startEditing.bind(this);
    this.endEditing = this.endEditing.bind(this);
    this.renderEditing = this.renderEditing.bind(this);
  }

  onInputChange(event) {
    this.setState({ tempTitle: event.target.value });
  }

  updateNote(id, fields) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    });
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  createNote(title) {
    const id = Math.random() * 10;
    const note = {
      title,
      text: null,
      x: (Math.random() + 0.5) * 500,
      y: (Math.random() + 0.5) * 100,
      zIndex: 0,
    };
    this.setState({
      notes: this.state.notes.set(id, note),
    });
  }

  startEditing() {
    this.setState({ isEditing: true });
  }

  endEditing() {
    this.setState({ isEditing: false });
  }

  renderEditing(id, title, text) {
    if (this.state.isEditing && id === this.state.currId) {
      return (
        <div>
          <div className="note-header">
            <div className="header-left">
              <div className="note-title">{title}</div>
              <div className="header-icon"><i onClick={() => { this.deleteNote(id); this.endEditing(); }} className="fa fa-trash-o fa-lg" aria-hidden="true" /></div>
              <div className="header-icon"><i onClick={(event) => {
                this.updateNote(id, { text: this.state.tempText });
                this.endEditing();
              }} className="fa fa-check fa-lg" aria-hidden="true"
              /></div>
            </div>
            <div className="header-right">
              <i className="fa fa-arrows-alt fa-lg note-mover" aria-hidden="true" />
            </div>
          </div>
          <div className="text">
            <textarea className="textarea" onChange={(event) => { this.state.tempText = event.target.value; }} defaultValue={text} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="note-header">
            <div className="header-left">
              <div className="note-title" max>{title}</div>
              <div className="header-icon"><i onClick={() => { this.deleteNote(id); }} className="fa fa-trash-o fa-lg" aria-hidden="true" /></div>
              <div className="header-icon"><i onClick={() => { this.startEditing(); this.setState({ currId: id, tempText: text }); }} className="fa fa-pencil fa-lg" aria-hidden="true" /></div>
            </div>
            <div className="header-right">
              <i className="fa fa-arrows-alt fa-lg note-mover" aria-hidden="true" />
            </div>
          </div>
          <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(text || '') }} />
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <SearchBar id="searchbar" onSubmit={title => this.createNote(title)} />
        <NoteList notes={this.state.notes}
          updateNote={this.updateNote}
          renderEditing={this.renderEditing}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
