import axios from "axios";

// Use the environment variable for the base URL
const apiUrl = process.env.REACT_APP_API_URL;

export const getReviews = () => {
  return axios
    .get(`${apiUrl}/api/reviews`) // Use the dynamic URL
    .then(({ data }) => {
      return data.revData;
    });
};

export const getReview = (review_id) => {
  return axios.get(`${apiUrl}/api/reviews/${review_id}`).then(({ data }) => {
    return data.revData[0];
  });
};

export const getComments = (review_id) => {
  return axios
    .get(`${apiUrl}/api/reviews/${review_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    });
};

export const postComment = (username, comment, review_id) => {
  return axios
    .post(`${apiUrl}/api/reviews/${review_id}/comments`, {
      username: `${username}`,
      body: `${comment}`,
    })
    .then((success) => {
      console.log(success);
    })
    .catch((error) => {
      if (error.response.status === 404) {
        alert(`request failed as username is not recognised`);
      } else {
        alert(`request failed`);
      }

      console.log(error);
    });
};

export const postRegUser = (username, name, avatar_url) => {
  return axios
    .post(`${apiUrl}/api/users`, {
      username: `${username}`,
      name: `${name}`,
      avatar_url: `${avatar_url}`,
    })
    .then((success) => {
      console.log(success);
    })
    .catch((error) => {
      if (error.response.status === 404) {
        alert(`request failed as username is not recognised`);
      } else {
        alert(`request failed`);
      }
      console.log(error);
    });
};

export const patchVotes = (num, review_id) => {
  return axios
    .patch(`${apiUrl}/api/reviews/${review_id}`, {
      inc_votes: num,
    })
    .then((success) => {
      console.log(success);
      alert(`vote added ╰(*°▽°*)╯`);
    })
    .catch((error) => {
      console.log(error.response.status);
      alert(`request failed`);
    });
};

export const getRevs = (category_name) => {
  return axios.get(`${apiUrl}/api/reviews/?category=${category_name}`);
};

export const getReviewsBySP = (category, sort_by, order) => {
  if (category && sort_by && order) {
    return axios.get(
      `${apiUrl}/api/reviews/?category=${category}&sort_by=${sort_by}&order=${order}`
    );
  } else if (category && sort_by) {
    return axios.get(
      `${apiUrl}/api/reviews/?category=${category}&sort_by=${sort_by}`
    );
  } else {
    return axios.get(`${apiUrl}/api/reviews/?category=${category}`);
  }
};
