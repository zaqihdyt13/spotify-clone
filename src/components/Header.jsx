import { GoBell } from "react-icons/go";
import { PiArrowCircleDown } from "react-icons/pi";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const Header = (props) => {
  const navigate = useNavigate();
  const [userDatas, setUserDatas] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const accessToken = props.accessToken;
        const response = await axios.get(
          "https://api.spotify.com/v1/users/31ew37aj3ktp5n4tqe3hem3erl7i",
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        setUserDatas(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [props]);

  if (!userDatas) {
    return <div>Loading...</div>
  }

  const previousPage = () => {
    navigate(-1);
  };

  const nextPage = () => {
    navigate(1);
  };

  return (
    <header className="header h-8 mt-2 bg-neutral-900 flex justify-between items-center rounded-s-lg fixed top-0 z-50 ps-6 pe-2 pt-8 pb-10">
      <div className="flex items-center gap-2">
        <button
          onClick={previousPage}
          className="text-white p-2 bg-black rounded-full text-md"
        >
          <SlArrowLeft />
        </button>
        <button
          onClick={nextPage}
          className="text-white p-2 bg-black rounded-full text-md"
        >
          <SlArrowRight />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button className="text-black bg-white py-2 px-4 rounded-full text-sm font-bold hover:scale-105 transition-all">
          Explore Premium
        </button>
        <button className="bg-black text-white py-2 px-4 rounded-full flex items-center justify-center gap-1 hover:scale-105 transition-all">
          <span>
            <PiArrowCircleDown className="text-xl text-white" />
          </span>
          <h3 className="font-bold text-sm">Install App</h3>
        </button>
        <button className="flex justify-center items-center bg-black text-white rounded-full p-2 hover:scale-110 transition-all">
          <span className="text-md">
            <GoBell />
          </span>
        </button>
        <button className="bg-black p-1 rounded-full hover:scale-105 transition-all">
          <img
            src={userDatas?.images[1].url}
            className="w-6 h-6 rounded-full"
          />
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  accessToken: PropTypes.string,
};

export default Header;
