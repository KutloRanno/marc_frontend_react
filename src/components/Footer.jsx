import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; This website was developed by NativityIB developer Kutlo Ranno,
        using React, MongoDB, and ASPNET
      </p>
    </footer>
  );
}

export default Footer;
