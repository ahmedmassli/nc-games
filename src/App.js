import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import ListOfReviews from "./components/ListOfReviews";
import { useState } from "react";
import IndividualReview from "./components/IndividualReview";
import NotFound from "./components/NotFound";
import SortReviews from "./components/SortReviews";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={            <>
              <SortReviews
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
              <ListOfReviews
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </>}
        />
        <Route path="/category/:category_name" element={ <>
          <SortReviews 
          isLoading={isLoading}
          setIsLoading={setIsLoading}/>
          <ListOfReviews 
          isLoading={isLoading}
          setIsLoading={setIsLoading}/> </>} />
        <Route path="/reviews/:review_id" element={<IndividualReview />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
