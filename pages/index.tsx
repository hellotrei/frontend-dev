import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setLoading, setRepos, setError, clearRepos } from '../actions';
import { getRepositories } from '../api';
import { AppState } from '@/reducers/repositories';
import { Repository } from '@/interfaces/repository';

const Repositories = () => {
  const dispatch = useDispatch();
  const [username, setUsernameState] = useState('');
  const repositories = useSelector((state: AppState) => state.repositories.repositories);
  const error = useSelector((state: AppState) => state.repositories.error);
  const isLoading = useSelector((state: AppState) => state.repositories.isLoading);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const repos = await getRepositories(username);
      dispatch(setLoading(true));
      dispatch(setUsername(username));
      dispatch(setRepos(repos));
      dispatch(setError(''));
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
    setError('');
    setUsername('');
  };

  return (
      <div className="page-content page-container p-3" id="page-content">
          <div className="padding">
              <div className="row container d-flex justify-content-center">
                  <div className="col-md-12">
                      <div className="card px-3">
                          <div className="card-body">
                              <div className="add-items d-flex justify-content-between">
                                  <h4 className="card-title">Awesome Todo list</h4>
                                  <button className="add btn btn-danger font-weight-bold todo-list-add-btn" onClick={handleClear}>Clear</button>
                              </div>
                              <form onSubmit={handleSubmit} className="add-items d-flex my-3">
                                <input type="text" className="form-control todo-list-input" placeholder="Enter a GitHub username" value={username} onChange={e => setUsernameState(e.target.value)} />
                                <button type="submit" className="add btn btn-primary font-weight-bold todo-list-add-btn">Search</button>
                              </form>
                              <div className="list-wrapper">
                                  <ul className="d-flex flex-column-reverse todo-list">
                                  {repositories.map((repo: Repository) => (
                                    <li key={repo.id}>
                                      <h4>{repo.name}</h4>
                                      <div className="form-check"> <label className="form-check-label"> {repo.name} <i className="input-helper"></i></label> </div>
                                    </li>
                                  ))}
                                  {isLoading && <p className="d-flex justify-content-center p-3">Loading...</p>}
                                  {error && <p className="d-flex justify-content-center p-3">{error}</p>}
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Repositories;