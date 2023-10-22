import React, { useEffect, useState } from 'react';
import styles from "../styles/Events.module.css";
import { PassageAuthGuard } from "@passageidentity/passage-react";
import EventCard from "../components/EventCard";
import health from "../assets/womens\ health\ fact\ vs\ fiction\ png.png";
import menopause from "../assets/understanding\ menopause\ png.png";
import mindfulness from "../assets/mindfulness\ self\ love\ png.png";
import Banner from "../components/banner";

function Events() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:7001/events');

      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
      } else {
        console.error('Failed to fetch events')
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  function formatDate(date_string) {
    let date = new Date(date_string)
    return date.toLocaleDateString('en-us', {weekday: "long", year: "numeric", month: "long", day: "numeric"})
  }

  function formatTime(time_string) {
    let no_seconds = time_string.slice(0, -6);
    let hours_and_minutes = no_seconds.split(':');
    let hours = hours_and_minutes[0];

    if (hours === 0) {
      hours = 12 + 'pm'
    } else if (hours > 0 && hours <= 12) {
      hours = hours + 'am'
    } else if (hours > 12) {
      hours = hours - 12 + 'pm'
    }

    return hours;
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
      <Banner />
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <p>View upcoming events and register free!</p>
          </div>
          <div className={styles.cardWrapper}>
            {events.map((event) => (
              <EventCard
                key={event.id}
                image={
                  (event.title.includes("Health")) ? health :
                  (event.title.includes("Menopause") ? menopause : mindfulness)
                }
                title={event.title}
                date={formatDate(event.event_date) + ", " + formatTime(event.event_start_time) + " - " + formatTime(event.event_end_time)}
                description={event.description}
              />
            ))}
          </div>
        </div>
      </PassageAuthGuard>
  );
}

export default Events;