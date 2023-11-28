import { useState } from "react";
import axios from 'axios'
import { InfinitySpin } from 'react-loader-spinner'
import config from "../utils/config";

function ImageUpload() {

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [loading, setLoading] = useState(false);
    const [caption, setCaption] = useState('');

   

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
   
    const handleSubmitFile = async (e) => {
        e.preventDefault();
        if (!previewSource) return;
        setLoading(true);
    
        try {
            const imageUrl = await uploadImage(previewSource);
            const userId = localStorage.getItem('userId');
            const imageId = imageUrl.data.responseData.url;
            const imageDetails = await uploadImageDetails(userId, imageId, caption);

            console.log(imageDetails)
    
            // Use imageUrl or perform other actions after successful upload
    
            setLoading(false);
    
            // Clear input and preview after successful upload
            setPreviewSource('');
            setFileInputState('');
    
            
        } catch (error) {
            console.log(error);
            setLoading(false);
            // Handle error as needed
        }
    }
   
    const uploadImage = async (base64EncodedImage) => {

        try {
           
            const body = JSON.stringify({ data: base64EncodedImage })
            const upload = await axios.post(`${config.SERVER_URL}/upload/image`, body, {
                headers: { 'Content-Type': 'application/json' }
            });
            if(upload.status === 200){
                setPreviewSource('')
                setFileInputState('');
                const userId = localStorage.getItem('userId')
                console.log(userId)
            }
            return upload
            
        } catch (error) {
            console.log(error)
        }
    }
   
    const uploadImageDetails = async (userId, imageId, caption) => {
        try {
            const body = { userId, imageId, caption }
            const uploadData = await axios.post(`${config.SERVER_URL}/upload/post`, body, {
                headers: { 'Content-Type': 'application/json' }
            });
            return uploadData
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col h-[500px]">

            <form onSubmit={handleSubmitFile}>
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
                <input type="text"
                    name="caption"
                    placeholder="Enter Caption"
                    onChange={(e) => setCaption(e.target.value)}
                    value={caption}
                />
                <button type="submit">Submit</button>
            </form>
            
            {loading && <InfinitySpin
                width='200'
                color="#3399ff"
            />}
        </div>
    )
}
export default ImageUpload;