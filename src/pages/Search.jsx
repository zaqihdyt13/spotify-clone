import { CiClock2 } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Footer from "../components/Footer";
import Layout from "../components/layout/Layout";
import HeaderSearch from "../components/search/HeaderSearch";
import CategorySection from "../components/search/CategorySection";
import Player from "../components/player/Player";

const Search = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [categories, setCategories] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongId, setCurrentSongId] = useState("");
  const [currentTrackUrl, setCurrentTrackUrl] = useState("");

  console.log(currentSongId);

  const handleInputChange = (e) => {
    e.preventDefault();
    const inputSearch = e.target.value;
    setSearchQuery(inputSearch);

    if (inputSearch.trim() === "") {
      setSearchResults("");
    } else {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    try {
      const accessToken = props.accessToken;
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      console.log("search results:", response.data);
      setSearchResults(response.data.tracks.items);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        const accessToken = props.accessToken;
        const response = await axios.get(
          "https://api.spotify.com/v1/browse/categories",
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        setCategories(response.data.categories.items);
      } catch (err) {
        console.error(err);
      }
    };

    getCategory();
  }, [props]);

  const handlePlaySong = (id, previewUrl) => {
    setCurrentSongId(id);
    setCurrentTrackUrl(previewUrl);
    setIsPlaying(true);
  };

  const handleStopSong = () => {
    setIsPlaying(false);
  };

  const convertDurationSong = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000)
    const seconds = Math.floor((durationMs % 60000) / 1000)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <Layout>
      <HeaderSearch
        handleInputChange={handleInputChange}
        accessToken={props.accessToken}
      />
      <section className="mt-20">
        {searchResults !== "" ? (
          <table className="search-table">
            <thead className="search-thead bg-neutral-800 text-sm">
              <tr>
                <th style={{ width: "50px" }} className="p-2 text-center text-zinc-400 font-medium">#</th>
                <th style={{ width: "450px" }} className="p-2 text-start text-zinc-400 font-medium">
                  Title
                </th>
                <th className="p-2 text-start text-zinc-400 font-medium">
                  Album
                </th>
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
                            {search.artists
                              .map((artist) => artist.name)
                              .join(", ")}
                          </h5>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-zinc-400 text-sm">{search.album.album_type}</td>
                    <td className="p-2 text-zinc-400 text-sm">{convertDurationSong(search.duration_ms)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <CategorySection
            categories={categories}
          />
        )}
      </section>
      <Footer />
      {currentTrackUrl ? (
        <div className="w-full h-20 fixed bottom-0 start-0 flex justify-center items-center pb-2">
          <Player currentTrackUrl={currentTrackUrl} isPlaying={isPlaying} handleStopSong={handleStopSong} />
        </div>
      ) : (
        <div className="w-full h-20 fixed bottom-0 start-0 text-zinc-400 text-2xl font-bold bg-neutral-900 flex justify-center items-center pb-2">
          SPOTIFYKW
        </div>
      )}
    </Layout>
  );
};

Search.propTypes = {
  accessToken: PropTypes.string,
};

export default Search;
