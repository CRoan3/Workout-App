import { Link } from "react-router-dom";

//show for any URL that does not matcha  route
export default function NotFound() {
    return (
        <section>
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">Go back to the homepage</Link>
        </section>
    );
}