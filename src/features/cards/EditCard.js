import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api/index";
import CardForm from "./CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

  useEffect(() => {
    const abortController = new AbortController();

    Promise.all([
      readDeck(deckId, abortController.signal),
      readCard(cardId, abortController.signal),
    ])
      .then(([loadedDeck, loadedCard]) => {
        setDeck(loadedDeck);
        setCard(loadedCard);
        setFormData({
          front: loadedCard.front || "",
          back: loadedCard.back || "",
        });
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error loading deck or card:", error);
        }
      });
    return () => abortController.abort();
  }, [deckId, cardId]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedCardData = {
      ...card,
      front: formData.front,
      back: formData.back,
    };
    updateCard(updatedCardData)
      .then(() => {
        navigate(`/decks/${deckId}`);
      })
      .catch((error) => {
        console.error("Error updating card:", error);
      });
  };

  const handleCancel = () => {
    navigate(`/decks/${deckId}`);
  };

  if (!deck || !card) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit-card">
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
            Edit Card {cardId}
          </li>
        </ol>
      </nav>

      <h1>Edit Card</h1>
      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        submitButtonText="Save"
        cancelButtonText="Cancel"
      />
    </div>
  );
}

export default EditCard;
