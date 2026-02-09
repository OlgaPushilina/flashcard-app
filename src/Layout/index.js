import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../features/decks/DeckList";
import Deck from "../features/decks/Deck";
import CreateDeck from "../features/decks/CreateDeck";
import EditDeck from "../features/decks/EditDeck";
import AddCard from "../features/cards/AddCard";
import EditCard from "../features/cards/EditCard";
import Study from "../features/study/Study";

function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<DeckList />} />

          <Route path="decks">
            <Route path="new" element={<CreateDeck />} />

            <Route path=":deckId">
              <Route index element={<Deck />} />
              <Route path="edit" element={<EditDeck />} />
              <Route path="study" element={<Study />} />

              <Route path="cards">
                <Route path="new" element={<AddCard />} />
                <Route path=":cardId/edit" element={<EditCard />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default Layout;
