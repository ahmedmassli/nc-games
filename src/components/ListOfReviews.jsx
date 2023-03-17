import { useEffect, useState } from "react";
import { getReviews } from "../utils/api";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { getRevs } from "../utils/api";
import { getReviewsBySP } from "../utils/api";

const ListOfReviews = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { category_name } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get("category"));
  console.log(searchParams.get("order"));
  console.log(searchParams.get("sort_by"));

  let category = searchParams.get("category");
  let order = searchParams.get("order");
  let sort_by = searchParams.get("sort_by");

  if (category) {
  }

  useEffect(() => {
    if (category) {
      getReviewsBySP(category, sort_by, order).then((rdata) => {
        console.log(rdata.data.revData);
        setReviews(rdata.data.revData);
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
      getRevs(category_name).then((data) => {
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
