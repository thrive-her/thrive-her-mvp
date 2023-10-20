import { usePassageLogout } from "../hooks";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LogoutButton.module.css";

export const LogoutButton = () => {
  const { logout } = usePassageLogout();

  const navigate = useNavigate();

  const signout = () => {
    logout();
    navigate("/");
  };
  return <button className={styles.logout} onClick={signout}>Sign Out</button>;
};

export default LogoutButton;
