import RoundBox from "../styleComponents/RoundBox";
import MUSIC from './../assets/music/01.mp3'
import { useEffect, useRef, useState } from "react";
import COVER from './../assets/music-cover/LetsSee.jpg';
import FORWARD from './../assets/svg/forward10.svg';
import PREVIOUS10 from './../assets/svg/prev10.svg';
import LOOP from './../assets/svg/loop.svg';
import ACTIVE_LOOP from './../assets/svg/active_loop.svg';
import PREVIOUS from './../assets/svg/previous.svg';
import SHUFFLE from './../assets/svg/shuffle.svg';
import ACTIVE_SHUFFLE from './../assets/svg/active_shuffle.svg';
import { useDispatch, useSelector } from "react-redux";
import { addSong } from "../redux/actions";

const MusicPlayer = (props) => {
    const isPlaying = props.isPlaying;
    const setIsPlaying = props.setIsPlaying;
    const [shuffle, setShuffle] = useState(false);
    const [loop, setLoop] = useState(false);

    const audioEl = useRef(null);
    const trackIndex = useSelector(state => state.selectedSong);
    const songs = useSelector(state => state.songs)
    const dispatch = useDispatch();

    const changePrevTrack = () => {
        dispatch(addSong(
            shuffle ?
                Math.floor(Math.random() * 20)
                :
                trackIndex == 0 ? 0 : trackIndex - 1
        ))
    }

    const changeNextTrack = () => {
        dispatch(addSong(
            shuffle ?
                Math.floor(Math.random() * 20)
                :
                songs[trackIndex + 1] ? trackIndex + 1 : 0
        ))
    }


    useEffect(() => {
        if (isPlaying) {
            audioEl.current.play();
        } else {
            audioEl.current.pause();
        }
    }, [isPlaying]);

    useEffect(()=>{
        setIsPlaying(true)
        audioEl.current.play();
        console.log("plau")
        audioEl.current.removeEventListener('ended',()=>{console.log("End")})
        audioEl.current.addEventListener('ended',function() {
            setIsPlaying(false)
            audioEl.current.removeEventListener('ended',()=>{console.log("End")})
          });
          
    },[trackIndex])


    useEffect(() => {
        audioEl.current.loop = loop;
    }, [loop]);



    return (
        <div className="my-5 mx-2 box-add">
            <RoundBox p={5} className="bg-add" width={'auto'} height={'auto'} >
                {

                    <audio src={songs[trackIndex]?.preview_url} ref={audioEl}></audio>
                }
                <RoundBox className="cover_image">
                    <img src={songs[trackIndex]?.albums[0]?.url || "https://i.redd.it/483b57whdoz01.jpg"} />
                </RoundBox>
                <div className="my-3">
                    <h3 className="text-center">{songs[trackIndex]?.title}</h3>
                    <p className="text-center">{songs[trackIndex]?.artist}</p>
                </div>
                <div className="music_controls">
                    <button type="button" className="mx-auto" onClick={() => setShuffle(!shuffle)}>
                        <span>
                            <img src={shuffle ? ACTIVE_SHUFFLE: SHUFFLE} />
                        </span>
                    </button>
                    <button type="button" onClick={changePrevTrack}>
                        <span>
                            <img src={PREVIOUS} />
                        </span>
                    </button>
                    {/* <button type="button" className="mx-auto">
                        <span >
                            <img src={PREVIOUS10} />
                        </span>
                    </button> */}
                    <button type="button" className="mx-auto d-flex justify-content-center"
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        <div className={!isPlaying ? "play-button" : "play-button paused"}></div>
                    </button>
                    {/* <button type="button" className="mx-auto">
                        <span>
                            <img src={FORWARD} />
                        </span>
                    </button> */}
                    <button type="button" className="mx-auto"
                        onClick={changeNextTrack}
                    >
                        <span className="next-btn" >
                            <img src={PREVIOUS} />
                        </span>
                    </button>
                    <button type="button" onClick={()=>setLoop(!loop)}
                    className="mx-auto">
                        <span>
                            <img src={loop ? ACTIVE_LOOP : LOOP} />
                        </span>
                    </button>
                </div>
            </RoundBox>

        </div>
    );
}

export default MusicPlayer;