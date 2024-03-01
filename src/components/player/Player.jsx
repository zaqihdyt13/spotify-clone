import ReactPlayer from "react-player";
import PropTypes from "prop-types";

const Player = (props) => {
  const { currentTrackUrl, isPlaying, handleStopSong, track } = props;
  return (
    <div className="w-full flex justify-between items-center px-4">
      <div
        style={{ width: "30%" }}
        className="flex justify-start items-center gap-2"
      >
        <img src={track.album?.images[0].url} className="w-10 h-10 rounded-sm" />
        <div>
          <h3 className="text-white text-md font-bold mt-1">
            {track.name?.length > 25
              ? track.name.substring(0, 25) + "..."
              : track.name}
          </h3>
          <h5 className="text-zinc-400 text-sm">
            {track.artists?.map((artist) => artist.name).join(", ")}
          </h5>
        </div>
      </div>
      <ReactPlayer
        url={currentTrackUrl}
        playing={isPlaying}
        controls={true}
        onEnded={handleStopSong}
        width="40%"
        height="42px"
      />
      <div style={{ width: "30%" }} className="flex justify-end">
        <h1 className="text-white">tes</h1>
      </div>
    </div>
  );
};

Player.propTypes = {
  currentTrackUrl: PropTypes.string,
  isPlaying: PropTypes.bool,
  handleStopSong: PropTypes.func,
  track: PropTypes.string,
};

export default Player;
