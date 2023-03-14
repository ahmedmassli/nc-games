import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const IndividualReview = ({ currentReviewId }) => {
  const [currentReview, setCurrentReview] = useState({});
  const [currentReviewComments, setCurrentReviewComments] = useState([]);
  const [isLoadingRev, setIsLoadingRev] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  const { review_id } = useParams();

  useEffect(() => {
    axios
      .get(`https://board-game.onrender.com/api/reviews/${review_id}`)
      .then(({ data }) => {
        setCurrentReview(data.revData[0]);

        setIsLoadingRev(false);
      });
  }, [currentReviewId, review_id]);

  useEffect(() => {
    axios
      .get(`https://board-game.onrender.com/api/reviews/${review_id}/comments`)
      .then(({ data }) => {
        console.log(data.comments);
        setCurrentReviewComments(data.comments);
        setIsLoadingComments(false);
      });
  }, [currentReviewId, review_id]);

  return (
    <main>
      <h2>Review of board game {currentReview.review_id}</h2>

      {isLoadingComments && isLoadingRev ? (
        <p>Loading...</p>
      ) : (
        <section className="individual-review-section">
          <h3 className="individual-review-title">{currentReview.title}</h3>
          <img
            className="individual-image"
            src={currentReview.review_img_url}
            alt={currentReview.title}
          ></img>
          {currentReviewComments.length ? (
            <>
              <h3>Comments</h3>
              <ul className="comment-section">
                {" "}
                {currentReviewComments.map((comment) => {
                  return (
                    <div key={comment.comment_id}>
                      <li className="each-comment-section">
                        <h4>{comment.body}</h4>
                        <h5>by:{comment.author}</h5>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </>
          ) : (
            <h3>No Comments (っ °Д °;)っ</h3>
          )}
        </section>
      )}
    </main>
  );
};
export default IndividualReview;
