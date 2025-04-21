import { Link } from "react-router-dom";

export const PageNavigation = () => {
  return (
    <div className="navigation">
      <Link to="javascript">JavaScript</Link>
      <Link to="">HTML</Link>
      <Link to="">CSS</Link>
      <Link to="redux">Redux</Link>
    </div>
  );
};
