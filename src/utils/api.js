import axios from "axios";
export const getReviews = () => {
  return axios
    .get("https://board-game.onrender.com/api/reviews")
    .then(({ data }) => {
      return data.revData;
    });
};
