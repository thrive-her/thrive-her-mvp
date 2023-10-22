import { PassageAuthGuard } from "@passageidentity/passage-react";
import styles from "../styles/Therapy.module.css";
import Banner from "../components/banner";

function Events() {

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
            <p>This is Therapy page</p>
        </PassageAuthGuard>
    );
}

export default Events;