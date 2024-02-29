import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom";

const GoodSection = (props) => {
    const navigate = useNavigate()
    const { userPlaylists } = props

    return (
        <section className="mt-16 ps-6">
          <h1 className="text-3xl text-white font-bold mb-4">Good evening</h1>
          <ul className="list-good grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1">
            {userPlaylists.map((userPlaylist) => {
              return (
                <li
                  key={userPlaylist.id}
                  onClick={() => navigate(`/playlists/${userPlaylist.id}`)}
                  className="flex items-center gap-2 mb-1 bg-neutral-800 transition-all rounded-md cursor-pointer"
                >
                  <img
                    src={userPlaylist.images[0].url}
                    className="w-12 h-12 rounded-s-md"
                  />
                  <h3 className="text-white text-sm font-bold">
                    {userPlaylist.name}
                  </h3>
                </li>
              );
            })}
          </ul>
        </section>
    )
}

GoodSection.propTypes = {
    userPlaylists: PropTypes.array,
};

export default GoodSection