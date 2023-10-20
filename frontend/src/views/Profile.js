import { PassageProfile } from "@passageidentity/passage-react";
import { PassageAuthGuard } from "@passageidentity/passage-react";
import styles from "../styles/Dashboard.module.css";

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
    <div>
      <PassageProfile />
    </div>
    </PassageAuthGuard>
  );
}

export default Profile;
