import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SortReviews.css";

const SortReviews = ({ setReviewsDisplayed }) => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [dropdownSort, setDropDownSort] = useState("");
  const [dropdownOrder, setDropDownOrder] = useState("");

  const HandleSelectCat = (e) => setCategory(e.target.value);
  const HandleSelectSort = (e) => setDropDownSort(e.target.value);
  const HandleSelectOrder = (e) => setDropDownOrder(e.target.value);

  const onsubmit = (e) => {
    e.preventDefault();
    setReviewsDisplayed(category);

    if (!category) {
      navigate(`/`);
    } else if (!dropdownSort) {
      navigate(`/?category=${category}`);
    } else if (!dropdownOrder) {
      navigate(`/?category=${category}&sort_by=${dropdownSort}`);
    } else {
      navigate(
        `/?category=${category}&sort_by=${dropdownSort}&order=${dropdownOrder}`
      );
    }
  };

  return (
    <form className="filters" onSubmit={onsubmit}>
      {/* CATEGORY */}
      <div className="filters">
        <select value={category} onChange={HandleSelectCat}>
          <option value="" disabled hidden>
            Select Category ▾
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

      {/* SORT BY */}
      <div className="filters">
        <select value={dropdownSort} onChange={HandleSelectSort}>
          <option value="" disabled hidden>
            Select Sort by ▾
          </option>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
      </div>

      {/* ORDER */}
      <div className="filters">
        <select value={dropdownOrder} onChange={HandleSelectOrder}>
          <option value="" disabled hidden>
            Select Order ▾
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
