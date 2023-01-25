import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setLoading, setRepos, setError } from '../actions';
import { getRepositories } from '../api';
import { AppState } from '../reducers/repositories';
import { Repository } from '@/interfaces/repository';

const Repositories = () => {
  const [username, setUsernameState] = useState('');
  const dispatch = useDispatch();
  const repositories = useSelector((state: AppState) => state.repositories.repositories);
  const error = useSelector((state: AppState) => state.error);

  if (error) {
    return <div>{error}</div>;
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(setUsername(username));
      dispatch(setLoading(true));
      const repos = await getRepositories(username);
      dispatch(setRepos(repos));
    } catch (error) {
      if(error instanceof Error){
        dispatch(setError(error.message));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a GitHub username"
          value={username}
          onChange={e => setUsernameState(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {/* Render the repositories or the error message */}
      {repositories.length > 0 && (
        <div>
          <h3>Repositories from {username}</h3>
          <ul>
            {repositories.map((repo: Repository) => (
              <li key={repo.id}>
                <h4>{repo.name}</h4>
                <p>{repo.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Repositories;