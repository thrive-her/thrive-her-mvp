import { Link } from "react-router-dom";
import styles from '../styles/Banner.module.css';
import LogoutButton from "../components/LogoutButton";
import { usePassageUserInfo } from "../hooks/usePassageUserInfo";

function Banner() {
    const { userInfo } = usePassageUserInfo();

    return ( 
        <div className={styles.mainHeader}>
                <Link to={'/'}>
                    <div className={styles.logowrapper}>
                    <div className={styles.passageLogo}></div>
                    <div className={styles.headerText}>ThriveHer</div>
                    </div>
                </Link>
            <div className={styles.spacer}></div>
            <menu className={styles.menu}>
                <Link to={'/events'}><button className={styles.link}>Events</button></Link>
                <Link to={'/forum'}><button className={styles.link}>Forum</button></Link>
                <Link to={'/therapy'}><button className={styles.link}>Therapy</button></Link>
                <Link to={'/profile'}><button className={styles.link}>Profile</button></Link>
            <p>Welcome { userInfo?.user_metadata.first_name}</p>
            <LogoutButton />
            </menu>
        </div>
    );
}
export default Banner;
