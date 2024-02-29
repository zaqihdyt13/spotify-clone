import { CiClock2 } from "react-icons/ci";
import PropTypes from "prop-types";

const TracklistTable = (props) => {
  const {
    playlistDetails,
    handlePlaySong,
    handleStopSong,
    convertDurationSong,
    isPlaying,
  } = props;
  
  return (
    <div className="mt-8">
      <table className="list-playlistTracks">
        <thead className="text-sm border-b-2">
          <tr>
            <th
              style={{ width: "50px" }}
              className="p-2 text-center text-zinc-400 font-medium"
            >
              #
            </th>
            <th
              style={{ width: "310px" }}
              className="p-2 text-start text-zinc-400 font-medium"
            >
              Title
            </th>
            <th
              style={{ width: "230px" }}
              className="p-2 text-start text-zinc-400 font-medium"
            >
              Album
            </th>
            <th
              style={{ width: "150px" }}
              className="p-2 text-start text-zinc-400 font-medium"
            >
              Date Added
            </th>
            <th className="p-2 text-start text-zinc-400 font-medium">
              <CiClock2 />
            </th>
          </tr>
        </thead>
        <tbody>
          {playlistDetails.tracks.items.map((item, index) => (
            <tr
              key={item.track.id}
              onClick={() =>
                isPlaying
                  ? handleStopSong()
                  : handlePlaySong(item.track.id, item.track.preview_url)
              }
              className="p-2 hover:bg-neutral-800 transition duration-300 cursor-pointer"
            >
              <td className="p-2 text-white text-center">{index + 1}</td>
              <td>
                <div className="flex items-center gap-3">
                  <img
                    src={item.track.album.images[0].url}
                    className="w-10 h-10 rounded-sm"
                  />
                  <div>
                    <h3 className="text-white text-md font-bold mt-1">
                      {item.track.name.length > 25
                        ? item.track.name.substring(0, 25) + "..."
                        : item.track.name}
                    </h3>
                    <h5 className="text-zinc-400 text-sm">
                      {item.track.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    </h5>
                  </div>
                </div>
              </td>
              <td className="p-2 text-zinc-400 text-sm">
                {item.track.album.name.length > 28
                  ? item.track.album.name.substring(0, 28) + "..."
                  : item.track.album.name}
              </td>
              <td className="p-2 text-zinc-400 text-sm">
                {item.added_at.substring(0, 10)}
              </td>
              <td className="p-2 text-zinc-400 text-sm">
                {/* {item.track.duration_ms} */}
                {convertDurationSong(item.track.duration_ms)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TracklistTable.propTypes = {
  playlistDetails: PropTypes.array,
  handlePlaySong: PropTypes.func,
  handleStopSong: PropTypes.func,
  convertDurationSong: PropTypes.func,
  isPlaying: PropTypes.bool,
};

export default TracklistTable;
