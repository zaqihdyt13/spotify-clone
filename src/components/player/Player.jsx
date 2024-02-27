import ReactPlayer from "react-player";
import PropTypes from "prop-types"

const Player = (props) => {
    return (
        <ReactPlayer
            url={props.currentTrackUrl}
            playing={props.isPlaying}
            controls={true}
            onEnded={props.handleStopSong}
            width="60%"
            height="42px"
          />
    )
}

Player.propTypes = {
    currentTrackUrl: PropTypes.string,
    isPlaying: PropTypes.bool,
    handleStopSong: PropTypes.func
}

export default Player