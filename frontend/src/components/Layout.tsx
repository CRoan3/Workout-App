import { Link, NavLink, Outlet} from "react-router-dom";

// shared page shell: header + nav on every page, current page renders in <Outlet> (placeholder)
export default function Layout() {
  return ( 
    <>
        <header>
            <Link to="/">Workout App</Link>
            <nav>
                <NavLink to="/exercises">Exercises</NavLink>
            </nav>
        </header>

        <main>
            <Outlet/>
        </main>

    </>
  );
}