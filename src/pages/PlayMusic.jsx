import RoundBox from "../styleComponents/RoundBox";
import MUSIC from './../assets/music/01.mp3'
import { useEffect, useState } from "react";
import COVER from './../assets/music-cover/LetsSee.jpg';
import SONGS from './../assets/svg/music_icon.svg';
import PLAYLIST from './../assets/svg/playlist_2.svg';
import LIKELIST from './../assets/svg/music_icon.svg';
import MusicPlayer from "../components/MusicPlayer";
import Songs from "../components/Songs";
import LikedSongs from "../components/LikedSongs";
import SearchSong from "../components/SearchSong";
import useAuth from "../custom_hooks/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import musicServices from "../_services/music.services";
import { useDispatch } from 'react-redux';
import { addSongs } from "../redux/actions";
import { FETCH_SONGS } from "../redux/constants";

const spotifyApi = new SpotifyWebApi({
    clientId: "eb7254031d9241b7b7ccbcc1197d01c5"
})



const PlayMusic = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [tab, setTab] = useState(0);
    const accessToken = useAuth(props.code);
    const dispatch = useDispatch();

    const renderTab = () => {
        switch (tab) {
            case 1: return <SearchSong
                accessToken={accessToken}
                spotifyApi={spotifyApi}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                setTab={setTab}
            />
            
            case 0: return <Songs
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
            />
            default: return <Songs
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
            />
        }
    }
    // const fetchMusic= async ()=>{
    //     let music = await musicServices.searchTracks(spotifyApi,'karan aujhla');
    //     dispatch(addSongs(music));
    // }

    useEffect(() => {

        if (accessToken) {
            spotifyApi.setAccessToken(accessToken);
            dispatch({
                type: FETCH_SONGS, data: {
                    spotifyApi,
                    search: 'karan aujhla'
                }
            })
            // console.log(fetchMusic())
        }


    }, [accessToken])

    return (
        <div className="container-fluid">
            <div className="row justify-content-center"    >
                <div className="col-md-4">
                    <MusicPlayer
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                    />
                </div>
                <div className="col-md-5">

                    <div className="my-4">
                        <div className="text-center">
                            <span className="switcher">
                                <button onClick={() => setTab(0)} className={tab === 0 && "active"}>
                                    <span >
                                        <img src={SONGS} />
                                        <span className="ml-2" >Songs</span>
                                    </span>
                                </button>
                                <button onClick={() => setTab(1)} className={tab === 1 && "active"} >
                                    <img src={PLAYLIST} />
                                    <span className="ml-2" >Search</span>
                                </button>
                                {/* <button onClick={() => setTab(2)} className={tab === 2 && "active"}>
                                    <img src={LIKELIST} />
                                    <span className="ml-2">Liked Songs</span>
                                </button> */}
                            </span>
                        </div>

                        {renderTab()}
                    </div>
                </div>
            </div>
        </div>);
}

export default PlayMusic;