import { Outlet } from "react-router-dom";
import { BigSideBar, SmallSidebar, Navbar } from "../../../components";
import Wrapper from "./SharedLayout.styles";

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSideBar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
