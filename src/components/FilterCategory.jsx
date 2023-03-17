import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FilterCategory = ({ setReviewsDisplayed }) => {
  const navigate = useNavigate();
  const [dropdown, setDropDown] = useState("");
  const HandleSelect = (event) => {
    setDropDown(event.target.value);
  };
  const onsubmit = (event) => {
    event.preventDefault();
    setReviewsDisplayed(dropdown);
    if (dropdown === "") {
      navigate(`/`);
    } else {
      navigate(`/category/${dropdown}`);
    }
  };

  return (
    <form onSubmit={onsubmit} className="category-section">
      <label htmlFor="Select Category">Select Category</label>
      <select onChange={HandleSelect}>
        <option value={""}>All</option>
        <option value={"hidden-roles"}>hidden-roles</option>
        <option value={"dexterity"}>dexterity</option>
        <option value={"strategy"}>strategy</option>
        <option value={"deck-building"}>deck-building</option>
        <option value={"engine-building"}>engine-building</option>
        <option value={"push-your-luck"}>push-your-luck</option>
        <option value={"roll-and-write"}>roll-and-write</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FilterCategory;
