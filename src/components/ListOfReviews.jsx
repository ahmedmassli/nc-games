import { useEffect, useState } from "react";
import { getReviews } from "../utils/api";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ListOfReviews = ({ setCurrentReviewId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then((reviewdata) => {
      setReviews(reviewdata);
      setIsLoading(false);
    });
  }, []);

  const navigate = useNavigate();

  const reviewSelect = (review_id) => {
    navigate(`/reviews/${review_id}`);
    setCurrentReviewId(review_id);
  };

  return (
    <main>
      <h2>reviews</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {" "}
          {reviews.map((review) => {
            return (
              <div
                key={review.review_id}
                onClick={() => {
                  reviewSelect(review.review_id);
                }}
              >
                <li className="review-section">
                  <h2>{review.title}</h2>
                  <img src={review.review_img_url}></img>
                  <h3>by:{review.owner}</h3>
                </li>
              </div>
            );
          })}
        </ul>
      )}
    </main>
  );
};

export default ListOfReviews;
