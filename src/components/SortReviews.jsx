import { useEffect ,useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SortReviews.css";

const SortReviews = ({ isLoading, setIsLoading  }) => {
  const navigate = useNavigate();

  const [dropdownCategory, setDropDownCategory] = useState("All");
  const [dropdownSort, setDropDownSort] = useState("created_at");
  const [dropdownOrder, setDropDownOrder] = useState("ASC");

  useEffect(() => {
  window.$("#category-dropdown").dropdown({
    onChange: (value) => {
      setDropDownCategory(value);
    },
  });
}, []);


  useEffect(() => {
  window.$("#sort-dropdown").dropdown({
    onChange: (value) => {
      setDropDownSort(value);
    },
  });
}, []);

  useEffect(() => {
  window.$("#order-dropdown").dropdown({
    onChange: (value) => {
      setDropDownOrder(value);
    },
  });
}, []);

  const onsubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!dropdownCategory) {
      navigate(`/`);
    } else if (!dropdownSort) {
      navigate(`/?category=${dropdownCategory}`);
    } else if (!dropdownOrder) {
      navigate(`/?category=${dropdownCategory}&sort_by=${dropdownSort}`);
    } else {
      navigate(
        `/?category=${dropdownCategory}&sort_by=${dropdownSort}&order=${dropdownOrder}`
      );
    }
  };

  return (
    <form className="filters" onSubmit={onsubmit}>
      <div className="filters">
          <div className="ui selection dropdown" id="category-dropdown">
            <input type="hidden" value={dropdownCategory} />
            <i className="dropdown icon"></i>
            <div className="default text">Select Category</div>
            <div className="menu">
              <div className="item" data-value="All">All</div>
              <div className="item" data-value="hidden-roles">Hidden Roles</div>
              <div className="item" data-value="dexterity">Dexterity</div>
              <div className="item" data-value="strategy">Strategy</div>
              <div className="item" data-value="deck-building">Deck-Building</div>
              <div className="item" data-value="engine-building">Engine-Building</div>
              <div className="item" data-value="push-your-luck">Push Your Luck</div>
              <div className="item" data-value="roll-and-write">Roll & Write</div>
            </div>
          </div>
      </div>

      <div className="filters">
        <div className="ui selection dropdown" id="sort-dropdown">
          <input type="hidden" value={dropdownSort} />
          <i className="dropdown icon"></i>
          <div className="default text">Select Sort by</div>
          <div className="menu">
            <div className="item" data-value="created_at">Date</div>
            <div className="item" data-value="comment_count">Comment Count</div>
            <div className="item" data-value="votes">Votes</div>
          </div>
        </div>
      </div>

      <div className="filters">
        <div className="ui selection dropdown" id="order-dropdown">
          <input type="hidden" value={dropdownOrder} />
          <i className="dropdown icon"></i>
          <div className="default text">Select Order by</div>
          <div className="menu">
          	<div className="item" data-value="ASC">Ascending</div>
          	<div className="item" data-value="DESC">Descending</div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className={`ui button ${isLoading ? "loading" : ""}`}
        disabled={isLoading}
      >
        {isLoading ? "Loading" : "Apply"}
      </button>
    </form>
  );
};

export default SortReviews;