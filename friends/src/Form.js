import React from 'react';

const Form = (props) => {
	return (
		<div className="form">
			<form action="">
				<input type="text" onChange={props.formHandler} name="name" placeholder="...Name?" />
				<input type="text" onChange={props.formHandler} name="age" placeholder="...Age?" />
				<input type="text" onChange={props.formHandler} name="email" placeholder="...Email?" />
				<button onClick={props.addNewFriend} name="Submit"> Post/Update </button>
			</form>
		</div>
	);
}; 

export default Form;