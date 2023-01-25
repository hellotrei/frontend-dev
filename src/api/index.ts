import axios from 'axios';
import { Repository } from '../interfaces/repository';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export async function getRepositories(username: string): Promise<Repository[]> {
  const response = await api.get(`/users/${username}/repos`);
  return response.data as Repository[];
}
