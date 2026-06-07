import { Link, useLocation } from "react-router-dom";
import { JSPath, JSPaths } from "./const";
import { useEffect, useState } from "react";

const SideNavigation = () => {
  const { pathname } = useLocation();
  const [linksToDisplay, setLinks] = useState<JSPath[]>([]);

  useEffect(() => {
    const currentPath = pathname?.split("/")[1];
    if (currentPath === "javascript") {
      setLinks(() => [...JSPaths]);
    } else {
      setLinks(() => []);
    }
  }, [pathname]);

  if (linksToDisplay.length === 0) return null;

  return (
    <div className="sticky top-0 p-2 pr-6 bg-gray-500">
      <ul className="fixed ">
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
