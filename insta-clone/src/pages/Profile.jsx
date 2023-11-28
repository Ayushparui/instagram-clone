import React, { useEffect, useState } from 'react';
import config from '../utils/config';


import { useParams } from 'react-router-dom';
import axios from 'axios';

function Profile() {

    const [userData, setUserData] = useState();
    const [loading , setLoading] = useState(true)
   
    const { id } = useParams();

    const fetchUserProfile = async () => {
        try {
            const res = await axios.get(`${config.SERVER_URL}/profile/user/${id}`);
            console.log('Profile response', res);
            setUserData(res.data.user);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        
            fetchUserProfile();
        
    }, []);

    console.log('User data', userData);

   return(
    loading ? <div>Loading...</div> : (
        <div>
            <h1>Name: {userData.name}</h1>
            <h2>Email: {userData.email}</h2>
            <img src={userData.profilePic} alt="Profile Picture" className='h-48 w-48' />
        </div>
    )
   )
    
}

export default Profile;
