import { Link } from "react-router-dom";
import "./styles.css";

export function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <Link to="/">Go to home</Link>
        <Link to="/contactform">Contact Form</Link>
        <Link to="/holygrail">Holy Grail</Link>
        <Link to="/mortgage">Mortgage Calculator</Link>
        <Link to="/todo">Todo List</Link>
        {/* <Link to="/jobboard">Job Board</Link> */}
        <Link to="/filestructure">File Structure</Link>
      </ul>
    </nav>
  );
}
