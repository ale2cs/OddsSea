import styles from "styles/about.module.css";

export default function About() {
  return (
    <main className={styles.content}>
      <h2>About</h2>
      <p>
        The website's main purpose is to offer calculators for assessing bet
        profitability, providing educational insights into sportsbook
        profitability, win probabilities, and the mathematical aspects of
        profitable betting.
      </p>
      <p>
        Future plans include featuring positive EV bets from various
        sportsbooks, with ongoing development efforts.
      </p>
      <h2>Contact</h2>
      <p>I can be reached via my email</p>
      <p>Email: ale2@ualberta.ca</p>
    </main>
  );
}
