import React, { Component } from 'react';
import FriendsContainer from './FriendCard.js';
import FriendsForm from './Form.js';
import Content from './Content.js';
import axios from 'axios';
import { Route } from 'react-router-dom';
import './App.css';
const whatFriend = {
	name: '',
	age: null,
	email: ''
};

class App extends Component {
	constructor(props) { 
		super(props);
		this.state = {
			friends: [ {} ],
			friend: { name: '', age: '', email: '' },
			editingId: null,
			activeFriend: null,
			isEditing: false
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/friends')
			.then((res) => this.setState({ friends: res.data }))
			.catch((err) => console.log(err));
	}

	formHandler = (event) => {
		this.setState({
			friend: {
				...this.state.friend,
				[event.target.name]: event.target.value
			}
		});
	};

	addNewFriend = (event) => {
		event.preventDefault();
		const { name, age, email } = this.state.friend;
		if (name.length <= 0 || Number.isInteger(parseInt(age)).length <= 0 || email.length <= 0) {}

		 else {
			axios
				.post('http://localhost:5000/friends', this.state.friend)
				.then((res) => {
					this.setState({
						friends: res.data,
						friend: { name: '', age: '', email: '' }
					});
				})
				.catch((err) => console.log(err));
		}
	};

	deleteFriend = (event, friendID) => {
		event.preventDefault();
		axios
			.delete(`http://localhost:5000/friends/${friendID}`)
			.then((res) => {
				this.setState({
					friends: res.data,
					friend: { name: '', age: '', email: '' }
				});
			})
			.catch((err) => console.log(err));
	};

	updateInfo = (event, friendID) => {
		event.preventDefault();
		axios
			.put(`http://localhost:5000/friends/${friendID}`, this.state.friend)
			.then((res) => {
				this.setState({
					friends: res.data,
					friend: { name: '', age: '', email: '', friend: whatFriend, isEditing: false }
				});
			})
			.catch((err) => console.log(err));
	};

	setUpUpdateForm = (event, friend) => {
		event.preventDefault();
		this.setState({
			friend,
			isEditing: true
		});
	};

	render() {
		const { friends, isEditing } = this.state;
		return (
			<div className="App">
				<Route path="/" render={(props) => <Content {...props} />} />
				<Route
					exact
					path="/"
					render={() => <FriendsForm formHandler={this.formHandler} addNewFriend={this.addNewFriend} />}
				/>
				<Route
					exact
					path="/"
					render={(props) => (
						<FriendsContainer friends={friends} {...props} 
						isEditing={isEditing} deleteFriend={this.deleteFriend}
						 updateInfo={this.updateInfo} />
					)}
				/>
			</div>
		);
	}
}

export default App;

