import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

class Card extends Component {
  render() {
    return (
      <div key={this.props.id} className="card">
        <section className="card__content">
          <section className="card__content-text">
            {this.props.text}
          </section>
          <section className="card__content-emoji">
            {this.props.emoji && <p>{emoji.getUnicode(this.props.emoji) ? emoji.getUnicode(this.props.emoji) : this.props.emoji}</p>}
          </section>
        </section>
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
