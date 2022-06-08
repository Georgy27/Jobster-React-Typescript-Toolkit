import { link } from "fs";
import { FaTimes } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleSidebar } from "../../store/Reducers/appSlice";
import Logo from "../Logo/Logo";
import NavLinks from "../NavLinks/NavLinks";
import Wrapper from "./SmallSidebar.styles";

const SmallSidebar = () => {
  const { isSidebarOpen } = useAppSelector((store) => store.toggle);
  const dispatch = useAppDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen
            ? "sidebar-container show-sidebar"
            : "sidebar-container "
        }
      >
        <div className="content">
          <button className="close-btn" onClick={() => toggle()}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggle} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
