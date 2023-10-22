import React, { useEffect, useState } from 'react';
import { PassageAuthGuard } from "@passageidentity/passage-react";
import styles from "../styles/Therapy.module.css";
import { TherapistCard } from "../components/TherapistCard";

function Therapy() {
  const { userInfo } = usePassageUserInfo();
  const [therapists, setTherapists] = useState([]);

  const fetchTherapists = async () => {
    try {
      const response = await fetch('http://localhost:7001/therapy')

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTherapists(data.therapy);
      } else {
        console.error('Failed to fetch therapists')
      }
    } catch (error) {
      console.error('Error fetching therapists:', error)
    }
  }

  useEffect(() => {
    fetchTherapists();
  }, []);

  return (
    <div className={styles.wrapper}>
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
          <p>Welcome, {userInfo?.email} </p>
          <LogoutButton />
          <div className={styles.header}>
            <p>We can support you with:</p>
          </div>
          <div className={styles.cardWrapper}>
            {therapists.map((therapist) => (
              <TherapistCard
                key={therapist.id}
                name={therapist.doctor_name}
                title={therapist.doctor_title}
                description={therapist.doctor_desp}
              />
            ))}
          </div>
        </div>
      </PassageAuthGuard>
    </div>
  );
}

export default Therapy;