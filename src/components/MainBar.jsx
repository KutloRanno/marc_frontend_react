import styles from "./MainBar.module.css";
import SportsNav from "./SportsNav.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";

function MainBar({ userPack }) {
  return (
    <div className={styles.main}>
      <SportsNav userPack={userPack} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainBar;
