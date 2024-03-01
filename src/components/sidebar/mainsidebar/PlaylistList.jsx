import { FiSearch } from "react-icons/fi";
import { RiListCheck } from "react-icons/ri";
import { TbPointFilled } from "react-icons/tb";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const PlaylistList = (props) => {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const navigate = useNavigate("");

  useEffect(() => {
    const getUserPlaylist = async () => {
      try {
        const accessToken = props.accessToken;
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/v1/users/31ew37aj3ktp5n4tqe3hem3erl7i/playlists`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data);
        setUserPlaylists(response.data.items);
      } catch (err) {
        console.error(err);
      }
    };

    getUserPlaylist();
  }, [props]);

  return (
    <div className="w-full h-96 mt-3 overflow-hidden hover:overflow-y-auto transition-all scroll-smooth">
      <div className="header-list flex items-center justify-between object-right ps-3 pe-1">
        <button className="text-zinc-400 hover:text-white hover:bg-neutral-900 rounded-full p-2 transition-all">
          <FiSearch className="text-xl" />
        </button>
        <button className="text-zinc-400 hover:text-white hover:scale-105 transition-all flex items-center gap-1">
          <h5 className="text-sm font-semibold">Recents</h5>
          <span>
            <RiListCheck className="text-lg" />
          </span>
        </button>
      </div>
      <ul className="w-full h-full ps-2 mt-2 p-0">
        {userPlaylists.map((userPlaylist) => {
          return (
            <li
              key={userPlaylist.id}
              onClick={() => navigate(`/playlists/${userPlaylist.id}`)}
              className="list-playlist flex items-center gap-2 mb-1 hover:bg-neutral-800 transition-all rounded-md p-2 cursor-pointer"
            >
              <img
                src={userPlaylist.images[0].url}
                className="w-12 h-12 rounded-md"
              />
              <div>
                <h3 className="text-white font-semibold">
                  {userPlaylist.name}
                </h3>
                <div className="text-zinc-400 flex items-center gap-1">
                  <h4 className="text-sm">{userPlaylist.type}</h4>
                  <span>
                    <TbPointFilled className="text-xs" />
                  </span>
                  <h4 className="text-sm">{userPlaylist.owner.display_name}</h4>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

PlaylistList.propTypes = {
  accessToken: PropTypes.string,
};

export default PlaylistList;
