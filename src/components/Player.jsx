import { useEffect, useRef, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback'

const Player = ({ trackUri }) => {
    const audioEl = useRef(null);

    const [isPlay, setIsPlay] = useState(false);
    useEffect(() => {
        setIsPlay(true)
    }, [trackUri])
    return (
        <div>
            {
                isPlay && trackUri
                &&
                    <audio src={trackUri} controls ref={audioEl}></audio>
            }
        </div>
    );
}

export default Player;