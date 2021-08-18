import { call, put, takeEvery ,all} from "@redux-saga/core/effects";
import { ADD_ITEM, ADD_SONGS,  FETCH_SONGS, GET_ERROR, LOADER_ON,  SEARCH_SONGS } from "../redux/constants";
import musicServices from "../_services/music.services";

function* fetchSongs(action) {
    try { 
        console.log("Actions",action)
        yield put({ type: LOADER_ON });
        const data = yield call(musicServices.searchTracks, action.data.spotifyApi , action.data.search);
        if (data.error) {
            yield put({ type: GET_ERROR, data: data.error })
        } else {
            yield put({ type: ADD_SONGS, data:data })
        }
    } catch (e) {
        yield put({ type: GET_ERROR, data: e.message })
        console.log(e)
    }
}

function* searchRecipes(action) {
    // try { 
    //     yield put({ type: LOADER_ON });
    //     const data = yield call(musicServices.searchDishes,action.data);
    //     if (data.error) {
    //         yield put({ type: GET_ERROR, data: data.error })
    //     } else {
    //         yield put({ type: ADD_ITEM, data:data.results })
    //     }
    // } catch (e) {
    //     yield put({ type: GET_ERROR, data: e.message })
    //     console.log(e)
    // }
    console.log("Sfd")
}

export function* listenFetchSongs() {
    yield takeEvery(FETCH_SONGS, fetchSongs);
}
export function* listenSearchRecipes() {
    yield takeEvery(SEARCH_SONGS, searchRecipes);
}

export default function* rootSaga() {
    yield all([
        listenFetchSongs(),
        listenSearchRecipes()
    ])
  }