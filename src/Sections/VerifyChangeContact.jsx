import React, { useState } from 'react';
import '../Assets/css/SingUp.css';
import {  useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import AlertDismissibleExample from '../Components/Alert';
import Loder from '../Components/Loder';
import useAuth from '../Components/hooks/useAuth';
import useAxiosPrivate from '../Components/hooks/useAxiosPrivate';

function VerifyChangeContact() {
    const {auth} = useAuth();
    const email  = auth?.email;
    const [otp , setOtp] = useState(new Array(6).fill(""));
    let verifyCode ="";
    const Navigate = useNavigate();
    const [error , setError] = useState({});
    const [isPending , setPending] = useState(false);
    const AxiosAuth = useAxiosPrivate();
    const handelVerify = async (event) =>{
        event.preventDefault();
        setPending(true);
        
        try{
            console.log(JSON.stringify(email));
            
            for (let i = 0; i < otp.length; i++) {
                verifyCode += otp[i];
            };
            console.log(parseInt(verifyCode));
            await AxiosAuth.post('/teacher/verify-change-contact' , 
            {contact : email , code : parseInt(verifyCode) }
            ).then(response => {
                if(response.data.success === true){
                    setPending(false);                    
                    console.log(auth)
                    setOtp("");
                    Navigate('/home/main');
                }
            })
            
            
            
        }catch(e){
            console.log(e);
            setError({name: "error" , message: e.response.data.message});
            setPending(false);
        }
    }

    function handleChange(e, index){
        if(isNaN(e.target.value)) return false;
        setOtp([
            ...otp.map((data,indx) => (indx === index ? e.target.value: data))
        ]);

        if(e.target.value && e.target.nextSibling){
            e.target.nextSibling.focus();
        }
    }

    return ( 
        <>
        {isPending && <Loder/>}
        <div className="body">
            <div className="background"></div>
                <div className="card">
                    <SchoolIcon className='logo' />
                    <h2>Enter Verify Code</h2>    
                    <form className='form' onSubmit={handelVerify}>
                        <div className="form-2">
                            {otp.map((data , i)=>{
                                return(
                                    <input 
                                    key={i}
                                    type='text' 
                                    className='input-2'
                                    value={data}
                                    onChange={(e)=>handleChange(e,i)}
                                    maxLength={1}
                                    required
                                    />
                                )
                            })}
                        </div>
                        <button>Send</button>
                    </form>
                    {
                    error.message ?
                     <AlertDismissibleExample name={error.name} message={error.message}/>  
                     : ""
                      }
                </div>
            </div>
        
        </>
     );
}

export default VerifyChangeContact;