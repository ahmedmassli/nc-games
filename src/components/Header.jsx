import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <section>
      <h1 className="custom-heading-h1">
        <Link to="/">NC Game</Link>
      </h1>
    </section>
  );
};

export default Header;
