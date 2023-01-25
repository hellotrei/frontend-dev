import React from 'react';
import axios from 'axios';
import { NextPage } from 'next';

interface Repository {
  id: number;
  name: string;
  html_url: string;
}

interface Props {
  repositories: Repository[];
}

const Home: NextPage<Props> = ({ repositories }) => {
  const [username, setUsername] = React.useState('');
  const [repos, setRepositories] = React.useState(repositories || []);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
        const res = await axios.get(`https://api.github.com/users/${username}/repos`);
        if(res.status === 404){
            setError("User not found");
        }else{
            setRepositories(res.data);
        }
    } catch (err) {
        setError("An error occurred while trying to fetch the data.");
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          GitHub username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <ul>
      {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url}>{repo.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

Home.getInitialProps = async ({ query }: any) => {
  const { username = '' } = query;
  try {
    const res = await axios.get(`https://api.github.com/users/${username}/repos`);
    return { repositories: res.data };
  } catch (err) {
    console.log(err)
    return { repositories: [] };
  }
};

export default Home;
