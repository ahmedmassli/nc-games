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

// export const patchVotes = () => {
//   return axios
//     .patch("https://board-game.onrender.com/api/reviews")
//     .send({ inc_votes: -1 });
// };
