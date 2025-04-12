import { useState, useEffect } from 'react';
const SavedCandidates = () => {
    // Initialize state with data from localStorage or an empty array
    const [savedCandidates, setSavedCandidates] = useState(() => {
        return JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    });
    // UseEffect to sync the savedCandidates with localStorage whenever it changes
    useEffect(() => {
        // Update localStorage whenever savedCandidates state changes
        localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    }, [savedCandidates]); // This will run every time savedCandidates change
    // Handle deleting a candidate
    const deleteCandidate = (candidateId) => {
        const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== candidateId);
        setSavedCandidates(updatedCandidates); // Update the state with the new candidates list
    };
    return (<div>
      <h1>Potential Candidates</h1>

      {/* If no candidates are saved, show a message */}
      {savedCandidates.length === 0 ? (<p>No candidates have been accepted.</p>) : (
        // List the saved candidates
        savedCandidates.map((candidate) => (<div key={candidate.id} style={{ border: '1px solid #ccc', padding: '16px', margin: '16px' }}>
            <img src={candidate.avatar_url} alt={`${candidate.name || 'Candidate'}'s avatar`} width="100"/>
            <h2>{candidate.name || 'No Name Provided'}</h2>
            <p><strong>Username:</strong> {candidate.login}</p>
            <p><strong>Location:</strong> {candidate.location || 'Not Available'}</p>
            <p><strong>Email:</strong> {candidate.email || 'Not Available'}</p>
            <p><strong>Company:</strong> {candidate.company || 'Not Available'}</p>
            <p><a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a></p>

            {/* Delete Button */}
            <button onClick={() => deleteCandidate(candidate.id)}>🗑️ Delete</button>
          </div>)))}
    </div>);
};
export default SavedCandidates;
