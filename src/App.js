import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import ListOfReviews from "./components/ListOfReviews";
import { useState } from "react";
import IndividualReview from "./components/IndividualReview";
import NotFound from "./components/NotFound";
import SortReviews from "./components/SortReviews";

function App() {
  const [reviewsDisplayed, setReviewsDisplayed] = useState("");

  return (
    <div className="App">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <Header />
      <SortReviews setReviewsDisplayed={setReviewsDisplayed} />
      <Routes>
        <Route
          path="/"
          reviewsDisplayed={reviewsDisplayed}
          element={<ListOfReviews />}
        />
        <Route path="/category/:category_name" element={<ListOfReviews />} />
        <Route path="/reviews/:review_id" element={<IndividualReview />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
