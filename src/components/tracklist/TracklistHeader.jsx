import { TbPointFilled } from "react-icons/tb";
import pp from "../../assets/images/pp.webp";
import PropTypes from "prop-types";

const TracklistHeader = (props) => {
  const playlistDetails = props.playlistDetails;
  return (
    <section className="mt-14 ps-6 py-4 h-52 flex items-end gap-6">
      <img
        src={playlistDetails.images[0].url}
        className="w-32 h-32 object-cover rounded-md mt-auto"
      />
      <div>
        <h5 className="text-white capitalize text-sm">
          {playlistDetails.type}
        </h5>
        <h1 className="text-white text-6xl font-bold">
          {playlistDetails.name}
        </h1>
        <h5 className="text-zinc-400 text-sm mt-4 mb-2">
          {playlistDetails.description}
        </h5>
        <div className="text-white flex items-center gap-1">
          <div className="flex items-center gap-1">
            <img src={pp} alt="You" className="w-6 h-6 rounded-full" />
            <h5 className="text-sm font-bold">
              {playlistDetails.owner.display_name}
            </h5>
          </div>
          <span>
            <TbPointFilled className="text-xs mt-1" />
          </span>
          <h5 className="text-sm">{playlistDetails.tracks.total} Songs</h5>
        </div>
      </div>
    </section>
  );
};

TracklistHeader.propTypes = {
  playlistDetails: PropTypes.array,
};

export default TracklistHeader;
