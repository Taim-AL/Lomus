import React, { useEffect, useState } from 'react';
import '../Assets/css/SingUp.css';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import AlertDismissibleExample from '../Components/Alert';
import Loder from '../Components/Loder';
import Axios from '../API/Axios';
import useAuth from '../Components/hooks/useAuth';
import { Snackbar } from '@mui/material';

function ChangePassword() {

    const {auth , setAuth} = useAuth();
    const [done , setDone] = useState(false)
    const [confirm , setConfirm] = useState("");
    const [matchConfirm , setMatchConfirm] = useState(false);
    const [matchFocus , setMatchFocus] = useState(false);
    const [password , setPassword] = useState("");
    const Navigate = useNavigate();
    const [error , setError] = useState({});
    const [isPending , setPending] = useState(false);
    
    useEffect(()=>{
        const match = password === confirm;
        setMatchConfirm(match)
    },[password , confirm])

    const handelLogin = async (event) =>{
        event.preventDefault();
        setPending(true);
        try{
            const contact = auth?.email;
            const code = auth?.verifyCode;
            await Axios.post('/teacher/reset-password' ,
                {
                    contact : contact,
                    code : code ,
                    password : password
                }
            ).then(response =>{
                if(response.data.success === true){
                    setAuth(prev =>{
                        return{
                            ...prev,
                            email : contact ,
                            password : password,
                        }
                    });
                    setDone(true);
                    setPassword("");
                    setConfirm("");
                    Navigate('/login')
                }
            })
        }catch(e){
            setPending(false)
            setError({name : "Error" , message : e.response.data.message});
        }
    }

    return ( 
        <>
        <Snackbar
        open={done}
        autoHideDuration={5000}
        message="The Password Has Been Changed ."
        />
        {isPending && <Loder/>}
        <div className="body">
            <div className="background"></div>
                <div className="card">
                    <SchoolIcon className='logo' />
                    <h2>Enter Your New Password</h2>    
                    <form className='form' onSubmit={handelLogin}>
                        <input 
                        type="password" 
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        placeholder='Password' 
                        className='input-1'/>
                        <input 
                        type="password"
                        value={confirm}
                        onChange={(e)=> setConfirm(e.target.value)}  
                        placeholder='Confirm Password'
                        required
                        autoComplete= ''
                        onFocus={()=> setMatchFocus(true)}
                        onBlur={()=>  setMatchFocus(false)}
                        className='input-1'
                        />
                        {matchFocus && !matchConfirm ? <AlertDismissibleExample   message={"Must match the first password input field"}/> : "" }
                        <button disabled = {!password || !confirm || !matchConfirm }>Change</button>
                    </form>
                    {error.message ? <AlertDismissibleExample name={error.name} message={error.message}/> : "" }
                    
                </div>
            </div>
        
        </>
     );
}

export default ChangePassword;