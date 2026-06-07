import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { HomeNavigation, PageNavigation } from "./Navigation";
import SideNavigation from "./Navigation/SideNavigation";

function App() {
  const location = useLocation();

  if (location.pathname === "/") {
    return <HomeNavigation />;
  }

  return (
    <>
      <PageNavigation />
      <div className="flex h-full gap-2">
        <SideNavigation />
        {/* <div className="relative">
        </div> */}
        <div className="grow mt-5">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
