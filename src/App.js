import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import ListOfReviews from "./components/ListOfReviews";
import { useState } from "react";
import IndividualReview from "./components/IndividualReview";

function App() {
  const [currentReviewId, setCurrentReviewId] = useState(0);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<ListOfReviews setCurrentReviewId={setCurrentReviewId} />}
        />
        <Route
          path="/reviews/:review_id"
          element={<IndividualReview currentReviewId={currentReviewId} />}
        />
      </Routes>
    </div>
  );
}

export default App;
