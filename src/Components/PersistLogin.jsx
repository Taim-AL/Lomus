import { useEffect, useState } from "react";
import useAuth from "./hooks/useAuth";
import Loder from "./Loder";
import { Outlet } from "react-router-dom";
import useRefreshToken from "./hooks/useRefreshToken";


const PersistLogin = () => {
    const [isLoading , setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth , persist } = useAuth();

    useEffect(()=>{
        const verifyRefreshToken = async () =>{
            try{
                await  refresh();
            }catch(err){
                console.log(err);
            }finally{
                setIsLoading(false);
            }
        }

        !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);

        
    },[auth?.accessToken , refresh])

    useEffect(()=>{
        // console.log(`isLoading : ${isLoading}` );
        // console.log(`at : ${JSON.stringify(auth?.accessToken)}` );
    },[isLoading ])

    return ( <>
        {!persist
            ?<Outlet/>

            :isLoading ?
                <Loder/>
                :<Outlet/>}
    </> );
}
 
export default PersistLogin;