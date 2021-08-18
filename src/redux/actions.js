import {ADD_ITEM,ADD_SEARCH_SONG, ADD_SONGS, LOADER_OFF, LOADER_ON} from './constants';

export const addSong = (data)=>{
    return {
        type: ADD_ITEM,
        data
    }
}

export const addSongs = (data)=>{
    return {
        type: ADD_SONGS,
        data
    }
}
export const addSearchSong = (data)=>{
    return {
        type: ADD_SEARCH_SONG,
        data
    }
}


export const loaderOn = ()=>{
    return {
        type: LOADER_ON,
       
    }
}

export const loaderOff = ()=>{
    return {
        type: LOADER_OFF,
       
    }
}

