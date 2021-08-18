import { useEffect, useState } from "react";
import Player from "./Player";
import SongCard from "./SongCard";
import SEARCH from './../assets/music-cover/music-search.png'

const SearchSong = (props) => {


    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();

    const chooseTrack = (track)=>{
        setPlayingTrack(track)
    }

    useEffect(() => {
        if (!search) return setSearchResults([]);
        let cancel = false;
        props.spotifyApi.searchTracks(search).then(res => { 
            console.log(res.body.tracks.items)
            if (cancel) return
            setSearchResults(res.body.tracks.items.map((track) => {

                const smallest = track.album.images.reduce((smallSize, image) => {
                    if (image.height < smallSize.height) return image;
                    return smallSize
                }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albums: track.album.images,
                    thumbnail: smallest.url,
                    preview_url:track.preview_url
                }
            }))
        })
        return () => cancel = true;
    }, [search])
    console.log(searchResults);

    return (
        <div className="py-4">
            <input type="search"
                className="form-control mb-4"
                placeholder="Search Songs/Artists"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {!searchResults.length > 0 ? 
            <div className="p-5 text-center">
                <img src={SEARCH} />
                <h6 className="text-center py-5" style={{color:"#222"}}>
                    Hey, you need to type for searching your music
                </h6>
            </div>
            :
            <div className="play_list">
                {searchResults?.map((item, index) => (
                    <SongCard key={index} song={item} setTab={props.setTab} search={true} />
                ))}

            </div>}
            <Player accessToken={props.accessToken} trackUri={playingTrack?.preview_url}  />
        </div>
        
    );
}

export default SearchSong;