import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";


function RequiredAuth() {

    const [value, setValue] = useState(false)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const checkAuth = async () => {
            const auth = localStorage.getItem('value') ? true : false;
            console.log(auth);
            setValue(auth);
            setLoading(false);
        };

        checkAuth();
    }, []);

    const location = useLocation();

   if(loading){
    return <div>Loading...</div>
   }else if(value){
    return <Outlet />
   }else{
    return <Navigate to="/login" state={{ from: location }} replace/>
   }
}

export default RequiredAuth;