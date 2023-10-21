import styles from "../styles/Button.module.css";

export const Button = (props) => {
		const text = props.text;

		return (
			<button className={styles.button}>{text}</button>
		)
}

export default Button;