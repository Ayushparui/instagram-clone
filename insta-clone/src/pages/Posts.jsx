import axios from "axios";
import { useEffect, useState } from "react";
import config from "../utils/config";


function Posts(){

    const [loading , setLoading] = useState(true)
    const [postsData, setPostsData] = useState();


    const fetchPosts = async () => {
        try {

            const userId = localStorage.getItem('userId');
            console.log(userId);
            const posts = await axios.get(`${config.SERVER_URL}/upload/myposts`, {
                params: { userId }
            });
            // console.log('Posts response', posts);
            // setUserData(res.data.user);
            console.log(posts.data.posts)
            setPostsData(posts.data.posts)

            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
            
                fetchPosts();
            
        }, []);



    return (
        <div div className="flex bg-slate-900 text-slate-300 h-screen">
            <section>
                <header className="flex flex-col border-2 border-sky-500 w-screen rounded-xl">My Posts</header>
                <div>
                    
                    <section className="flex flex-col border-2 border-sky-500 mt-2 w-screen h-[550px] rounded-xl">
                    {loading ? <div>Loading...</div> : (
                        postsData.map((post) => (
                            <div key={post._id}>
                                <img src={post.imageId}
                                 alt="image"
                                 className="h-48 w-48"
                                 />
                                <p>{post.caption}</p>
                            </div>
                        ))
                        )}
                    </section>
                </div>
            </section>
        </div>
    )
}

export default Posts;