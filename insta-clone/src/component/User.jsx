function User({user}){
    return(
        <>
            <div className="border border-sky-300 w-72 h-72">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <img src={user.profilePic} alt="Profile Pictures" className="w-48 h-48"/>
            {/* Add other user details as needed */}
        </div>
        </>
    )
}

export default User;