import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReview } from "../utils/api";
import { getComments } from "../utils/api";

const IndividualReview = () => {
  const [currentReview, setCurrentReview] = useState({});
  const [currentReviewComments, setCurrentReviewComments] = useState([]);
  const [isLoadingRev, setIsLoadingRev] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [votes, setVotes] = useState(0);

  const { review_id } = useParams();

  useEffect(() => {
    getReview(review_id).then((reviewdata) => {
      setCurrentReview(reviewdata);
      setVotes(reviewdata.votes);
      setIsLoadingRev(false);
    });
  }, [review_id]);

  useEffect(() => {
    getComments(review_id).then((comData) => {
      setCurrentReviewComments(comData);
      setIsLoadingComments(false);
    });
  }, [review_id]);

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
          <h3>{currentReview.review_body}</h3>
          <h3>votes:{currentReview.votes}</h3>
          <button>upvote</button>
          <button>downvote</button>

          {currentReviewComments.length ? (
            <>
              <h3>Comments</h3>
              <ul className="comment-section">
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
