import { useEffect, useState } from "react";
import { getReviews } from "../utils/api";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { getReviewsBySP } from "../utils/api";
import "../styles/ListOfReviews.css";

const ListOfReviews = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { category_name } = useParams();
  /* eslint-disable no-unused-vars */
  let [searchParams, setSearchParams] = useSearchParams();
  /* eslint-enable no-unused-vars */
  let category = searchParams.get("category");
  let order = searchParams.get("order");
  let sort_by = searchParams.get("sort_by");

  useEffect(() => {
    if (category) {
      getReviewsBySP(category, sort_by, order).then((rdata) => {
        setReviews(rdata.data.revData);
        setIsLoading(false);
      });
    } else {
      getReviews().then((reviewdata) => {
        setReviews(reviewdata);
        setIsLoading(false);
      });
    }
  }, [category, sort_by, order]);

  useEffect(() => {
    if (!category_name) {
      getReviews().then((reviewdata) => {
        setReviews(reviewdata);
        setIsLoading(false);
      });
    } else {
      getReviewsBySP(category_name).then((data) => {
        setReviews(data.data.revData);
        setIsLoading(false);
      });
    }
  }, [category_name]);

  return (
    <main>
      <h2>Board Game Reviews</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="review-section-list">
          {reviews.map((review) => {
            return (
              <div key={review.review_id}>
                <Link to={`/reviews/${review.review_id}`}>
                  <li className="review-section">
                    <img
                      alt="pic for the game"
                      src={review.review_img_url}
                      className="list-images"
                    ></img>
                    <div className="review-section-title">
                      <h3>{review.title}</h3>
                    </div>
                    <h4 class="centered-item">by:{review.owner}</h4>
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
