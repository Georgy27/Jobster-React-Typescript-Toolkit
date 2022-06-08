import Wrapper from "./BigSidebar.styles";
import { useAppSelector } from "../../hooks/redux";
import Logo from "../Logo/Logo";
import NavLinks from "../NavLinks/NavLinks";

const BigSideBar = () => {
  const { isSidebarOpen } = useAppSelector((store) => store.toggle);

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen
            ? "sidebar-container "
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSideBar;
