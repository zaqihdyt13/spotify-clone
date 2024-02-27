import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import pp from "../assets/images/pp.webp";
import Layout from "../components/layout/Layout";
import { TbPointFilled } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { RiListCheck } from "react-icons/ri";
import { CiClock2 } from "react-icons/ci";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Player from "../components/player/Player";

const PlaylistDetail = (props) => {
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
          SPOTIFYKW
        </div>
      )}
    </Layout>
  );
};

PlaylistDetail.propTypes = {
  accessToken: PropTypes.string,
};

export default PlaylistDetail;
