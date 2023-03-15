import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReview } from "../utils/api";
import { getComments } from "../utils/api";
import { postComment } from "../utils/api";
import { patchVotes } from "../utils/api";

const IndividualReview = () => {
  const [currentReview, setCurrentReview] = useState({});
  const [currentReviewComments, setCurrentReviewComments] = useState([]);
  const [isLoadingRev, setIsLoadingRev] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [votes, setVotes] = useState(0);
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");

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
      console.log(12);
    });
  }, [review_id]);

  const HandleSubmit = (event) => {
    event.preventDefault();
    setCurrentReviewComments((currentReviewComments) => [
      ...currentReviewComments,
      { body: comment, author: userName },
    ]);
    if (userName.length > 0 && comment.length > 0) {
      postComment(userName, comment, review_id);
    } else {
      alert("please fill in both inputs (●ˇ∀ˇ●)");
    }
  };

  const handleUsernameInput = (event) => {
    setUserName(event.target.value);
  };

  const handleCommentInput = (event) => {
    setComment(event.target.value);
  };

  const add = () => {
    setVotes(votes + 1);
    patchVotes(1, review_id);
  };

  const subtarct = () => {
    setVotes(votes - 1);
    patchVotes(-1, review_id);
  };

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
          <h3>votes:{votes}</h3>
          <button onClick={add}>upvote</button>
          <button onClick={subtarct}>downvote</button>

          {currentReviewComments.length ? (
            <>
              <h3>Comments</h3>
              <ul className="comment-section">
                {currentReviewComments.map((comment, index) => {
                  return (
                    <div key={index}>
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
          <form onSubmit={HandleSubmit}>
            <input
              type="text"
              placeholder="username"
              onChange={handleUsernameInput}
              value={userName}
            ></input>
            <input
              type="text"
              placeholder="comment"
              onChange={handleCommentInput}
              value={comment}
            ></input>
            <button type="submit">add comment</button>
          </form>
        </section>
      )}
    </main>
  );
};
export default IndividualReview;
