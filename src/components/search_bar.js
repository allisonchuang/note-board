import React, { Component } from 'react';
import '../style.scss';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { noteTitle: '' };
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  onSubmit() {
    this.props.onSubmit(this.state.noteTitle);
    this.setState({ noteTitle: '' });
  }
  onInputChange(event) {
    this.setState({ noteTitle: event.target.value });
  }
  render() {
    return (
      <div>
        <input className="searchbar" onChange={this.onInputChange} value={this.state.noteTitle} placeholder={'New note title'} />
        <button onClick={this.onSubmit}>Submit</button>
      </div>
    );
  }
}

export default SearchBar;
