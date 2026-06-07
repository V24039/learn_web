import { Link } from "react-router-dom";
import { Pages } from "./const";

export const PageNavigation = () => {
  return (
    <div className="navigation">
      {Pages.map(({ linkTo, pageName }) => (
        <Link key={`${linkTo}-${pageName}`} to={linkTo}>
          {pageName}
        </Link>
      ))}
    </div>
  );
};
