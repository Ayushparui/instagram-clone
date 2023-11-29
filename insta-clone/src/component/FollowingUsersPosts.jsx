function FollowingUsersPosts({ postsImg }) {
    console.log("adsf", postsImg);

    if (Array.isArray(postsImg)) {
        // It's an array, proceed with mapping
        return (
            <div>
                {postsImg.map((post) => (
                    // Your mapping logic here
                    <div key={post._id}>
                        <img src={post.imageId} alt="image" className="h-48 w-48" />
                        <p>{post.caption}</p>
                    </div>
                ))}
            </div>
        );
    } else {
        // It's not an array, handle accordingly
        console.error('postsImg is not an array:', postsImg);
        return null; // or some default content/message
    }
}

export default FollowingUsersPosts;
