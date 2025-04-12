import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<{ id: number; avatar_url: string; login: string; html_url: string }[]>([]);
  const [candidate, setCandidate] = useState<{ avatar_url: string; name?: string; login: string; location?: string; email?: string; company?: string; html_url: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    const [savedCandidates, setSavedCandidates] = useState(() => {
    return JSON.parse(localStorage.getItem('savedCandidates') || '[]') || [];
  });

  // Fetch a single random candidate
  const fetchCandidate = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchGithubUser(candidates[0].login); // Replace 'example-username' with a valid username
      console.log(data); // Log the data to see the structure
      setCandidate(data);
    } catch (err) {
      setError('No more candidates are available. Click " - " button or try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidate();
  }, [candidates]); // Fetch candidate whenever candidates list changes

  // Fetch candidates based on search input
  const fetchCandidates = async () => {
   
    
    setLoading(true);
    setError(null);

    try {
      const data = await searchGithub();
      setCandidates(data ); // Set the candidates based on the search results);
     
    } catch (err) {
      setError('Failed to search candidates.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Save candidate and fetch the next one
  const saveCandidate = () => {
    if (candidate) {
      const updatedList = [...savedCandidates, candidate];
      setSavedCandidates(updatedList);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedList));
      fetchCandidates();
    }
  };

  // Skip candidate without saving
  const skipCandidate = () => {
    fetchCandidates();
  };

  return (
    <div>
      <h1>CandidateSearch</h1>

      {/* Search Input
      <input
        type="text"
        placeholder="Search candidates..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={fetchCandidates} disabled={loading}>🔍 Search</button> */}

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display Search Results */}
      {/* {candidates.length > 0 && (
        <div>
          <h2>Search Results</h2>
          {candidates.map((user) => (
            <div key={user.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
              <img src={user.avatar_url} alt={user.login} width="50" />
              <p><strong>{user.login}</strong></p>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
            </div>
          ))}
        </div>
      )} */}

      {/* Display Current Candidate */}
      {candidate && (
        <div style={{ border: '1px solid #ccc', padding: '16px', margin: '16px' }}>
          <img src={candidate.avatar_url} alt={candidate.name || 'Candidate'} width="100" />
          <h2>{candidate.name || 'No Name Provided'}</h2>
          <p><strong>Username:</strong> {candidate.login}</p>
          <p><strong>Location:</strong> {candidate.location || 'Not Available'}</p>
          <p><strong>Email:</strong> {candidate.email || 'Not Available'}</p>
          <p><strong>Company:</strong> {candidate.company || 'Not Available'}</p>
          <p><a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a></p>
        </div>
      )}

      {/* Candidate Actions */}
     <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
      <IoRemoveCircle  style={{ fontSize: '50px', cursor: 'pointer', color: 'rgb(255, 0, 0)'}} onClick={() => skipCandidate?.()} />
      
      <IoAddCircle style={{ fontSize: '50px', cursor: 'pointer', color: 'rgb(0, 255, 120)'}} onClick={() => saveCandidate?.()} /> 
      </div>
    </div>
  );
};

export default CandidateSearch;
