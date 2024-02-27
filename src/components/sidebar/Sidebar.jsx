import HeaderSidebar from "./HeaderSidebar";
import MainSidebar from "./MainSidebar";
import PropTypes from "prop-types"

const Sidebar = (props) => {
const accessToken = props.accessToken
  return (
    <div className="w-full max-w-sm bg-black">
      <HeaderSidebar />
      <MainSidebar accessToken={accessToken} />
    </div>
  );
};

Sidebar.propTypes = {
  accessToken: PropTypes.string
}

export default Sidebar;
