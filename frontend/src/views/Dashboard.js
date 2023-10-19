import styles from "../styles/Dashboard.module.css";
import { PassageAuthGuard } from "@passageidentity/passage-react";
import { usePassageUserInfo } from "../hooks/";
import Banner from "../components/banner";
import forumsImage from '../assets/forums.png';
import therapyImage from '../assets/find_therapy.png';
import crisisImage from '../assets/crisis_text _line.png';
import eventsImage from '../assets/events_line.png';



function Dashboard() {
  const { loading } = usePassageUserInfo();

  if (loading) {
    return (
      <div className={styles.dashboard} role="status">
        <div className={styles.title}>Loading</div>
      </div>
    );
  }

  return (
    <PassageAuthGuard
      unAuthComp={
        <div className={styles.loginDashboard}>
          <div className={styles.title}>You must be logged in</div>
          <div className={styles.message}>
            <a className={styles.login} href="/">Login</a>
          </div>
        </div>
      }
    >
      <div className={styles.dashboard}>
        <Banner />
        <div className={styles.hero}></div>
        <div className={styles.pages} role="navigation" aria-label="Page selections">
          <div className={styles.page} role="region" aria-label="Forum">
            <div className={styles.image}>
              <img src={forumsImage} alt="forum illustration" />
            </div>
            <div className={styles.info}>
              <h3>Forum</h3>
              <p>Share in a safe and supportive space</p>
              <a className={styles.link} href="/forum">Learn More</a>
            </div>
          </div>
          <div className={styles.page} role="region" aria-label="Find Therapy">
            <div className={styles.image}>
              <img src={therapyImage} alt="Therapy illustration" />
            </div>
            <div className={styles.info}>
              <h3>Find Therapy</h3>
              <p>Discover tailored therapy options specific for women</p>
              <a className={styles.link} href="/therapy">Learn More</a>
            </div>
          </div>
          <div className={styles.page} role="region" aria-label="Crisis Text Line">
            <div className={styles.image}>
              <img src={crisisImage} alt="Crisis Text Line Illustration" />
            </div>
            <div className={styles.info}>
              <h3>Crisis Text Line</h3>
              <p>Get immediate help and support via text.</p>
              <a className={styles.link} href="/crisistextline">Learn More</a>
            </div>
          </div>
          <div className={styles.page} role="region" aria-label="Events">
            <div className={styles.image}>
              <img src={eventsImage} alt="Events Illustration" />
            </div>
            <div className={styles.info}>
              <h3>Events</h3>
              <p>Explore upcoming events with industry experts</p>
              <a className={styles.link} href="/events">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </PassageAuthGuard>
  );
}

export default Dashboard;
