import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import ListOfReviews from "./components/ListOfReviews";
import { useState } from "react";
import IndividualReview from "./components/IndividualReview";
import NotFound from "./components/NotFound";

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
