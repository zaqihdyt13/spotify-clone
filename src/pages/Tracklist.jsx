import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Layout from "../components/layout/Layout";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { RiListCheck } from "react-icons/ri";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Player from "../components/player/Player";
import TracklistTable from "../components/tracklist/TracklistTable";
import TracklistHeader from "../components/tracklist/TracklistHeader";

const Tracklist = (props) => {
  const { id } = useParams();
  const [playlistDetails, setPlaylistDetails] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongId, setCurrentSongId] = useState("");
  const [currentTrackUrl, setCurrentTrackUrl] = useState("");

  console.log("currentsong", currentSongId);

  useEffect(() => {
    const getPlaylistDetail = async () => {
      try {
        const accessToken = props.accessToken;
        const response = await axios.get(
          `
          https://api.spotify.com/v1/playlists/${id}`,
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        console.log(response.data);
        setPlaylistDetails(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getPlaylistDetail();
  }, [id, props]);

  if (!playlistDetails) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  const handlePlayStopButton = () => {
    if (isPlaying == true) {
      return setIsPlaying(false);
    } else {
      return setIsPlaying(true);
    }
  };

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
    // or
    // const seconds = ((durationMs % 60000) / 1000).toFixed(0)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Layout>
      <Header accessToken={props.accessToken} />
      <TracklistHeader playlistDetails={playlistDetails} />
      <section className="ps-6">
        <div className="player-list flex items-center justify-between py-4 bg-neutral-800 px-6 rounded-md">
          <div className=" flex items-center gap-6">
            <button
              onClick={handlePlayStopButton}
              className="text-black p-5 hover:scale-105 hover:bg-green-400 bg-green-500 rounded-full box-border"
            >
              {isPlaying ? (
                <span className="text-lg">
                  <FaPause />
                </span>
              ) : (
                <span className="text-lg">
                  <FaPlay />
                </span>
              )}
            </button>
            <button className="text-zinc-400 hover:text-white text-4xl">
              <IoIosMore />
            </button>
          </div>
          <button className="text-zinc-400 hover:text-white flex items-center gap-1">
            <h5 className="text-sm font-semibold">List</h5>
            <span>
              <RiListCheck className="text-lg" />
            </span>
          </button>
        </div>
        <TracklistTable
          playlistDetails={playlistDetails}
          handlePlaySong={handlePlaySong}
          handleStopSong={handleStopSong}
          convertDurationSong={convertDurationSong}
          isPlaying={isPlaying}
        />
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

Tracklist.propTypes = {
  accessToken: PropTypes.string,
};

export default Tracklist;
