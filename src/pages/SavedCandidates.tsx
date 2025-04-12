import { useState, useEffect } from 'react';

const SavedCandidates: React.FC = () => {
  // Define the Candidate interface to ensure type safety
  interface Candidate {
    id: string;
    avatar_url: string;
    name?: string;
    login: string;
    location?: string;
    email?: string;
    company?: string;
    html_url: string;
  }

  // Initialize state with data from localStorage or an empty array
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    return JSON.parse(localStorage.getItem('savedCandidates') || '[]');
  });

  // UseEffect to sync the savedCandidates with localStorage whenever it changes
  useEffect(() => {
    // Update localStorage whenever savedCandidates state changes
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  }, [savedCandidates]); // This will run every time savedCandidates change

  // Handle deleting a candidate
  const deleteCandidate = (candidateId: string) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== candidateId);
    setSavedCandidates(updatedCandidates); // Update the state with the new candidates list
  };

  return (
    <div>
      <h1>Potential Candidates</h1>
<table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Username</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>GitHub Profile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td><img src={candidate.avatar_url} alt={`${candidate.name || 'Candidate'}'s avatar`} width="50" /></td>
              <td>{candidate.name || 'No Name Provided'}</td>
              <td>{candidate.login}</td>
              <td>{candidate.location || 'Not Available'}</td>
              <td>{candidate.email || 'Not Available'}</td>
              <td>{candidate.company || 'Not Available'}</td>
              <td><a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a></td>
              <td><button onClick={() => deleteCandidate(candidate.id)}>🗑️ Delete</button></td>
            </tr>
          ))}
        </tbody>

</table>
   
    </div>
  );
};

export default SavedCandidates;
