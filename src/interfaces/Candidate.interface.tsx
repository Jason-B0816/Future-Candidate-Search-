// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    id: number; // Unique identifier for the candidate
    name: string; // Full name of the candidate
    username: string; // Candidate's username
    location: string; // Candidate's location
    avatar: string; // URL to the candidate's avatar image
    email: string; // Candidate's email address
    html_url: string; // Link to the candidate's GitHub profile
    company: string; // Candidate's current company or organization
  }