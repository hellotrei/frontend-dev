import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setLoading, setRepos, setError, clearRepos } from '@/src/store/actions';
import { getRepositories } from '../api';
import { AppState } from '../store/reducers/repositories';
import { Repository } from '../interfaces/repository';
import { api } from '../api';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

interface Repo {
  id: number,
  name: string,
  html_url: string
}

interface Props {
  repos: Repo[]
}

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
  }, []);

  useEffect(() => {
    if (error === 'Request failed with status code 404') {
      setUserNotFound(true);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      dispatch(setUsername(username));
      const repos = await getRepositories(username).then();
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
    <Container>
      <Row>
        <Col xs={12}>
          <h1 className="text-center my-5">Github Repository Search</h1>
        </Col>
        <Col xs={12}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="search">Search Github Repositories</Label>
              <Input 
                type="text"
                name="search"
                id="search"
                placeholder="Enter repository name"
                value={username}
                onChange={e => setUsernameState(e.target.value)}
              />
            </FormGroup>
            <Button color="primary" type="submit" disabled={setDisabled}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </Form>
        </Col>
        {userNotFound && (
          <Col xs={12} className="text-center">
            <h3 className="my-5">User Not Found</h3>
          </Col>
        )}
        {repositories.length > 0 && (
          <Col xs={12} className="text-center">
            <h3 className="mt-5">Results</h3>
            <Button color="danger" onClick={handleClear} className="my-3">Clear Results</Button>
            <ul className="list-group my-3">
              {repositories.map((repo: Repository) => (
                <li key={repo.id} className="list-group-item">
                  <h5>{repo.name}</h5>
                  <a href={repo.html_url}>{repo.html_url}</a>
                </li>
              ))}
            </ul>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Repositories;