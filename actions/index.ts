import { SET_REPOS, SET_USERNAME, SET_LOADING, SET_ERROR, CLEAR_REPOS } from './types';

export const setRepos = (repositories: any[]) => {
    return {
        type: SET_REPOS,
        repositories
    }
}

export const setUsername = (username: string) => {
    return {
        type: SET_USERNAME,
        username
    }
}

export const setLoading = (isLoading: boolean) => {
    return {
        type: SET_LOADING,
        isLoading
    }
}

export const setError = (error: string) => {
    return {
        type: SET_ERROR,
        error
    }
}

export const clearRepos = () => {
    return {
        type: CLEAR_REPOS
    }
}
