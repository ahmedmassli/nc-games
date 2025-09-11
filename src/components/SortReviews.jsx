import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SortReviews.css";

const SortReviews = ({ setReviewsDisplayed }) => {
  const navigate = useNavigate();

  const [dropdownCat, setDropDownCat] = useState("");
  const [dropdownSort, setDropDownSort] = useState("");
  const [dropdownOrder, setDropDownOrder] = useState("");

  const HandleSelectCat = (event) => setDropDownCat(event.target.value);
  const HandleSelectSort = (event) => setDropDownSort(event.target.value);
  const HandleSelectOrder = (event) => setDropDownOrder(event.target.value);

  const onsubmit = (event) => {
    event.preventDefault();
    setReviewsDisplayed(dropdownCat);

    if (!dropdownCat) {
      navigate(`/`);
    } else if (!dropdownSort) {
      navigate(`/?category=${dropdownCat}`);
    } else if (!dropdownOrder) {
      navigate(`/?category=${dropdownCat}&sort_by=${dropdownSort}`);
    } else {
      navigate(
        `/?category=${dropdownCat}&sort_by=${dropdownSort}&order=${dropdownOrder}`
      );
    }
  };

  return (
    <form className="filters" onSubmit={onsubmit}>
      <div className="filters">
        <select onChange={HandleSelectCat}>
          <option value="" disabled selected>
            Select Category
          </option>
          <option value="All">All</option>
          <option value="hidden-roles">Hidden Roles</option>
          <option value="dexterity">Dexterity</option>
          <option value="strategy">Strategy</option>
          <option value="deck-building">Deck-Building</option>
          <option value="engine-building">Engine-Building</option>
          <option value="push-your-luck">Push Your Luck</option>
          <option value="roll-and-write">Roll & Write</option>
        </select>
      </div>

      <div className="filters">
        <select id="sort_by" onChange={HandleSelectSort}>
          <option value="" disabled selected>
            Select Sort by
          </option>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
      </div>

      <div className="filters">
        <select id="order" onChange={HandleSelectOrder}>
          <option value="" disabled selected>
            Select Order
          </option>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </div>

      <button type="submit">Apply</button>
    </form>
  );
};

export default SortReviews;
