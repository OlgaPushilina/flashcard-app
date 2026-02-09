import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api/index";
import CardForm from "./CardForm";

function AddCard() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((loadedDeck) => {
        setDeck(loadedDeck);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error loading deck:", error);
        }
      });
    return () => abortController.abort();
  }, [deckId]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = (event) => {
    event.preventDefault();
    createCard(deckId, formData)
      .then(() => {
        setFormData({
          front: "",
          back: "",
        });
      })
      .catch((error) => {
        console.error("Error creating card:", error);
      });
  };

  const handleDone = () => {
    navigate(`/decks/${deckId}`);
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

  return (
    <div className="add-card">
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
            Add Card
          </li>
        </ol>
      </nav>

      <h1>{deck.name}: Add Card</h1>
      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSave}
        handleCancel={handleDone}
        submitButtonText="Save"
        cancelButtonText="Done"
      />
    </div>
  );
}

export default AddCard;
