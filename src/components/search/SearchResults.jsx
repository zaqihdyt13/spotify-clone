import PropTypes from "prop-types";
import { CiClock2 } from "react-icons/ci";

const SearchResults = (props) => {
  const {
    searchResults,
    handlePlaySong,
    handleStopSong,
    convertDurationSong,
    isPlaying,
  } = props;

  return (
    <table className="search-table">
      <thead className="search-thead bg-neutral-800 text-sm">
        <tr>
          <th
            style={{ width: "50px" }}
            className="p-2 text-center text-zinc-400 font-medium"
          >
            #
          </th>
          <th
            style={{ width: "450px" }}
            className="p-2 text-start text-zinc-400 font-medium"
          >
            Title
          </th>
          <th className="p-2 text-start text-zinc-400 font-medium">Album</th>
          <th className="p-2 text-start text-zinc-400 font-medium">
            <CiClock2 />
          </th>
        </tr>
      </thead>
      <tbody>
        {searchResults.length > 0 &&
          searchResults.map((search, index) => (
            <tr
              key={search.id}
              onClick={() =>
                isPlaying
                  ? handleStopSong()
                  : handlePlaySong(search.id, search.preview_url)
              }
              className="p-2 hover:bg-neutral-800 transition duration-300 cursor-pointer"
            >
              <td className="p-2 text-white text-center">{index + 1}</td>
              <td className="p-2">
                <div className="flex items-center">
                  <img
                    src={search.album.images[0].url}
                    alt="Album Cover"
                    className="w-12 h-12 rounded-sm mr-4"
                  />
                  <div>
                    <h3 className="text-white text-md font-bold mt-1">
                      {search.name}
                    </h3>
                    <h5 className="text-zinc-400 text-sm font-semibold">
                      {search.artists.map((artist) => artist.name).join(", ")}
                    </h5>
                  </div>
                </div>
              </td>
              <td className="p-2 text-zinc-400 text-sm">
                {search.album.album_type}
              </td>
              <td className="p-2 text-zinc-400 text-sm">
                {convertDurationSong(search.duration_ms)}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

SearchResults.propTypes = {
  searchResults: PropTypes.array,
  handlePlaySong: PropTypes.func,
  handleStopSong: PropTypes.func,
  convertDurationSong: PropTypes.func,
  isPlaying: PropTypes.bool,
};

export default SearchResults;
