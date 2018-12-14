import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';



class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      errorMessage: "",
    };
  }

  componentDidMount() {
    const url = this.props.url + this.props.boardName + "/cards";
    axios.get(url)
      .then((response) => {
        const cards = response.data.map((cardHash) => {
          return cardHash["card"];
        })
        const errorMessage = "";
        this.setState({cards, errorMessage});

      })
      .catch((error) => {
        const errorMessage = error.message;
        this.setState({errorMessage});
      });
  }

  addCard = (newCard) => {
    const url = this.props.url + this.props.boardName + "/cards";
    axios.post(url, newCard)
      .then((response) => {

        const newCard = response.data.card;
        const cards = [newCard, ...this.state.cards];
        const errorMessage = "";
        this.setState({cards, errorMessage});

      })
      .catch((error) => {
        const errorMessage = error.message;
        this.setState({errorMessage});
      })

  }

  removeCard = (cardId) => {
    const url = "https://inspiration-board.herokuapp.com/cards/" + cardId;

    axios.delete(url)

      .then((response) => {
        const cards = [...this.state.cards];
        const deletedCard = cards.find((card) => card.id === cardId);
        cards.splice(cards.indexOf(deletedCard), 1);
        const errorMessage = "";
        this.setState({cards, errorMessage});
      })
      .catch((error) => {
        const errorMessage = error.message;
        this.setState({errorMessage});
      })

  }

  populateCards = () => {
    return this.state.cards.map((card) => {
      return <Card key={card.id} id={card.id} text={card.text} emoji={card.emoji} removeCardCallback={this.removeCard}/>
    });
  }

  render() {
    return (
      <section>
        {this.state.errorMessage && <section>{this.state.errorMessage}</section>}
        <NewCardForm addCardCallback={this.addCard}/>
        <div className='board'>
          {this.populateCards()}
        </div>
      </section>

    )
  }

}

Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired,
};

export default Board;
