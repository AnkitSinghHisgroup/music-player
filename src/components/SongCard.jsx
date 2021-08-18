import RoundBox from "../styleComponents/RoundBox";
import MUSIC from './../assets/music/01.mp3'
import { useState } from "react";
import COVER from './../assets/music-cover/LetsSee.jpg';
import { useDispatch, useSelector } from "react-redux";
import { ADD_ITEM } from "../redux/constants";
import { addSearchSong, addSong } from "../redux/actions";

const SongCard = (props) => {


    let song = props.song;
    const dispatch = useDispatch();
    const trackIndex = useSelector(state => state.selectedSong);

    const handlePlay = () => {
        if(props.search){
            dispatch(addSearchSong(song));
            props.setTab(0);
        }else{
            dispatch(addSong(props.index))
        }

    }

    return (
        <article className="play_list_item px-4 py-3 mb-3" onClick={handlePlay}>
            <div className="play-image">
                <img src={song.thumbnail} alt="" />
            </div>
            <div className="flex_space px-4">
                <div className="">
                    <h2 className="music-title">
                        {song.title}
                    </h2>
                    <div className="font-14 font-fade">
                        <div>
                            <span className="font-14" title={`${'00:30'} minutes`}>{'00:30'}m</span>
                        </div>
                        <div className="font-14">
                            <span className="font-fade">By</span>{' '}
                            <span className="text-black">{song.artist}</span>
                        </div>
                    </div>
                </div>
                {
                   trackIndex.toString() && trackIndex == props.index &&
                    <div class="like_play">
                        <svg id="equalizer" width="40px" height="28px" viewBox="0 0 10 7" version="1.1" >
                            <g fill="#000000">
                                <rect id="bar1" transform="translate(0.500000, 6.000000) rotate(180.000000) translate(-0.500000, -6.000000) " x="0" y="5" width="1" height="2px"></rect>
                                <rect id="bar2" transform="translate(3.500000, 4.500000) rotate(180.000000) translate(-3.500000, -4.500000) " x="3" y="2" width="1" height="5"></rect>
                                <rect id="bar3" transform="translate(6.500000, 3.500000) rotate(180.000000) translate(-6.500000, -3.500000) " x="6" y="0" width="1" height="7"></rect>
                                <rect id="bar4" transform="translate(9.500000, 5.000000) rotate(180.000000) translate(-9.500000, -5.000000) " x="9" y="3" width="1" height="4"></rect>
                            </g>
                        </svg>
                    </div>
                }
            </div>

        </article>
    );
}

export default SongCard;