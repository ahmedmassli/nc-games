import { useEffect, useState } from "react";
import { getReviews } from "../utils/api";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const ListOfReviews = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { category_name } = useParams();
  console.log(category_name, "here");

  useEffect(() => {
    if (!category_name) {
      getReviews().then((reviewdata) => {
        console.log(reviewdata);
        setReviews(reviewdata);
        setIsLoading(false);
      });
    } else {
      axios
        .get(
          `https://board-game.onrender.com/api/reviews/?category=${category_name}`
        )
        .then((data) => {
          console.log(data.data.revData);
          setReviews(data.data.revData);
          setIsLoading(false);
        });
    }
  }, [category_name]);

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
                      alt="pic for the game"
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
