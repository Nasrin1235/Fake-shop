import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <h2 className="not-found-title" >404</h2>
      <h4 className="not-found-subtitle"> Opps!Page Not Found</h4>
      <p className="not-found-message">Sorry, the page you are looking for does not exist.</p>
      <Link className="not-found-link"  to="/">Go back to the homepage</Link>
    </div>
  );
}

export default NotFound;
