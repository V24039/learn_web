import { Link } from "react-router-dom";
import { Pages } from "./const";

export const HomeNavigation = () => {
  return (
    <nav>
      <ul className="homeLinks">
        {Pages.map(({ linkTo, pageName }) => (
          <li key={linkTo}>
            <Link to={linkTo}>{pageName}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
