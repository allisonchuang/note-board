import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import SearchBar from './components/search_bar';
import NoteList from './components/note_list';
import * as firebasedb from './firebasedb';
import './style.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map({}),
      isEditing: false,
      currId: null,
      tempTitle: '',
      tempText: '',
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.createNote = this.createNote.bind(this);
    this.startEditing = this.startEditing.bind(this);
    this.endEditing = this.endEditing.bind(this);
    this.renderEditing = this.renderEditing.bind(this);
  }

  componentDidMount() {
    firebasedb.fetchNotes((notes) => {
      this.setState({ notes: Immutable.Map(notes) });
    });
  }

  onInputChange(event) {
    this.setState({ tempTitle: event.target.value });
  }

  updateNote(id, fields) {
    this.setState({});
    firebasedb.updateNote(id, fields);
  }

  deleteNote(id) {
    this.setState({});
    firebasedb.deleteNote(id);
  }

  createNote(title) {
    this.setState({});
    firebasedb.createNote(title);
  }

  startEditing(id, title, text) {
    this.setState({ isEditing: true, currId: id, tempTitle: title, tempText: text });
  }

  endEditing() {
    this.setState({ isEditing: false });
  }

  renderEditing(id, title, text) {
    if (this.state.isEditing && id === this.state.currId) {
      return (
        <div>
          <button onClick={this.openModal}>Open Modal</button>
          <Modal
            isOpen={this.state.isEditing}
            onRequestClose={this.endEditing}
            contentLabel="Modal"
            className="modal"
          >
            <h1>Edit Note</h1>
            <div className="title-editing">
              <div className="title-edit-label">Edit title: </div>
              <input className="modal-input" maxLength={40} defaultValue={title} onChange={(event) => { this.state.tempTitle = event.target.value; }} />
            </div>
            <div className="text-editing">
              <div className="text-edit-label">Edit text: </div>
              <textarea className="modal-textarea" defaultValue={text} onChange={(event) => { this.state.tempText = event.target.value; }} />
            </div>
            <div className="modal-buttons">
              <button type="modal-button" onClick={this.endEditing}>Cancel</button>
              <button type="modal-button" onClick={() => {
                this.endEditing();
                this.updateNote(id, { title: this.state.tempTitle, text: this.state.tempText });
                this.setState({ tempTitle: '', tempText: '' });
              }}
              >Finish</button>
            </div>
          </Modal>
        </div>
      );
    } else {
      return <div />;
    }
  }

  render() {
    return (
      <div>
        <SearchBar id="searchbar" onSubmit={title => this.createNote(title)} />
        <NoteList notes={this.state.notes}
          updateNote={this.updateNote}
          deleteNote={this.deleteNote}
          startEditing={this.startEditing}
          endEditing={this.endEditing}
          renderEditing={this.renderEditing}
          marked={this.marked}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
