import RoundBox from "../styleComponents/RoundBox";
import MUSIC from './../assets/music/01.mp3'
import { useState } from "react";
import COVER from './../assets/music-cover/LetsSee.jpg';
import SongCard from "./SongCard";
import { useSelector } from "react-redux";

const Songs = (props) => {

    const tracks = useSelector(state => state.songs);
    const isLoading = useSelector(state => state.isLoading);

    return (
        <div className="songs-div">
            <h1>Songs</h1>
            <div className="play_list">
                {!isLoading
                    ? tracks.length > 0 ? tracks.map((item, index) => (
                        <SongCard key={index} song={item} index={index} 
                            setIsPlaying={props.setIsPlaying}
                        />
                    ))
                        :
                        "No Songs"
                    : "Loading..."

                }

            </div>
        </div>
    );
}

export default Songs;