import { useEffect, useState } from "react";
import { getReviews } from "../utils/api";
import { Link } from "react-router-dom";

const ListOfReviews = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then((reviewdata) => {
      setReviews(reviewdata);
      setIsLoading(false);
    });
  }, []);

  return (
    <main>
      <h2>reviews</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="review-section-list">
          {reviews.map((review) => {
            return (
              <div key={review.review_id}>
                <Link to={`/reviews/${review.review_id}`}>
                  <li className="review-section">
                    <h3>{review.title}</h3>
                    <img
                      src={review.review_img_url}
                      className="list-images"
                    ></img>
                    <h4>by:{review.owner}</h4>
                  </li>
                </Link>
              </div>
            );
          })}
        </ul>
      )}
    </main>
  );
};

export default ListOfReviews;
