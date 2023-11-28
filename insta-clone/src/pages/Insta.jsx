
import { Navigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import ImageUpload from "../component/imageUpload"
import config from "../utils/config"

function Insta() {
    const [selector, setValue] = useState(false)
    const [userId, setUserId] = useState(false)
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate()




    useEffect(() => {
        const checkAuth = async () => {
            const auth = localStorage.getItem('value')
            const userId = localStorage.getItem('userId')
            console.log(auth);
            setValue(auth);
            setUserId(userId)
        };

        checkAuth();
    })


    const handelClick = async () => {

        try {
            const logout = await axios.get(`${config.SERVER_URL}/auth/logout`, {
                headers: {
                    Authorization: `Bearer ${selector}`
                }
            })
            if (logout.status === 200) {
                console.log("logout")
                localStorage.removeItem('value')
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }

    }

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };


    return (
        <div className="flex bg-slate-900 text-slate-300">
            <section className="flex flex-col border-2 border-sky-500 w-1/6 h-screen rounded-xl">
                <header className="">
                    <h1>logo</h1>
                </header>
                <div className="my-60 ml-[60px]">
                    <ul>
                        <li className="flex py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            <Link to={`/profile/${userId}`}>Profile</Link>
                        </li>
                        <li className="flex py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            <Link to={'/posts'}>My Posts</Link>
                        </li>
                    </ul>
                </div>
                <div className="mt-6 ml-[60px]">
                    <button className="bg-sky-500 hover:bg-sky-700 w-24 rounded-xl" onClick={handelClick}>Logout</button>
                </div>
            </section>
            <section className="flex border-2 border-sky-500 ml-2 w-5/6 h-screen rounded-xl">
                <header className="flex flex-row">
                    <div>
                        <h1>Instagram</h1>
                    </div>
                    <div>
                    <button className="bg-sky-500 hover:bg-sky-700 w-24 h-8 ml-[850px] rounded-xl" onClick={handleModalOpen}>+ New Post</button>
                        {showModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                <div className="bg-white p-8 rounded-xl">
                                    <button className="absolute top-4 right-4 text-red-500" onClick={handleModalClose}>X</button>
                                    <ImageUpload />
                                </div>
                            </div>
                        )}
                    </div>
                </header>

            </section>
        </div>
    )
}

export default Insta