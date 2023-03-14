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

  //board-game.onrender.com/api/reviews/1/comments

  return (
    <main>
      <h2>reviews</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="review-section-list">
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
                  <h3>{review.title}</h3>
                  <img
                    src={review.review_img_url}
                    className="list-images"
                  ></img>
                  <h4>by:{review.owner}</h4>
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
