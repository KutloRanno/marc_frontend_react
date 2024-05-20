import { Link } from "react-router-dom";
import PageNav from "../components/PageNav.jsx";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          This is the galloping troika
          <br />
          She will gallop past imploring arms, she will gallop till she has no
          more gallops in her!
        </h1>
        <h2>The next olympics promise you wonders.</h2>
        <Link to={"/auth/user_register"} className={"cta"}>
          Start seeing what to expect now
        </Link>
      </section>
    </main>
  );
}
