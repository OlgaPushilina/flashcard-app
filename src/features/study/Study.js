import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck } from "../../utils/api/index";

function Study() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal)
      .then((data) => {
        setDeck(data);
        setCards(data.cards || []);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error loading deck:", error);
        }
      });

    return () => abortController.abort();
  }, [deckId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      const restart = window.confirm(
        "Restart cards?\n\nClick 'OK' to restart, or 'Cancel' to return to the home page."
      );

      if (restart) {
        setCurrentCardIndex(0);
        setIsFlipped(false);
      } else {
        navigate("/");
      }
    }
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

  if (cards.length <= 2) {
    return (
      <div className="study">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <span className="oi oi-home" /> Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>

        <h1>Study: {deck.name}</h1>

        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {cards.length} cards in
          this deck.
        </p>
        <Link to={`/decks/${deckId}/cards/new`}>
          <button className="btn btn-primary">
            <span className="oi oi-plus" /> Add Cards
          </button>
        </Link>
      </div>
    );
  }

  const currentCard = cards[currentCardIndex];

  return (
    <div className="study">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>

      <h1>Study: {deck.name}</h1>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {currentCardIndex + 1} of {cards.length}
          </h5>
          <p className="card-text">
            {isFlipped ? currentCard.back : currentCard.front}
          </p>

          <button className="btn btn-secondary mr-2" onClick={handleFlip}>
            Flip
          </button>

          {isFlipped && (
            <button className="btn btn-primary" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Study;
