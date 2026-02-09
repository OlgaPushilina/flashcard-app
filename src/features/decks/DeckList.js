import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api/index";

function DeckList() {
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal)
      .then((data) => {
        setDecks(data);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error loading decks:", error);
        }
      });

    return () => abortController.abort();
  }, []);

  const handleDelete = (deckId) => {
    if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
      deleteDeck(deckId)
        .then(() => listDecks())
        .then((data) => {
          setDecks(data);
        })
        .catch((error) => {
          console.error("Error deleting deck:", error);
        });
    }
  };

  return (
    <div className="home">
      <Link to="/decks/new">
        <button className="btn btn-secondary mb-3">
          <span className="oi oi-plus" /> Create Deck
        </button>
      </Link>

      <div className="deck-list">
        {decks.map((deck) => (
          <div key={deck.id} className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <h5 className="card-title">{deck.name}</h5>
                <p className="text-muted">{deck.cards ? deck.cards.length : 0} cards</p>
              </div>
              <p className="card-text">{deck.description}</p>

              <div className="d-flex justify-content-between">
                <div>
                  <button
                    className="btn btn-secondary mr-2"
                    onClick={() => navigate(`/decks/${deck.id}/study`)}
                  >
                    <span className="oi oi-book" /> Study
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/decks/${deck.id}`)}
                  >
                    <span className="oi oi-eye" /> View
                  </button>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(deck.id)}
                >
                  <span className="oi oi-trash" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeckList;
