export const SET_REPOS = 'SET_REPOS';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_REPOS = 'CLEAR_REPOS';

export interface Action {
    type: string;
    repositories?: any;
    username?: string;
    isLoading?: boolean;
    error?: string;
}

export type ActionTypes = 
  | typeof SET_REPOS
  | typeof SET_USERNAME
  | typeof SET_LOADING
  | typeof SET_ERROR
  | typeof CLEAR_REPOS;
