import { Link } from 'react-router-dom';
const Nav = () => {
    // TODO: Add necessary code to display the navigation bar and link between the pages
    return (<div className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Candidate Search</h1>
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="hover:text-blue-200 transition duration-200">
            Candidate Search
            </Link>
          </li>
          <li>
          <Link to="/saved-candidates" className="hover:text-blue-200 transition duration-200">
            Saved Candidates
          </Link>
          </li>
      </ul>
      </nav>
    </div>);
};
export default Nav;
