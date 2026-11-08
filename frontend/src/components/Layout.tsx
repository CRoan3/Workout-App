import { Link, NavLink, Outlet} from "react-router-dom";

// shared page shell: header + nav on every page, current page renders in <Outlet> (placeholder)
export default function Layout() {
  return ( 
    <>
        <header className="app-header">
            <Link to="/" className="brand">Workout App</Link>
            <nav>
                <NavLink to="/exercises">Exercises</NavLink>
                <NavLink to="/workout-plans">Workout Plans</NavLink>
            </nav>
        </header>

        <main>
            <Outlet/>
        </main>

    </>
  );
}