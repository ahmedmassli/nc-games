import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <section>
      <h1>
        <Link className="custom-heading-h1" to="/">
          NC Game
        </Link>
      </h1>
    </section>
  );
};

export default Header;
