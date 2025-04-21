import { Link } from "react-router-dom";

export const HomeNavigation = () => {
  return (
    <nav>
      <ul className="homeLinks">
        <li key="javascript">
          <Link to="javascript">JavaScript</Link>
        </li>
        <li key="html">
          <Link to="">HTML</Link>
        </li>
        <li key="css">
          <Link to="">CSS</Link>
        </li>
        <li key="redux">
          <Link to="redux">Redux</Link>
        </li>
      </ul>
    </nav>
  );
};
