import React, { useState, useEffect } from 'react';
import config from '../utils/config';
import axios from 'axios';

function User({user}){

    const userId = localStorage.getItem('userId')
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(user.followers.length);
    const [followingCount, setFollowingCount] = useState(user.following.length);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post(`${config.SERVER_URL}/profile/checkFollow`, {
                    userId,
                    id: user._id,
                });

                if (res.status === 200) {
                    setIsFollowing(res.data.isFollowing);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [userId, user._id]);

    const handleFollowClick = async (id) => {
        try {
            
            const data = {userId, id}
            const res = await axios.post(`${config.SERVER_URL}/profile/follow`, data)
            if(res.status === 200){
                setIsFollowing(true)
                setFollowersCount((prevCount) => prevCount + 1);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUnFollowClick = async (id) => {
        try {
            // const userId = localStorage.getItem('userId')
            const data = {userId, id}
            const res = await axios.post(`${config.SERVER_URL}/profile/unfollow`, data)
            if(res.status === 200){
                setIsFollowing(false)
                setFollowersCount((prevCount) => prevCount - 1);
                // setFollowingCount((prevCount) => prevCount - 1); // Update 
                // setFollowingCount((prevCount) => prevCount - 1);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="flex flex-col flex-wrap">
            <div className="border border-sky-300 w-72 h-72 mt-6">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Followers: {followersCount}</p>
            <p>Following: {followingCount}</p>
            <img src={user.profilePic} alt="Profile Pictures" className="w-48 h-48"/>
            {isFollowing ? <button onClick={() => handleUnFollowClick(user._id)}>Un-Follow</button> :  <button onClick={() => handleFollowClick(user._id)}>Follow</button>}
           
            {/* Add other user details as needed */}
        </div>
        </div>
    )
}

export default User;