import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';

const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]

class NewCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      emoji: "",
    };
  }

  resetState = () => {
    this.setState({
      text: "",
      emoji: "",
    });
  }

  onFormChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    const updatedState = {};
    updatedState[field] = value;
    this.setState(updatedState);
  }

  onSubmit = (event) => {
    event.preventDefault();

    if (this.state.text === '') return;

    this.props.addCardCallback(this.state);
    this.resetState();
  }

  emojiOptions = () => {
    return EMOJI_LIST.map((emojiName, i) => {
      return <option key={i} value={emojiName}>{emoji.getUnicode(emojiName)}</option>;
    })
  }

  render() {
    return (

      <section className="new-card-form">
        <section className="new-card-form__header">Add a Card!</section>

        <form onSubmit={this.onSubmit} className="new-card-form__form">
          <div>
            <label className="new-card-form__form-label" htmlFor="text">Text</label>
            <textarea className="new-card-form__form-textarea" name="text" placeholder="inspirational note" onChange={this.onFormChange} value={this.state.text} />
          </div>

          <div>
            <label className="new-card-form__form-label" htmlFor="emoji">Emoji</label>
            <select className="new-card-form__form-select" name="emoji" value={this.state.emoji} onChange={this.onFormChange}>
              {this.emojiOptions()}
            </select>
          </div>

            <input className="new-card-form__form-button" type="submit" name="submit" value="Add a Card" />
        </form>
      </section>
    );
  }


}

NewCardForm.propTypes = {
  addCardCallback: PropTypes.func.isRequired,
};

export default NewCardForm;
