import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmtpy = (value) => value.trim() === "";
const is6Chars = (value) => value.trim().length > 6;

const Checkout = (props) => {
	const [ValidFormInput, setValidFormInput] = useState({
		name: true,
		street: true,
		postalCode: true,
		city: true,
	});

	const nameRef = useRef();
	const streetRef = useRef();
	const postalCodeRef = useRef();
	const cityRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameRef.current.value;
		const enteredStreet = streetRef.current.value;
		const enteredPostalCode = postalCodeRef.current.value;
		const enteredCity = cityRef.current.value;

		const validInputName = !isEmtpy(enteredName);
		const validInputStreet = !isEmtpy(enteredStreet);
		const validInputPostalCode = !isEmtpy(enteredPostalCode);
		const validInputCity = is6Chars(enteredCity);

		setValidFormInput({
			name: validInputName,
			street: validInputStreet,
			postalCode: validInputPostalCode,
			city: validInputCity,
		});

		const formIsValid =
			validInputName &&
			validInputStreet &&
			validInputPostalCode &&
			validInputCity;

		if (!formIsValid) {
			return;

			// Submit cart data
		}

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity
    })
	};

	const nameControlClasses = `${classes.control} ${
		ValidFormInput.name ? "" : classes.invalid
	}`;
	const streetControlClasses = `${classes.control} ${
		ValidFormInput.street ? "" : classes.invalid
	}`;
	const postalCodeControlClasses = `${classes.control} ${
		ValidFormInput.postalCode ? "" : classes.invalid
	}`;
	const cityControlClasses = `${classes.control} ${
		ValidFormInput.city ? "" : classes.invalid
	}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlClasses}>
				<label htmlFor='name'>Your Name</label>
				<input type='text' id='name' ref={nameRef} />
				{!ValidFormInput.name && <p>Please enter a valid name!</p>}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street' ref={streetRef} />
				{!ValidFormInput.street && <p>Please enter a valid street!</p>}
			</div>
			<div className={postalCodeControlClasses}>
				<label htmlFor='postal'>Postal Code</label>
				<input type='text' id='postal' ref={postalCodeRef} />
				{!ValidFormInput.postalCode && (
					<p>Please enter a valid postal code (5 characters long)!</p>
				)}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor='city'>City</label>
				<input type='text' id='city' ref={cityRef} />
				{!ValidFormInput.city && <p>Please enter a valid city!</p>}
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
