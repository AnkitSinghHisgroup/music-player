
const musicServices = {
    searchTracks,
}
async function searchTracks(spotifyApi,search) {
    try{

        const response = await spotifyApi.searchTracks(search);
        if(response){
            const data = response.body.tracks.items.map((track) => {
                
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
                    preview_url: track.preview_url
                }
            })
            return data
        } else{
            return {error:"Somthing went wrong!"};
        }       
    }catch(error){
        console.log(error);
    }
}

export default musicServices;