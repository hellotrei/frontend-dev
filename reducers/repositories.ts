import { SET_REPOS, SET_USERNAME, SET_LOADING, SET_ERROR, Action } from '../actions/types';

export interface AppState {
    repositories: any[],
    username: string,
    isLoading: boolean,
    error: string
}

const initialState: AppState = {
    repositories: [],
    username: '',
    isLoading: false,
    error: ''
}

export default function repositories(state = initialState, action: Action) {
    switch (action.type) {
        case SET_REPOS:
            return { ...state, repositories: action.repositories };
        case SET_USERNAME:
            return { ...state, username: action.username };
        case SET_LOADING:
            return { ...state, isLoading: action.isLoading };
        case SET_ERROR:
            return { ...state, error: action.error };
        default:
            return state;
    }
}
