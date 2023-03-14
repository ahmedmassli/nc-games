import axios from "axios";
export const getReviews = () => {
  return axios
    .get("https://board-game.onrender.com/api/reviews")
    .then(({ data }) => {
      return data.revData;
    });
};

export const getReview = (review_id) => {
  return axios
    .get(`https://board-game.onrender.com/api/reviews/${review_id}`)
    .then(({ data }) => {
      return data.revData[0];
    });
};

export const getComments = (review_id) => {
  return axios
    .get(`https://board-game.onrender.com/api/reviews/${review_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    });
};

export const patchVotes = (num, review_id) => {
  return axios
    .patch(`https://board-game.onrender.com/api/reviews/${review_id}`, {
      inc_votes: num,
    })
    .then((success) => {
      console.log(success);
    })
    .catch((error) => {
      console.log(error.response.status);
      alert(`request failed`);
    });
};
