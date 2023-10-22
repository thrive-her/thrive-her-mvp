import styles from "../styles/TherapistCard.module.css";
import Button from "./Button";

export const TherapistCard = (props) => {
	const image = props.image;
	const name = props.name;
	const title = props.title;
	const description = props.description;

	return (
		<div className={styles.wrapper}>
			<div className={styles.imageWrapper}>
				<img src={image}></img>
			</div>
			<h4 className={styles.name}>{name}</h4>
			<p className={styles.title}>{title}</p>
			<p className={styles.description}>{description}</p>
			<Button text="View Details" />
	</div>
	)
};

export default TherapistCard;