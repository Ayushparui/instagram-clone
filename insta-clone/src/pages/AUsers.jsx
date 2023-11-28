import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../utils/config'
import User from '../component/User'

function AUsers() {

    const [users, setUsers] = useState('')


    const getAllUsers  = async () => {
        try {
            const users = await axios.get(`${config.SERVER_URL}/profile/allusers`)
            setUsers(users.data.users)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    console.log(users)

    return (
        <div className="flex flex-col bg-slate-900 h-screen w-screen text-slate-300">
            <header className="border border-sky-500 w-full h-8">ALl the users</header>
            <section className="border border-sky-200 w-full h-full rounded-md">
                <div className="flex flex-col">
                    {
                        users && users.map((user) => {
                            return (
                                <User key={user._id} user={user} />
                            )
                        })
                    }
                </div>
            </section>
        </div>

    )
}

export default AUsers