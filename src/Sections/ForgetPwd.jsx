import React, { useState } from 'react';
import '../Assets/css/SingUp.css';
import {  useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import AlertDismissibleExample from '../Components/Alert';
import Loder from '../Components/Loder';
import useAuth from '../Components/hooks/useAuth';
import Axios from '../API/Axios';

function Forget() {

    const {setAuth , auth} = useAuth();
    const [email , setEmail] = useState("");
    const Navigate = useNavigate();
    const [error , setError] = useState({});
    const [isPending , setPending] = useState(false);
    const handelLogin = async (event) =>{
        event.preventDefault();
        setPending(true);
        try{

            await Axios.post('/teacher/forget-password',
                {
                    contact : email
                }
            ).then(response =>{
                const res = response.data;
                if(res.success === true){
                    setPending(false);
                    setAuth(prev =>{
                        return{
                        ...prev ,
                        email : email
                        }
                    });
                    console.log(auth)
                    setEmail("");
                    Navigate('/verify-password')
                }
            })
        }catch(e){
            setPending(false);
            setError({name : "Error",message : e.response.data.message});
        }
    }

    return ( 
        <>
        {isPending && <Loder/>}
        <div className="body">
            <div className="background"></div>
                <div className="card">
                    <SchoolIcon className='logo' />
                    <h2>Enter Your Email</h2>    
                    <form className='form' onSubmit={handelLogin}>
                        <input 
                        type="text" 
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        placeholder='Email'
                        className='input-1'/>
                        <button>Send</button>
                    </form>
                    {error.message ? <AlertDismissibleExample name={error.name} message={error.message}/>  : "" }
                </div>
            </div>
        
        </>
     );
}

export default Forget;