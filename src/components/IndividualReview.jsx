import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReview } from "../utils/api";
import { getComments } from "../utils/api";
import { postComment } from "../utils/api";
import { patchVotes } from "../utils/api";
import "../styles/IndividualReview.css";

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

  if (review_id > 24 || review_id < 1) {
    return alert("game review does not exist, try one between 1 and 24");
  } else if (isNaN(review_id)) {
    return alert("game review does not exist, path invalid");
  } else {
    return (
      <main>
        <h2>Review of board game {currentReview.review_id}</h2>

        {isLoadingComments && isLoadingRev ? (
          <p>Loading...</p>
        ) : (
          <section className="individual-review-section">
            <h3 className="individual-review-title">{currentReview.title}</h3>
            <div id="image_div">
              <img
                className="individual-image"
                src={currentReview.review_img_url}
                alt={currentReview.title}
              ></img>
            </div>

            <h3 className="individual-review-body">
              {currentReview.review_body}
            </h3>

            {currentReviewComments.length ? (
              <>
                <h3>Comments</h3>
                <ul className="comment-section">
                  {currentReviewComments.map((comment, index) => {
                    return (
                      <div key={index}>
                        <li className="each-comment-section">
                          <h4 id="each-comment-body">{comment.body}</h4>
                          <h5 id="each-comment-author">by: {comment.author}</h5>
                        </li>
                      </div>
                    );
                  })}
                </ul>
                <form onSubmit={HandleSubmit}>
                  <input
                    type="text"
                    placeholder="Type Registered Username"
                    onChange={handleUsernameInput}
                    value={userName}
                  ></input>
                  <input
                    id="Comment"
                    type="text"
                    placeholder="Type Comment"
                    onChange={handleCommentInput}
                    value={comment}
                  ></input>
                  <button id="comment_button" type="submit">
                    Add Comment
                  </button>
                </form>
              </>
            ) : (
              <form onSubmit={HandleSubmit}>
                <h3>No Comments (っ °Д °;)っ</h3>
                <input
                  type="text"
                  placeholder="Type Registered Username"
                  onChange={handleUsernameInput}
                  value={userName}
                ></input>
                <input
                  type="text"
                  id="Comment"
                  placeholder="Type Comment"
                  onChange={handleCommentInput}
                  value={comment}
                ></input>
                <button id="comment_button" type="submit">
                  Add Comment
                </button>
              </form>
            )}
            <div className="vote-row">
              <h4>Votes: {votes}</h4>
              <button className="vote_button" onClick={add}>
                Upvote
              </button>
              <button className="vote_button" onClick={subtarct}>
                Downvote
              </button>
            </div>
          </section>
        )}
      </main>
    );
  }
};
export default IndividualReview;
