import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

class Card extends Component {
  render() {
    return (
      <div key={this.props.id} className="card">
        <p>{this.props.text}</p>
        {this.props.emoji && <p>{emoji.getUnicode(this.props.emoji) ? emoji.getUnicode(this.props.emoji) : this.props.emoji}</p>}
      </div>
    )
  }
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  emoji: PropTypes.string,
};

export default Card;
