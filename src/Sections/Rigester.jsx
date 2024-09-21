import React, { useState , useRef  , useEffect} from 'react';
import '../Assets/css/SingUp.css';
import { Link, useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
// import axios from "../API/Axios";
import AlertDismissibleExample from '../Components/Alert';
import Loder from '../Components/Loder';
import useAuth from '../Components/hooks/useAuth';
import axios from '../API/Axios';
// import axios from 'axios';


function Rigestert() {

    const userRef = useRef();
    const errRef = useRef();

    const  {auth ,setAuth }  = useAuth();

    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    
    
    // const [email , setEmail] = useState("");

    const [password , setPassword] = useState("");

    const [confirm , setConfirm] = useState("");
    const [matchConfirm , setMatchConfirm] = useState(false);
    const [matchFocus , setMatchFocus] = useState(false);
    
    const [error , setError] = useState({});
    
    const Navigate = useNavigate();
    
    useEffect(()=>{
        userRef.current.focus();
    },[])

    useEffect(()=>{
        const match = password === confirm;
        setMatchConfirm(match)
    },[password , confirm])

    useEffect(()=>{
        setError('');
    }, [name , email , password , confirm])
    
    
    const [isPending , setPending] = useState(false);

    const handeleRegister = async (event)=>{
        setPending(true);
        event.preventDefault();
        try{
            
            await axios.post('/teacher/register' ,{ name:name , contact:email , password:password}
            , {headers: {
                'Content-Type': 'application/json'
              }}
            ).then(response =>{
                const res = response.data;
                // const accessToken  = res.token ; 
                console.log(res)
                // console.log(setAuth)
                if(res.success){
                    setAuth(prev =>{
                        return{
                            ...prev,
                            email : email ,
                            password : password,
                        }
                    });
                    console.log(auth);
                    setPending(false);
                    setName("");
                    setEmail("");
                    setPassword("");
                    setConfirm("");
                    
                    Navigate('/verify');
                }else{
                    console.log(res.message);
                }
            })
        }catch(e){
            setPending(false);
            setError({name: "error" , message: e.response.data.message});
            console.log(e);
        }
    }

    return ( 
        <>
        {isPending ? <Loder/> :
        <div className="body">
            
            <div className="background"></div>
                <div className="card">
                    <SchoolIcon className='logo' />
                    <h2>Welcome</h2>    
                    <form className='form' onSubmit={handeleRegister}>
                        <input 
                        type="text"  
                        placeholder='UserName'
                        ref={userRef}
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        className='input-1'
                        required
                        />
                        <input 
                        type="text"  
                        placeholder='Phone or Email'
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        required
                        className='input-1'
                        />
                        <input 
                        type="password"  
                        placeholder='Password'
                        autoComplete= ''
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                        className='input-1'
                        />
                        <input 
                        type="password"  
                        placeholder='Confirm Password'
                        value={confirm}
                        onChange={(e)=> setConfirm(e.target.value)}
                        required
                        autoComplete= ''
                        onFocus={()=> setMatchFocus(true)}
                        onBlur={()=>  setMatchFocus(false)}
                        className='input-1'
                        />
                        {matchFocus && !matchConfirm ? <AlertDismissibleExample   message={"Must match the first password input field"}/> : "" }
                        <button disabled ={!name || !email || !password || !confirm || !matchConfirm }>Sing Up</button>
                    </form>
                    {error.message ? <AlertDismissibleExample name={error.name} errRef={errRef}  message={error.message}/> : "" }
                    <footer>
                        
                        You Already Have an Account ? LogIn
                        <Link style={{color:"rgb(245, 144, 122)"}} to={"/login"}>   here</Link>
                    </footer>
                </div>
            </div>
            }
        </>
     );
}

export default Rigestert;