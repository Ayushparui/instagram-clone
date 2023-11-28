import { useDispatch } from "react-redux";
import { removeCookies, setCookies } from "../feature/auth/auth";


function About(){

    const dispatch = useDispatch()
    const handleCookies = () => {
        dispatch(setCookies({value: 'test'}))
    }


    const remove = () => {
        dispatch(removeCookies())
    }
    return(
        <div>
            <h1>About</h1>
            <p>This is the about page</p>
            <button onClick={handleCookies}>Add Cookeis</button>
            <br />
            <button onClick={remove}>Remove coolies</button>
        </div>
    )
}
export default About;