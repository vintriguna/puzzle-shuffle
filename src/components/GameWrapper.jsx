import React, { useState, useEffect } from "react";
import Card from "./Card.jsx";
import Scoreboard from "./Scoreboard.jsx";
import LoadingScreen from "./LoadingScreen.jsx";
import Title from "./Title.jsx";

export default function GameWrapper() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(0);
  const NUM_OF_CARDS = 12;
  class MemoryCard {
    beenChosen;
    name;
    imageUrl;
    id;
    constructor(name, imageUrl) {
      this.name = name;
      this.imageUrl = imageUrl;
      this.beenChosen = false;
      this.id = crypto.randomUUID();
    }
  }

  function changeLevel() {
    setLevel(level + 1);
    restart();
  }

  function restart() {
    setLoading(true);
    let newCards = [];
    let promises = [];
    const randomStart = Math.floor(Math.random() * 70); //random number between 0-70
    for (let i = randomStart; i < randomStart + NUM_OF_CARDS; i++) {
      promises.push(getImageContent(`https://picsum.photos/id/${i}/info`));
    }
    Promise.all(promises).then((values) => {
      for (let i = 0; i < values.length; i++) {
        let card = new MemoryCard(values[i].author, values[i].download_url);
        newCards.push(card);
      }

      setCards(newCards);
      setLoading(false);
    });
  }

  //Reset the score and set 'beenChosen' to false for every card
  function resetScore() {
    setScore(0);
    cards.forEach((card) => {
      card.beenChosen = false;
    });
  }

  function shuffleCards() {
    let newCards = cards.slice();
    for (let i = newCards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = newCards[i];
      newCards[i] = newCards[j];
      newCards[j] = temp;
    }
    setCards(newCards);
  }

  //Handle click of the card
  function handleClick(e) {
    const selectedCard = e.target;
    const memCard = cards.filter(
      (card) => card.id == selectedCard.getAttribute("data-id")
    )[0];
    if (memCard.beenChosen) {
      resetScore();
    } else {
      memCard.beenChosen = true;
      setScore(score + 1);
    }
    shuffleCards();
  }

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }

    if (score !== 0 && score % NUM_OF_CARDS === 0) {
      changeLevel();
    }
  }, [score]);

  //Get JSON from API endpoint
  async function getImageContent(link) {
    let result = await fetch(link);
    let data = await result.json();
    return data;
  }
  //Make API calls and create cards
  useEffect(() => {
    restart();
  }, []);

  //   if (loading) {
  //     return <LoadingScreen />;
  //   }

  return loading ? (
    <LoadingScreen />
  ) : (
    <>
      <div className="banner">
        <Title />
        <Scoreboard score={score} highScore={highScore} />
      </div>
      <div className="cardsContainer">
        {cards.map((card) => (
          <Card
            name={card.name}
            url={card.imageUrl}
            id={card.id}
            beenChosen={card.beenChosen}
            key={card.id}
            handleClick={handleClick}
          />
        ))}
      </div>
    </>
  );
}
