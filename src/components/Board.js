import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';


class Board extends Component {
  constructor() {
    super();

    this.state = {
      cards: [],
    };
  }

  componentDidMount() {
    const url = this.props.url + this.props.boardName + "/cards";
    axios.get(url)
      .then((response) => {
        const cards = response.data.map((cardHash) => {
          return cardHash["card"];
        })
        this.setState({cards});

      })
      .catch((error) => {

      });
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
      </div>
    )
  }

}

Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired,
};

export default Board;
