import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo.jsx";
function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/app">Sports</NavLink>
        </li>{" "}
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/auth" className={styles.ctaLink}>
            Login or Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
