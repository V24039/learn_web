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
      <div className="flex">
        <SideNavigation />
        <div className="grow mt-5">
          <Outlet/>
        </div>
      </div>
    </>
  );
}

export default App;
