import { ADD_ITEM,ADD_SEARCH_SONG, ADD_SONGS, GET_ERROR, LOADER_OFF, LOADER_ON, SEARCH_SONGS, TEST_PASS } from './constants';

const intial = {
    songs: [],
    selectedSong: "",
    searchSongs: "",
    isLoading: true,
    error: ""
}

const reducer = (state = intial, action: { type: string, data: (object | object[]) }) => {
    switch (action.type) {
        case ADD_SONGS:
            return {
                ...state,
                songs: action.data,
                isLoading: false
            }
        case SEARCH_SONGS:
            return {
                ...state,
                searchSongs: action.data,
                isLoading: false
            }
        case ADD_SEARCH_SONG:
            return {
                ...state,
                songs: [action.data,...state.songs],
                selectedSong:0,
                isLoading: false
            }
        case ADD_ITEM:
            return {
                ...state,
                selectedSong: action.data,
                isLoading: false
            }
        case GET_ERROR:
            return {
                ...state,
                error: action.data,
                isLoading: false
            }
        case LOADER_ON:

            return {
                ...state,
                isLoading: true
            }
        case LOADER_OFF:

            return {
                ...state,
                isLoading: false
            }
        default: return state
    }
}

export type RootState = ReturnType<typeof reducer>
export default reducer;
