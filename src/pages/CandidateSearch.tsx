import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<{ id: number; avatar_url: string; login: string; html_url: string }[]>([]);
  const [candidate, setCandidate] = useState<{ avatar_url: string; name?: string; login: string; location?: string; email?: string; company?: string; html_url: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [savedCandidates, setSavedCandidates] = useState(() => {
    return JSON.parse(localStorage.getItem('savedCandidates') || '[]') || [];
  });

  // Fetch a single random candidate
  const fetchCandidate = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchGithubUser('example-username'); // Replace 'example-username' with a valid username
      setCandidate(data);
    } catch (err) {
      setError('Failed to fetch candidate. Try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  // Fetch candidates based on search input
  const fetchCandidates = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);

    try {
      const data = await searchGithub();
      setCandidates(data.items || []);
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
      fetchCandidate();
    }
  };

  // Skip candidate without saving
  const skipCandidate = () => {
    fetchCandidate();
  };

  return (
    <div>
      <h1>CandidateSearch</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search candidates..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={fetchCandidates} disabled={loading}>🔍 Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display Search Results */}
      {candidates.length > 0 && (
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
      )}

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
      <button onClick={saveCandidate} disabled={loading}>➕ Save</button>
      <button onClick={skipCandidate} disabled={loading}>➖ Skip</button>
    </div>
  );
};

export default CandidateSearch;
