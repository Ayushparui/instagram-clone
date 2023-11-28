import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../utils/config'
import { InfinitySpin } from 'react-loader-spinner'


function Register() {

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [loading, setLoading] = useState(false);


    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        
    })

    useEffect(() => {
        // Log the updated state whenever data changes
        console.log('Updated data:', data);
    }, [data]);


    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!previewSource) return;
        setLoading(true);

        try {
            const imageUrl = await uploadImage(previewSource);
            const imageId = imageUrl.data.responseData.url;
            console.log(imageId)
            console.log('Before setData:', data);
            

            console.log('After setData:', data);

           
            
         

            const uploadtodb = await uploadImageDetails(data.name, data.email, data.password, imageId);
            console.log(uploadtodb)

        
            // Use imageUrl or perform other actions after successful upload

            setLoading(false);

            // Clear input and preview after successful upload

            setPreviewSource('');
            setFileInputState('');

        } catch (err) {
            console.log(err)
        }
    }

    const uploadImage = async (base64EncodedImage) => {

        try {

            const body = JSON.stringify({ data: base64EncodedImage })
            const upload = await axios.post(`${config.SERVER_URL}/auth/profilepicture`, body, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (upload.status === 200) {
                setPreviewSource('')
                setFileInputState('');

            }
            return upload

        } catch (error) {
            console.log(error)
        }
    }

    const uploadImageDetails = async (name, email, password, profilePic) => {
        try {
            const data = { name, email, password, profilePic }
            console.log("Upload imge dett",data)
            const register = await axios.post(`${config.SERVER_URL}/auth/register`, data, {
                headers: { 'Content-Type': 'application/json'}
            })
            if (register.status === 200) {
                console.log(register)
                navigate('/login')
            }

        } catch (error) {
            console.log(error)
        }
    }




    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file)
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <input type="text"
                    placeholder="Enter Name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <input type="email"
                    placeholder="Enter Email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <input type="password"
                    placeholder="Enter Password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                />
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                {previewSource && (
                    <img
                        src={previewSource}
                        alt="chosen"
                        style={{ height: '300px' }
                        }
                    />
                )}
                <button type="submit">Submit</button>
            </form>
            {loading && <InfinitySpin
                width='200'
                color="#3399ff"
            />}
        </div>
    )
}

export default Register