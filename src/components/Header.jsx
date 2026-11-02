import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <section>
      <h1>
        <Link  to="/">
          <h1 className="custom-heading-h1">NC Games</h1>
        </Link>
      </h1>
    </section>
  );
};

export default Header;
