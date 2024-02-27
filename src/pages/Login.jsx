import PropTypes from "prop-types";

const Login = (props) => {
  return (
    <div className="bg-neutral-800 w-full h-screen flex justify-center items-center">
      <button
        onClick={props.handleAuthRedirect}
        className="bg-green-500 hover:bg-green-400 py-2 px-5 rounded-md text-white font-bold text-xl"
      >
        Login with Spotify
      </button>
    </div>
  );
};

Login.propTypes = {
  handleAuthRedirect: PropTypes.func,
};

export default Login;
