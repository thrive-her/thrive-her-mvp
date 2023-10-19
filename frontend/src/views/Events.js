import styles from "../styles/Events.module.css";
import { PassageAuthGuard } from "@passageidentity/passage-react";
import { usePassageUserInfo } from "../hooks/";
import LogoutButton from "../components/LogoutButton";
import EventCard from "../components/EventCard";
import health from "../assets/womens\ health\ fact\ vs\ fiction\ png.png";
import menopause from "../assets/understanding\ menopause\ png.png";
import mindfulness from "../assets/mindfulness\ self\ love\ png.png";

function Events() {
const { userInfo } = usePassageUserInfo();
  return (
    <div className={styles.wrapper}>
      <PassageAuthGuard
        unAuthComp={
          <div>
            <div>you must be logged in</div>
            <div>
                <a href="/">Login</a>
            </div>
          </div>
        }
      >
        <div>
          <p>Welcome, {userInfo?.email} </p>
          <LogoutButton />
          <div className={styles.header}>
            <p>View upcoming events and register free!</p>
          </div>
          <div className={styles.cardWrapper}>
            <EventCard
              image={health}
              title="Women's Health: Fact vs. Fiction"
              date="Saturday, November 4th, 11am-1pm EST"
              description="This event is for women of all ages and will feature candid discussions with healthcare professionals from the UVM School of Medicine about: self care, mental health, sexual health, contraceptives, and more!"
            />
            <EventCard
              image={mindfulness}
              title="Mindfulness, Self-Love, and Community"
              date="Monday, November 6th, 8-10pm EST"
              description="Learn techniques to cultivate mindfulness and inner peace through positive mindset and gratitude.  Explore personal topics and set intentions for growth.  Hosted by practitioners at Life Growth Academy."
            />
            <EventCard
              image={menopause}
              title="Understanding Menopause"
              date="Wednesday, November 8, 11am-1pm EST"
              description="Join Patty Leger, CEO of WomenNow and Marissa Thomas, an advanced practice RN as we dive into menopause and what treatments including alternative remedies that can help alleviate symptoms."
            />
          </div>
        </div>
      </PassageAuthGuard>
    </div>
  );
}

export default Events;