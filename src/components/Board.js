import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';


class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      url: props.url + props.boardName + "/cards",
    };
  }

  componentDidMount() {

    axios.get(this.state.url)
      .then((response) => {
        const cards = response.data.map((cardHash) => {
          return cardHash["card"];
        })
        this.setState({cards});

      })
      .catch((error) => {

        //fill in an error handler here

      });
  }

  addCard = (newCard) => {

    axios.post(this.state.url, newCard)
      .then((response) => {

        const newCard = response.data.card;
        const cards = [newCard, ...this.state.cards];

        this.setState({cards});

      })
      .catch((error) => {
        // do something
      })




  }

  populateCards = () => {
    return this.state.cards.map((card) => {
      return <Card id={card.id} text={card.text} emoji={card.emoji} />
    });
  }

  render() {
    return (
      <div>
        {this.populateCards()}
        <NewCardForm addCardCallback={this.addCard}/>
      </div>

    )
  }

}

Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired,
};

export default Board;
