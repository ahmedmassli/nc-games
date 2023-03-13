import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const directToHome = () => {
    navigate("/");
  };

  return (
    <section>
      <h1 onClick={directToHome}>NC Game</h1>
    </section>
  );
};

export default Header;
