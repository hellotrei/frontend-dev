export interface Repository {
    id: number;
    name: string;
    html_url: string;
    description?: string;
    language?: string;
    stargazers_count?: number;
    forks_count?: number;
  }

export interface Repo {
    id: number,
    name: string,
    html_url: string
  }
  
export interface Props {
    repos: Repo[]
  }
  