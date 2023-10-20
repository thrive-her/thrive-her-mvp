import { PassageAuthGuard } from "@passageidentity/passage-react";
import { usePassageUserInfo } from "../hooks/";
import LogoutButton from "../components/LogoutButton";
import styles from "../styles/Forum.module.css";

function Events() {
    const { userInfo } = usePassageUserInfo();

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
            <div>This is Forum Page</div>
            <p>Welcome, {userInfo?.email} </p>
            <LogoutButton />
        </PassageAuthGuard>
    );
}

export default Events;