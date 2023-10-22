import { PassageProfile } from "@passageidentity/passage-react";
import { PassageAuthGuard } from "@passageidentity/passage-react";
import styles from "../styles/Dashboard.module.css";
import Banner from "../components/banner";

function Profile() {
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
      <Banner />
    <div className="profile-container">
      <PassageProfile />
    </div>
    </PassageAuthGuard>
  );
}

export default Profile;
