import React from 'react';
import { Link } from "react-router-dom";
import "./SidBar.css";
import SchoolIcon from '@mui/icons-material/School';
import { DataInnerLinksSideBar, DataLocation } from "../../Assets/Data";
import Links from "./Links";
import InnerLinks from "./InnerLinks";
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { BASE_URL } from '../../API/Axios';


function Sidabar() {

  const {auth , setAuth } = useAuth();
  const baseURL = BASE_URL; 
  const token = auth.accessToken;


  const AxiosAuth = axios.create({
    baseURL: baseURL , 
    headers :{
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  })

  const handelLogout = async (e)=>{

    try{
      
    const response = await AxiosAuth.post('/logout') ;
    console.log(response);
    if(response.status === 204 ){
      console.log('done');
      setAuth({email : "" , password :"" , accessToken :""});
      console.log(auth);
      return  ;
    };
      

    }catch(e){
      console.log(e);
      alert(e.response.data.message)
    }

  }
  
  return (
      <>
        <div className="sidebar-continer ">
          <div className="inner-sideBar shadow">
            <div className="inner-links-container">
              {DataInnerLinksSideBar.map((e,i)=>{
                return(
                  <InnerLinks key={i} e={e}/>
                )
              })}
            </div>
          </div>
          <div className="outer-sidebar">
              <div className="logo-container-sidebar">
                <SchoolIcon className="icon-sidebar"/>
                <h2 className="logo-sidebar">LUMOS</h2>
              </div>

              <div className="Links-container-sidebar">
                  {DataLocation.map((data,i)=>{
                    return(
                      <Links key={i} e={data}/>
                    )
                  })}
                  
              </div>
              <div className="logout-container ">
                <Link to={"/"} onClick={handelLogout} className='logout-button'>Logout</Link>
              </div>
          </div>
        </div>
      </>
    );
}

export default Sidabar;