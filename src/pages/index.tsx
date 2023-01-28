import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setLoading, setRepos, setError, clearRepos } from '@/src/store/actions';
import { getRepositories } from '../api';
import { AppState } from '../store/reducers/repositories';
import { Repository, Props } from '../interfaces/repository';
import { api } from '../api';

export const getServerSideProps = async () => {
  const { data } = await api.get(`/users/hellotrei/repos`);
  return {
    props: {
      repos: data
    }
  }
}

const Repositories = ({repos}: Props) => {
  const dispatch = useDispatch();
  const [username, setUsernameState] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);
  const { repositories, isLoading, error } = useSelector((state: AppState) => state.repositories);

  useEffect(() => {
    dispatch(setRepos(repos));
  }, [dispatch, repos]);

  useEffect(() => {
    if (error === 'Request failed with status code 404') {
      setUserNotFound(true);
    }
  }, [error, setUserNotFound]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      dispatch(setUsername(username));
      const repos = await getRepositories(username);
      dispatch(setRepos(repos));
      setUserNotFound(false);
    } catch (error) {
      if(error instanceof Error){
        dispatch(setError(error.message));
        dispatch(setRepos([]));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleClear = () => {
    dispatch(clearRepos());
    setUsernameState('');
    setError('');
  };

  const setDisabled = username === '' || isLoading;

  return (
    <div className='container'>
      <div className='row'>
        <div className="container">
          <div className="row">
            <div className="col-md-6 hero-text">
              <h2>Search for <span>Github</span> <br />Respositories</h2>
              <h5>Use modern progressive technologies of Github to earn code references around the world</h5>
               <form className="hero-subscribe-from" onSubmit={handleSubmit}>
                 <input 
                  type="text" name="search"
                  id="search"
                  placeholder="Enter repository name"
                  value={username}
                  onChange={e => setUsernameState(e.target.value)}
                  />
                 <button className="site-btn sb-gradients" disabled={setDisabled}>{isLoading ? 'Searching...' : 'Search'}</button>
               </form>
             </div>
           </div>
         </div>
        {userNotFound && (
          <div className="col text-center">
            <h3 className="my-5">User Not Found</h3>
          </div>
        )}
        {repositories.length > 0 && (
          <div className="col text-center">
            <button onClick={handleClear} className="btn btn-link text-danger">Clear Results</button>
            <ul className="list-group my-3">
              {repositories.map((repo: Repository) => (
                <li key={repo.id} className="list-group-item">
                  <h5>{repo.name}</h5>
                  <a href={repo.html_url}>{repo.html_url}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Repositories;