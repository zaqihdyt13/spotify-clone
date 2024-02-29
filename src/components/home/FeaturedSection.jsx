import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FeaturedSection = (props) => {
  const navigate = useNavigate();
  const { featuredPlaylists } = props

  return (
    <section className="mt-4 p-4">
      <h1 className="ps-1 text-white text-2xl font-bold mb-5">
        Featured Playlists
      </h1>
      <ul className="list-top grid grid-cols-4">
        {featuredPlaylists.map((featuredPlaylist) => (
          <li
            key={featuredPlaylist.id}
            onClick={() => navigate(`/playlists/${featuredPlaylist.id}`)}
            className="featured-card bg-neutral-800 rounded-lg mb-3 cursor-pointer"
          >
            <img
              src={featuredPlaylist.images[0].url}
              alt="Alan Walker"
              className="w-full rounded-lg"
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

FeaturedSection.propTypes = {
  featuredPlaylists: PropTypes.array,
};

export default FeaturedSection;
