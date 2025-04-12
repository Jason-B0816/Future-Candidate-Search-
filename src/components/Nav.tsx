import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="bg-blue-600 text-white shadow-md sticky top-0 z-50 h-screen w-64 fixed">
      <nav className="flex flex-col p-6 space-y-4 items-start justify-start text-left">
        <h1 className="text-2xl font-bold mb-6 text-left"></h1>
        <ul className="flex flex-col items-start space-y-4 text-left">
          <li>
            <Link
              to="/"
              className="hover:text-blue-200 transition duration-200 text-left"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/saved-candidates"
              className="hover:text-blue-200 transition duration-200 text-left"
            >
              Potential Candidates
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;

