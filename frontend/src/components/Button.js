import styles from "../styles/Button.module.css";

export const Button = (props) => {
	const text = props.text;
	const onClick = props.onClick;

	return (
		<button onClick={onClick} className={styles.button}>{text}</button>
		)
}

export default Button;
