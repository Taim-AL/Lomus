import React, { useState } from 'react';
import '../Assets/css/SingUp.css';
import {  useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import axios from "../API/Axios"
import AlertDismissibleExample from '../Components/Alert';
import Loder from '../Components/Loder';
import useAuth from '../Components/hooks/useAuth';

function Verify() {
    const {setAuth } = useAuth();
    const {auth} = useAuth();
    const email  = auth?.email;
    const [otp , setOtp] = useState(new Array(6).fill(""));
    let verifyCode ="";
    const Navigate = useNavigate();
    const [error , setError] = useState({});
    const [isPending , setPending] = useState(false);
    const handelVerify = async (event) =>{
        event.preventDefault();
        setPending(true);
        try{
            console.log(JSON.stringify(email));
            
            for (let i = 0; i < otp.length; i++) {
                verifyCode += otp[i];
            };
            console.log(parseInt(verifyCode));
            await axios.post('/teacher/verify' , 
            {contact : email , code : parseInt(verifyCode) }, 
            {headers: {
                'Content-Type': 'application/json'
            }}).then(response => {
                if(response.data.success === true){
                    console.log(response?.data?.data?.token);
                    const accessToken = response?.data?.data?.token ;
                    setAuth(prev =>{
                        return{
                            ...prev,
                            accessToken : accessToken ,
                            
                        }
                    });
                    localStorage.setItem("token", accessToken);
                    setPending(false);
                    
                    console.log(auth);
                    console.log(response.data)
                    let a = document.createElement('a');
                    a.href = 'https://connect.stripe.com/d/setup/e/_QbbBZV13fVyTGX34o37mZaUONx/YWNjdF8xUGtOeEpGU3hVM0VBclc0/29c1a638d86a83a71';
                    a.target = "_blank";
                    a.click();
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

export default Verify;