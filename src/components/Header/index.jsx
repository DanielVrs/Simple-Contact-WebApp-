import styles from "./style.module.scss";

export const Header = ({ children }) => {
  return (
    <header className={styles.headerBox}>
      <div>
        <h1 className="">Contact WebApp</h1>
        {children}
      </div>
    </header>
  );
};
