import styles from "../styles/EventCard.module.css";
import Button from "./Button";

export const EventCard = (props) => {
	const image = props.image;
	const title = props.title;
	const date = props.date;
	const description = props.description;

	return (
		<div className={styles.wrapper}>
			<div className={styles.imageWrapper}>
				<img src={image}></img>
			</div>
			<h4 className={styles.title}>{title}</h4>
			<p className={styles.date}>{date}</p>
			<p className={styles.description}>{description}</p>
			<Button text="Register" />
		</div>
	)
};

export default EventCard;