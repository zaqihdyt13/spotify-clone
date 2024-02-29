import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import PropTypes from "prop-types";
import Layout from "../components/layout/Layout";
import Header from "../components/Header";
import GoodSection from "../components/home/GoodSection";
import FeaturedSection from "../components/home/FeaturedSection";

const Home = (props) => {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);

  useEffect(() => {
    const getUserPlaylist = async () => {
      try {
        const accessToken = props.accessToken;
        const response = await axios.get(
          "https://api.spotify.com/v1/users/31ew37aj3ktp5n4tqe3hem3erl7i/playlists",
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        setUserPlaylists(response.data.items);
      } catch (err) {
        console.error(err);
      }
    };

    getUserPlaylist();
  }, [props]);

  useEffect(() => {
    const getFeaturedPlaylist = async () => {
      try {
        const accessToken = props.accessToken;
        const response = await axios.get(
          "https://api.spotify.com/v1/browse/featured-playlists",
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        setFeaturedPlaylists(response.data.playlists.items);

      } catch (err) {
        console.error(err);
      }
    };

    getFeaturedPlaylist();
  }, [props]);

  return (
    <Layout>
        <Header accessToken={props.accessToken} />
        <GoodSection userPlaylists={userPlaylists} />
        <FeaturedSection featuredPlaylists={featuredPlaylists} />
        <Footer />
        <div className="w-full h-20 fixed bottom-0 start-0 text-zinc-400 text-2xl font-bold bg-neutral-900 flex justify-center items-center pb-2">
          SPOTIFY CLONE
        </div>
    </Layout>
  );
};

Home.propTypes = {
  accessToken: PropTypes.string,
};

export default Home;
