import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import Logo from "../components/Logo";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../feature/user/userSlice";
import NavLinks from "./NavLinks";

const SmallSideBar = () => {
  const { isSideBarOpen } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSideBar());
  };

  return (
    <Wrapper>
      <div
        className={
          isSideBarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={() => toggle()}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSideBar={toggle} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSideBar;
