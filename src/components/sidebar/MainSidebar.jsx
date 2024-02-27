import MainSidebarHeader from "./mainsidebar/MainSidebarHeader";
import PlaylistList from "./mainsidebar/PlaylistList";
import PropTypes from "prop-types";

const MainSidebar = (props) => {
  const accessToken = props.accessToken
  return (
    <div className="main-sidebar bg-neutral-900 w-full pt-4 pb-0 rounded-lg mt-2 overflow-hidden">
      <MainSidebarHeader />
      <PlaylistList accessToken={accessToken} />
    </div>
  );
};

MainSidebar.propTypes = {
  accessToken: PropTypes.string,
};

export default MainSidebar;
