import { Link, useLocation } from "react-router-dom";
import { JSPaths } from "./const";
import { useEffect, useState } from "react";

const SideNavigation = () => {
  const { pathname } = useLocation();
  const [linksToDisplay, setLinks] = useState([]);

  useEffect(() => {
    const currentPath = pathname?.split("/")[1];
    if (currentPath === "javascript") {
      setLinks(() => [...JSPaths]);
    }
  }, []);

  return (
    <div className="p-2 pr-6 h-auto bg-gray-500">
      <ul>
        {linksToDisplay?.map((link, index) => (
          <li className="mt-4" key={`${link}-${index}`}>
            <Link
              style={{ color: "WindowText" }}
              className="text-neutral-700"
              to={link?.path}
            >
              {link?.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavigation;
