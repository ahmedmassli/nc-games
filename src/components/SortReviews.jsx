import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SortReviews = ({ setReviewsDisplayed }) => {
  const navigate = useNavigate();

  const [dropdownCat, setDropDownCat] = useState("");
  const [dropdownSort, setDropDownSort] = useState("");
  const [dropdownOrder, setDropDownOrder] = useState("");

  const HandleSelectCat = (event) => {
    setDropDownCat(event.target.value);
  };
  const HandleSelectSort = (event) => {
    setDropDownSort(event.target.value);
  };

  const HandleSelectOrder = (event) => {
    setDropDownOrder(event.target.value);
  };

  const onsubmit = (event) => {
    event.preventDefault();
    setReviewsDisplayed(dropdownCat);
    if (dropdownCat === "") {
      navigate(`/`);
    } else {
      if (dropdownSort === "") {
        navigate(`/?category=${dropdownCat}`);
      } else {
        if (dropdownOrder === "") {
          navigate(`/?category=${dropdownCat}&sort_by=${dropdownSort}`);
        } else {
          navigate(
            `/?category=${dropdownCat}&sort_by=${dropdownSort}&order=${dropdownOrder}`
          );
        }
      }
    }
  };
  return (
    <form onSubmit={onsubmit} className="category-section">
      <label htmlFor="choose Category">Category</label>
      <select onChange={HandleSelectCat}>
        <option value={""}>All</option>
        <option value={"hidden-roles"}>hidden-roles</option>
        <option value={"dexterity"}>dexterity</option>
        <option value={"strategy"}>strategy</option>
        <option value={"deck-building"}>deck-building</option>
        <option value={"engine-building"}>engine-building</option>
        <option value={"push-your-luck"}>push-your-luck</option>
        <option value={"roll-and-write"}>roll-and-write</option>
      </select>
      <label htmlFor="sort_by">sort by</label>
      <select onChange={HandleSelectSort}>
        <option value={""}></option>
        <option value={"created_at"}>date</option>
        <option value={"comment_count"}>comment count</option>
        <option value={"votes"}>votes</option>
      </select>
      <label htmlFor="order">order</label>
      <select onChange={HandleSelectOrder}>
        <option value={""}></option>
        <option value={"ASC"}>ascending</option>
        <option value={"DESC"}>descending</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SortReviews;
