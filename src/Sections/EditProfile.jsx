import { useState } from "react";
import "../Assets/css/EditProfile.css"
import useAxiosPrivate from "../Components/hooks/useAxiosPrivate";
import axios from "axios";
import useAuth from "../Components/hooks/useAuth";
import uploadImg from '../Assets/images/upload-image1.jpg'
import DeleteIcon from '@mui/icons-material/Delete';
import { Col, Row } from "react-bootstrap";
import image1 from "../Assets/images/account-null.png"
import DoneIcon from '@mui/icons-material/Done';
import { Dialog, Snackbar, TextField } from "@mui/material";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../API/Axios";

function EditProfile() {
    const {token} = useAuth();
    const baseURL = BASE_URL; 
    const prevData  = JSON.parse(localStorage.getItem('userInfo'));
    const [changedData , setChangedData] = useState(JSON.parse(localStorage.getItem('userInfo')));
    const [prevImage ,setPrevImage] =useState(changedData?.photo ?baseURL+"/image?path="+changedData?.photo :image1);
    const [postImage ,setPostImage] =useState(null);
    const [open , setOpen ] = useState(false);
    const [open2 , setOpen2 ] = useState(false);
    const [open3 , setOpen3 ] = useState(false);
    const [openD , setOpenD ] = useState(false);
    const [msg, setMsg] = useState(null);
    const [oldPwd, setOldPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [newContact, setNewContact] = useState("");
    const [load1, setLoad1] = useState(false);
    const [load2, setLoad2] = useState(false);
    const  {setAuth}  = useAuth();
    const AxiosAuth = useAxiosPrivate();
    const Navigate = useNavigate();
    


    function handelChange(e) {
        if(e.target.files[0]){
        setChangedData(prev =>{ return{...prev , photo:e.target.files[0]}})
        setPostImage(e.target.files[0])
        }else{
        setChangedData(prev =>{ return{...prev , photo:prevData.photo}})
        }
        setPrevImage(URL.createObjectURL(e.target.files[0]));
        console.log("my changed data :", changedData);
    }

    const   handelSub = async  (event) => {
        event.preventDefault();
        
        setMsg("Uploading......");
        setOpen(true);
        setOpen3(true);
        await axios.post(`${BASE_URL}/teacher-info`,{photo : postImage, name:changedData.name , bio : changedData.bio , _method: "PUT" } ,{
            headers : {
                Authorization : `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        }).then(res =>{
            setMsg("Upload successful ");
            localStorage.setItem('userInfo' , JSON.stringify(changedData));
            console.log(res.data);
            setOpen3(false);
        })
        .catch(err =>{
            setMsg("Upload failed ");
            console.log(err);
            setOpen3(false);
        });
    }
    
    const profileData =[
        {
           key :changedData?.phone_number? "Phone :" : "Email :",
           value : changedData?.phone_number? changedData?.phone_number:changedData?.email
        },
        {
           key : "Bio :" ,
           value : changedData?.bio
        },
     ]

     function handleClose (){
        setOpenD(false)
        setOpen(false);
     }

     function handleClose2(){
        setOpen2(false)
     }

     const handelDelImage =async (event) =>{
        event.preventDefault();
        await AxiosAuth.delete('/teacher-info/image').then(response =>{
            if(response.data.success === true){setOpen2(true)}
        })
        .catch(err =>{
            console.log(err);
        })
     }

     function handelDelImage1 (){
        setOpenD(true)
     }

     const handelChangePassword = async(event) =>{
        event.preventDefault();
        setLoad1(true);
        await AxiosAuth.post("/change-password",{old_password: oldPwd , new_password:newPwd}
        ).then(response =>{
            const res = response.data;
                setOldPwd("");
                setOpen(true);
                setNewPwd("");
                setLoad1(false);
                setMsg(res.message);
                setAuth(prev =>{
                    return{
                        ...prev,
                        password : newPwd,
                    }
                });
        }).catch(err =>{
            console.log(err)
            setOpen(true);
            setLoad1(false);
            setOldPwd("");
            setNewPwd("");
            setMsg(err.response.data.message);
        })
     }


     const handelChangeContact = async(event) =>{
        event.preventDefault();
        // setOpen(true);
        setLoad2(true);
        await AxiosAuth.post("/teacher/change-contact",{contact: newContact}
        ).then(response =>{
            const res = response.data;
                setOpen(true);
                setLoad2(false);
                setNewContact("");
                setMsg(res.message);
                setAuth(prev =>{
                    return{
                        ...prev,
                        email : newContact ,
                    }
                });
                Navigate('/changeContact');
        }).catch(err =>{
            console.log(err)
            setOpen(true);
            setLoad2(false);
            setNewContact("");
            setMsg(err.response.data.message);
        })
     }

    return ( 
        <>
            <Row className="mx-0"> 
                <Col md='6'>
                    <h1 className="titel-edit-profile">edit profile</h1>
                    <form onSubmit={handelSub}>
                    <div className="outer-edit-file-component">
                        <div className="inner-edit-profile-component shadow">
                                <div className="app">
                                    <div className="parent">
                                        <div className="file-upload">
                                        <img src={uploadImg} 
                                            alt="upload" 
                                            className="image-upload-file" 
                                            
                                            />
                                            <p>
                                                Change your image
                                            </p>
                                        <input type="file" onChange={e =>handelChange(e) }  />
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            
                            <div className="change-otherInfo-container">
                                <TextField 
                                // id="standard-basic" 
                                label="Name" 
                                variant="standard"
                                color="secondary"
                                type="text"
                                onChange={e => {e.target.value?
                                    setChangedData(prev =>{ return{...prev , name:e.target.value}})
                                : setChangedData(prev =>{ return{...prev , name:prevData.name}})
                            
                                console.log("my change name :" , changedData?.name);}
                            }
                                className="input-change-info"
                                />
                                <TextField 
                                id="standard-basic" 
                                label="Bio" 
                                variant="standard"
                                color="secondary"
                                type="text"
                                onChange={e => e.target.value?
                                    setChangedData(prev =>{ return{...prev , bio:e.target.value}})
                                : setChangedData(prev =>{ return{...prev , bio:prevData.bio}})}
                                className="input-change-info"
                                />
                                
                            </div>
                            
                            <button className="delete-image-button mb-3">
                                {open3 ?<Bars
                                                    height="30"
                                                    width="30"
                                                    color="rgb(245, 144, 122)"
                                                    ariaLabel="bars-loading"
                                                    visible={true}
                                                    /> : "Change"}
                            </button>
                        </div>
                    </div>
                    </form>
                    <div className="d-flex justify-content-center mt-3">
                        <button className="delete-image-button" onClick={handelDelImage1}>
                            Delete your image<DeleteIcon className="delete-image-icon"/>
                        </button>
                        <Dialog
                        fullWidth={true}
                        maxWidth={'xs'}
                        open={openD}
                        onClose={handleClose}
                        style={{borderRadius:"30px"}}
                            >
                            <div className="container-empty-image">
                            <img src={image1} alt="" className="empty-image shadow w-25"/>
                            </div>  
                            <p style={{textAlign:"center" , color:"#333649"}}>
                            Do you want to delete your  account photo?
                            </p>
                            <div style={{display:"flex" , justifyContent:"center" , marginBottom:"1rem"}}>
                                <button onClick={handelDelImage} className="delete-image-button">
                                    {open2 ? <DoneIcon/>:"Delete"}
                                </button>
                            </div>
                            <Snackbar
                            open={open2}
                            autoHideDuration={5000}
                            onClose={handleClose2}
                            message="The Photo has been deleted "
                            />
                        </Dialog>
                    </div>
                </Col>
                <Col md='6'>
                <h1 className="titel-edit-profile " >My information</h1>
                <div className="outer-edit-file-component">
                        <div className="inner-edit-profile-component shadow">
                                <div className="app">
                                    <div className="parent">
                                        <div className="file-upload">
                                        <img src={prevImage === null?image1 :prevImage } 
                                            alt="upload" 
                                            className="image-upload-file" 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="userName-profile">
                                    {changedData?.name}
                                </h3>
                            <div className="otherInfo-teacher-container">
                            {profileData.map((e ,i)=>{
                                return(
                                    <p className="p-profile-about text-center " style={{marginTop:"0.5rem"}} key={i}>
                                        <span className="span-profile-1">
                                            {e.key} 
                                        </span>
                                        {e.value}
                                    </p>
                                )
                                })}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <hr/>
            <Row className="mx-0">
                <Col md='6'>
                    <div className="mt-3 outer-change-password-component shadow">
                        <h3 className="change-password-title">
                            Change Your Password
                        </h3>
                        <form onSubmit={handelChangePassword}>
                            <Row className="mx-0">
                                <Col md='8' xs="12">
                                    <TextField 
                                    id="standard-basic" 
                                    label="Old Password" 
                                    value={oldPwd}
                                    variant="standard"
                                    color="secondary"
                                    type="password"
                                    required
                                    className="input-change-info w-100"
                                    onChange={e=>{setOldPwd(e.target.value)}}
                                    />
                                    <TextField 
                                    id="standard-basic" 
                                    label="New Password" 
                                    variant="standard"
                                    value={newPwd} 
                                    color="secondary"
                                    type="password"
                                    required
                                    className="input-change-info w-100"
                                    onChange={e=>{setNewPwd(e.target.value)}}
                                    />
                                </Col>
                                <Col md="4" xs='12' style={{display:"flex" , justifyContent:"center" , alignItems:"center"}}>
                                    <button className="change-dassword-btn mt-3">
                                        {load1 ? <Bars
                                                height="30"
                                                width="30"
                                                color="rgb(245, 144, 122)"
                                                ariaLabel="bars-loading"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                                visible={true}
                                                />:"Change"}
                                    </button>                                    
                                </Col>    
                            </Row>
                            
                        </form>
                    </div>
                </Col>
                <Col md='6'>
                    <div className="mt-3 outer-change-password-component shadow ">
                        <h3 className="change-password-title">
                            Change Your Contact
                        </h3>
                        <form onSubmit={handelChangeContact}>
                            <Row className="mx-0">
                                    <Col md='8' xs="12">
                                        <TextField 
                                        id="standard-basic" 
                                        label="New Contact" 
                                        variant="standard"
                                        color="secondary"
                                        value={newContact}
                                        type="text"
                                        className="input-change-info w-100"
                                        onChange={e =>{setNewContact(e.target.value)}}
                                        />
                                    </Col>
                                    <Col md="4" xs='12' style={{display:"flex" , justifyContent:"center" , alignItems:"center"}}>
                                        <button className="change-dassword-btn mt-3">
                                            {load2 ? <Bars
                                                    height="30"
                                                    width="30"
                                                    color="rgb(245, 144, 122)"
                                                    ariaLabel="bars-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass=""
                                                    visible={true}
                                                    />:"Change"}
                                        </button>                                    
                                    </Col>    
                                </Row>
                        </form>
                    </div>
                </Col>
            </Row>
            {
                msg && <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={msg}
                        />
            }            

        </>
     );
}

export default EditProfile;