import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Footer from "../components/Footer";
import Layout from "../components/layout/Layout";
import HeaderSearch from "../components/search/HeaderSearch";
import CategorySection from "../components/search/CategorySection";
import Player from "../components/player/Player";
import SearchResults from "../components/search/SearchResults";

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
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Layout>
      <HeaderSearch
        handleInputChange={handleInputChange}
        accessToken={props.accessToken}
      />
      <section className="mt-20">
        {searchResults !== "" ? (
          <SearchResults
            searchResults={searchResults}
            handlePlaySong={handlePlaySong}
            handleStopSong={handleStopSong}
            convertDurationSong={convertDurationSong}
          />
        ) : (
          <CategorySection categories={categories} />
        )}
      </section>
      <Footer />
      {currentTrackUrl ? (
        <div className="w-full h-20 fixed bottom-0 start-0 flex justify-center items-center pb-2">
          <Player
            currentTrackUrl={currentTrackUrl}
            isPlaying={isPlaying}
            handleStopSong={handleStopSong}
          />
        </div>
      ) : (
        <div className="w-full h-20 fixed bottom-0 start-0 text-zinc-400 text-2xl font-bold bg-neutral-900 flex justify-center items-center pb-2">
          SPOTIFY CLONE
        </div>
      )}
    </Layout>
  );
};

Search.propTypes = {
  accessToken: PropTypes.string,
};

export default Search;
