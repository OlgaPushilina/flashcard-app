import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api/index";

function Deck() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);

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

  const handleDeleteDeck = () => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      deleteDeck(deckId)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting deck:", error);
        });
    }
  };

  const handleDeleteCard = (cardId) => {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      deleteCard(cardId)
        .then(() => readDeck(deckId))
        .then((data) => {
          setDeck(data);
          setCards(data.cards || []);
        })
        .catch((error) => {
          console.error("Error deleting card:", error);
        });
    }
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>

      <div className="deck-info mb-4">
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>

        <button
          className="btn btn-secondary mr-2"
          onClick={() => navigate(`/decks/${deckId}/edit`)}
        >
          <span className="oi oi-pencil" /> Edit
        </button>
        <button
          className="btn btn-primary mr-2"
          onClick={() => navigate(`/decks/${deckId}/study`)}
        >
          <span className="oi oi-book" /> Study
        </button>
        <button
          className="btn btn-primary mr-2"
          onClick={() => navigate(`/decks/${deckId}/cards/new`)}
        >
          <span className="oi oi-plus" /> Add Cards
        </button>
        <button className="btn btn-danger" onClick={handleDeleteDeck}>
          <span className="oi oi-trash" />
        </button>
      </div>

      <h3>Cards</h3>
      <div className="cards-list">
        {cards.length === 0 ? (
          <p>No cards in this deck yet.</p>
        ) : (
          cards.map((card) => (
            <div key={card.id} className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <p className="card-text">{card.front}</p>
                  </div>
                  <div className="col-6">
                    <p className="card-text">{card.back}</p>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-secondary mr-2"
                    onClick={() =>
                      navigate(`/decks/${deckId}/cards/${card.id}/edit`)
                    }
                  >
                    <span className="oi oi-pencil" /> Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    <span className="oi oi-trash" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Deck;
