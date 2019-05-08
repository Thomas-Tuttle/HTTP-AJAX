import React from 'react';


const FriendContainer = ({ friends, deleteFriend, updateInfo, setUpUpdateForm }) => {


	return (
		<div>
			{friends.map((friend) => {
				return (
					<div className="Container" 
						key={friend.id} onChange={setUpUpdateForm}>

						<button className="delete"
							onClick={(event) => {
								deleteFriend(event, friend.id); }}> Delete </button>

						<button className="update"
							onClick={(event) => {
								updateInfo(event, friend.id);}}> Update </button>

						<p>E-mail - {friend.email}</p>
						<p>{friend.age} Years Old</p>
						<h4>{friend.name}</h4>
						

						
								
						
					</div>                                                  
				);
			})}
		</div>
	);
};

export default FriendContainer;
