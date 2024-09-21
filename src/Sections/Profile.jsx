import { Col, Row } from "react-bootstrap";
import image1 from "../Assets/images/account-null.png"
import emptyImage from "../Assets/images/empty1.png"
import "../Assets/css/Profile.css"
import TagIcon from '@mui/icons-material/Tag';
import { ResponsiveContainer } from "recharts";
import PieActiveArc from "../Components/Chart";
import VerticalLinearStepper from "../Components/Steper";
import { Link } from "react-router-dom";

// icons 
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import LinkIcon from '@mui/icons-material/Link';
import AutoFixHighTwoToneIcon from '@mui/icons-material/AutoFixHighTwoTone';
import { Avatar, Chip, Dialog, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../Components/hooks/useAxiosPrivate";
import DeleteAccount from "../Components/DeleteAccount";
import { Bars } from "react-loader-spinner";
import { BASE_URL } from "../API/Axios";



const Profile = () => {

   const [imageURL , setImageURL] = useState("");
   const [account , setAccount] = useState("");
   const AxiosAuth = useAxiosPrivate();
   const userInformation = JSON.parse(localStorage.getItem('userInfo'));
  const baseURL = BASE_URL; 
  const [topProfits , setTopProfits] = useState();

  useEffect(()=>{
      const getInfo = async()=>{
          await AxiosAuth.get(`/dashboard`).then(response =>{
              const res=response.data
              if(res.success){
                  // setLec(res.data)
                  console.log("info :",res.data);
                  setTopProfits(res.data.topProfits)
                  
              }
          })
            
      }
   
      getInfo();
      //eslint-disable-next-line
    },[])


useEffect(()=>{
   const getUserInfo = async()=>{
     try{
       const response = await AxiosAuth.get('/teacher-info')
         const res = response.data;
         console.log("my INfo :",res.data);
         localStorage.setItem('userInfo' , JSON.stringify(res.data));
         
         if(res.success === true){
            if(res.data.photo){
               setImageURL(baseURL+"/image?path="+res.data.photo);
            }else{
               setImageURL(image1)
            }
         }
     
     }catch(e){
       console.log(e)
     }
   }

   getUserInfo();
   //eslint-disable-next-line
 },[])


   const data =[
      {
         key :userInformation?.phone_number? "Phone :" : "Email :",
         value : userInformation?.phone_number? userInformation?.phone_number :userInformation?.email
      },
      {
         key : "Bio :" ,
         value : userInformation?.bio
      },
   ]
   const [open , setOpen ] =useState(false);
   const [open2 , setOpen2 ] =useState(false);

   function handelEditAccounts(){
      setOpen(true);
   }

   function handleClose(){
      setOpen(false);
   }
   
   function handleClose2(){
      setOpen2(false);
   }



   const handelAddAccount = async( event) =>{
      event.preventDefault();
      try{
         await AxiosAuth.post('/teacher-info/social-account',{link : account}).then(response =>{
            const res = response.data;
            if(res.success === true){
               setOpen2(true);
            }
         })
      }catch(err){
         console.log(err)
      }
   }

    return ( 
        <>
         <Dialog
         fullWidth={true}
         maxWidth={'xs'}
         open={open}
         onClose={handleClose}
         style={{borderRadius:"30px"}}
            >
            <h3 className="edit-accounts-profile mb-4 " >
               Edit Accounts
            </h3>
            <div className="outer-Add-Account">
               <form className="container-add-account shadow" onSubmit={handelAddAccount}>
                  <input type="text" 
                  placeholder="add account"
                  required
                  onChange={e=>{setAccount(e.target.value)}}
                  className="input-add-account"
                  />
                  <button className="btn-add-account">add</button>
               </form>
            </div>
            {
            !userInformation.accounts[0]
            ? 
            <div className="container-empty-image">
               <img src={emptyImage} alt="" className="empty-image"/>
            </div>
            : 
            userInformation?.accounts.map((e,i)=>{
               return(
                     <DeleteAccount e={e}  key={i}/>
               )})}  
            <Snackbar
            open={open2}
            autoHideDuration={5000}
            onClose={handleClose2}
            message="The link has been added "
            />
         </Dialog>
         <Row className="mx-0 p-3" >
            <Col lg='8' md='12' >
            <ResponsiveContainer style={{display:"flex" , justifyContent:"center"  , width:"100%" }}>
               <div className="outer-profile shadow w-100">
                  <div className="editButton-container">
                     <Link to={'/home/editProfile'} className="editProfile-button"> 
                        <AutoFixHighTwoToneIcon className="icon-edit-profile"/> 
                     </Link>
                  </div>
              <Row className="mx-0">
               <Col md='4' xs='12' className="container-image-profile">
                  <div className="inner-container-avatar-profile">
                     <Avatar src={imageURL} alt="profile avatar"  className="avatar-profile"/>
                  </div>
               </Col>
               <Col md='8' xs='12' className="container-profile">
                  <div className="inner-container-profile">
                     <h3 className="userName-profile mt-4">
                        {userInformation?.name}
                     </h3>
                        {data.map((e ,i)=>{
                           return(
                              <p className="p-profile-about" key={i}>
                                 <span className="span-profile-1 mt-3">
                                    {e.key} 
                                 </span>
                                 {e.value}
                              </p>
                           )
                        })}
                        <div className="p-profile-about">
                           <span className="span-profile-1">
                              Top Tags : 
                           </span>
                           {
                              userInformation?.top_tags.map((e,i)=>{
                                 return(
                                 <Chip key={i} icon={<TagIcon  className="tag-icon-profile"/>} label={e.name} className="chip-tag" size="small" />
                                 )
                              })
                           }
                        </div>

                  </div>
               </Col>
              </Row> 
              </div>
              </ResponsiveContainer>
            </Col>
            <Col lg='4' md='12' className="outer-rechart-container shadow">
               <ResponsiveContainer style={{display:"flex" , justifyContent:"center" , alignItems:"center" , width:"100%" }}>
                  {
                     topProfits?
                        <PieActiveArc topProfits={topProfits}/>
                     :<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}><Bars
                     height="50"
                     width="50"
                     color="rgb(94, 105, 202)"
                     ariaLabel="bars-loading"
                     wrapperStyle={{}}
                     wrapperClass=""
                     visible={true}
                     /></div>
                  }
               </ResponsiveContainer>
            </Col>
            <Col md="8">
               <ResponsiveContainer className="outer-top-cours shadow">
                  <h3 className="userName-profile mb-3">
                     Top Courses
                  </h3>
                  {topProfits?
                     <VerticalLinearStepper steps={topProfits}/>
                  :<div style={{display:"flex",justifyContent:"center",alignItems:"center" , marginTop:"5rem"}}><Bars
                  height="50"
                  width="50"
                  color="rgb(94, 105, 202)"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  /></div>
                  
                  
                  }
                  
               </ResponsiveContainer>
            </Col>
            <Col md="4">
               <div className="outer-accounts-container shadow">
               <div className="editButton-container">
                     <Link onClick={handelEditAccounts}  className="editMyAccounts-button"> 
                        <AutoFixHighTwoToneIcon className="icon-edit-my-accounts"/> 
                     </Link>
                  </div>
                  <h3 className="userName-profile mb-4 " style={{color:"#fff"}}>
                     My Accounts
                  </h3>
                     {
                        !userInformation.accounts[0]
                        ? 
                        <div className="container-empty-image">
                           <img src={emptyImage} alt="" className="empty-image"/>
                        </div>
                        : 
                        
                        userInformation?.accounts.map((e,i)=>{
                           return(
                              <div className="li-accouts-profile" key={i}>
                                    {
                                       e.type === 'facebook' ? <FacebookOutlinedIcon className="accounts-icons"/> 
                                       :e.type === 'instagram' ? <InstagramIcon className="accounts-icons"/>
                                       :e.type === 'telegram' ? <TelegramIcon className="accounts-icons"/>
                                       :e.type === 'whatsApp'? <WhatsAppIcon className="accounts-icons"/> 
                                       :e.type === 'github'? <GitHubIcon className="accounts-icons"/> 
                                       :e.type === 'youTube'? <YouTubeIcon className="accounts-icons"/> 
                                       :e.type === 'x'? <XIcon className="accounts-icons"/> 
                                       : <LinkIcon className="accounts-icons"/>
                                    }
                                    <p >
                                       <Link href={e.link} className="a-accounst-profile">
                                          {
                                          e.type ? e.type : "Link"
                                          }
                                       </Link>
                                    </p>
                              </div>
                           )
                        })
                     }
                  
               </div>
            </Col>
         </Row>

         
        </>
     );
}
 
export default Profile;