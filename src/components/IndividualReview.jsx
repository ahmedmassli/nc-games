import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReview } from "../utils/api";
import { getComments } from "../utils/api";
import { postComment } from "../utils/api";
import { postRegUser } from "../utils/api";
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
  const [newUserName, setNewUserName] = useState("");
  const [newName, setName] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [current, setCurrent] = useState(0);

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

  useEffect(() => {
    if (currentReviewComments.length < 2) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % currentReviewComments.length), 6000);
    return () => clearInterval(id);
  }, [currentReviewComments.length]);

  const HandleSubmit = (event) => {
    event.preventDefault();
    if (userName.length > 0 && comment.length > 0) {
          setCurrentReviewComments((currentReviewComments) => [
      ...currentReviewComments,
      { body: comment, author: userName },
      ]);
      postComment(userName, comment, review_id);
      setUserName("");
      setComment("");
    } else {
      if (userName.length === 0 && comment.length === 0) {
        alert("please fill in both the username and comment (●ˇ∀ˇ●)");
      } else if (userName.length === 0) {
        alert("please fill in the username entry (●ˇ∀ˇ●)");
      } else {
        alert("please fill in the comment entry (●ˇ∀ˇ●)");
      }
    }
};

  const checkImageURL = (url) => {
    return new Promise((resolve) => {
      const image = new Image();

      image.onload = () => resolve(true);
      image.onerror = () => resolve(false);

      image.src = url;
    });
  };

  const HandleRegSubmit = async (event) => {
    event.preventDefault();
    if (newUserName.trim().length > 0 && newName.trim().length > 0 && avatarURL.trim().length > 0) {

      const trimmedAvatarURL = avatarURL.trim();
      const isImageValid = await checkImageURL(trimmedAvatarURL);

      if (!isImageValid) {
      alert("Please enter a working image URL.");
      return;}

  try {
    await postRegUser(
      newUserName.trim(),
      newName.trim(),
      trimmedAvatarURL
    );

    alert("Thanks for registering the new user (❁´◡`❁)");
  } catch (error) {
    alert("Registration failed. Please try again.");
  }
    
    
    } else {
      alert("please fill in all the inputs (●ˇ∀ˇ●)");
    }
  };

  const handleUsernameInput = (event) => {
    setUserName(event.target.value);
  };

  const handleCommentInput = (event) => {
    setComment(event.target.value);
  };

  const handleNewUsernameInput = (event) => {
    setNewUserName(event.target.value);
  };

  const handleNameInput = (event) => {
    setName(event.target.value);
  };

  const handleAvatarURLInput = (event) => {
    setAvatarURL(event.target.value);
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

        {isLoadingComments && isLoadingRev ? (
          <h1>Loading... ヾ(＠⌒ー⌒＠)ノ</h1>
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

            <h4 className="individual-review-body">
              {currentReview.review_body}
            </h4>

            <div className="vote-row">
              <h4>Votes: {votes}</h4>
              <div className="vote-buttons">
              <button className="ui button" onClick={add}>
                Upvote
              </button>

              <button className="ui button" onClick={subtarct}>
                Downvote
              </button>
              </div>
            </div>

            {currentReviewComments.length ? (
              <>
                <h3>{currentReviewComments.length < 2 ? "Comment" : "Comments"}</h3>
                <ul className="comment-section">
                  {currentReviewComments.map((comment, index) => {
                    return (
                      <div key={index}  className={index === current ? "comment-slide comment-slide-on" : "comment-slide"} >
                        <li className="each-comment-section">
                          <h4 id="each-comment-body">{comment.body}</h4>
                          <h5 id="each-comment-author">{comment.author}</h5>
                          <img
                            id="each-comment-avatar_url"
                            src={comment.avatar_url}
                            alt={"Avatar for commentator"}
                          ></img>
                        </li>
                      </div>
                    );
                  })}
                </ul>
                <div className="comment-user-layout">
                  <form onSubmit={HandleSubmit} className="comment-form">
                    <div class="ui input" bis_skin_checked="1">
                    <input
                      type="text"
                      placeholder="Type Registered Username"
                      onChange={handleUsernameInput}
                      value={userName}
                    ></input>
                    </div>
                    <div class="ui input" bis_skin_checked="1">
                    <textarea
                      className="comment-textarea"
                      placeholder="Type Comment"
                      onChange={handleCommentInput}
                      value={comment}
                    ></textarea>  
                    </div>
                    <button className="ui button" type="submit">
                      Add Comment
                    </button>
                  </form>
                  <form onSubmit={HandleRegSubmit} className="register-user-form">
                    <div class="ui input" bis_skin_checked="1">
                    <input
                      type="text"
                      placeholder="Type New Username"
                      onChange={handleNewUsernameInput}
                      value={newUserName}
                    ></input>
                    </div>
                    <div class="ui input" bis_skin_checked="1">
                    <input
                      id="Name"
                      type="text"
                      placeholder="Type Name"
                      onChange={handleNameInput}
                      value={newName}
                    ></input>
                    </div>
                    <div class="ui input" bis_skin_checked="1">
                    <input
                      id="avatarURL"
                      type="text"
                      placeholder="Type Avatar URL"
                      onChange={handleAvatarURLInput}
                      value={avatarURL}
                    ></input>
                    </div>
                    <button className="ui button" type="submit">
                      Add New User
                    </button>
                  </form>
                </div>  
              </>
            ) : (
              <>
              <div className="comment-user-layout">
                <form onSubmit={HandleSubmit} className="comment-form">
                  <h3>No Comments (っ °Д °;)っ</h3>
                  <div class="ui input" bis_skin_checked="1">
                  <input
                    type="text"
                    placeholder="Type Registered Username"
                    onChange={handleUsernameInput}
                    value={userName}
                  ></input>
                  </div>  
                  <div class="ui input" bis_skin_checked="1">
                  <input
                    type="text"
                    id="Comment"
                    placeholder="Type Comment"
                    onChange={handleCommentInput}
                    value={comment}
                  ></input>
                  </div>  
                  <button className="ui button" type="submit">
                    Add Comment
                  </button>
                </form>
                <form onSubmit={HandleRegSubmit} className="register-user-form">
                  <input
                    type="text"
                    placeholder="Type New Username"
                    onChange={handleNewUsernameInput}
                    value={newUserName}
                  ></input>
                  <input
                    id="Name"
                    type="text"
                    placeholder="Type Name"
                    onChange={handleNameInput}
                    value={newName}
                  ></input>
                  <input
                    id="avatarURL"
                    type="text"
                    placeholder="Type Avatar URL"
                    onChange={handleAvatarURLInput}
                    value={avatarURL}
                  ></input>
                  <button className="ui button" type="submit">
                    Add New User
                  </button>
                </form>
              </div>  
              </>
            )}

          </section>
        )}
      </main>
    );
  }
};
export default IndividualReview;
