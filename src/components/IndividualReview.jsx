import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const IndividualReview = ({ currentReviewId }) => {
  const [currentReview, setCurrentReview] = useState({});

  const { review_id } = useParams();

  useEffect(() => {
    axios
      .get(`https://board-game.onrender.com/api/reviews/${review_id}`)
      .then(({ data }) => {
        setCurrentReview(data.revData[0]);
      });
  }, [currentReviewId, review_id]);

  return (
    <section className="review-section-individual">
      <h2>{currentReview.title}</h2>
      <img
        src={currentReview.review_img_url}
        alt={currentReview.category}
      ></img>
      <section className="review-list-subsection">
        <h3>{currentReview.title}</h3>
      </section>
    </section>
  );
};
export default IndividualReview;
