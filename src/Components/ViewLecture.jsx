import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import MovieIcon from '@mui/icons-material/Movie';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from "@mui/material";
import { Bars } from "react-loader-spinner";
import img1 from "../Assets/images/upload-image1.jpg"
import img2 from "../Assets/images/video.webp"
import img3 from "../Assets/images/add-file1.jpg"
import { Col, Row } from "react-bootstrap";
import AttachmentsCard from "./AttachmentsCard";

const ViewLecture = () => {
    const {id}= useParams();
    const AxiosAuth = useAxiosPrivate();
    const [msg , setMsg] = useState("");
    const navigate = useNavigate();
    const [open , setOpen] = useState(false);
    const [deleteLec , setDeleteLec] = useState(false);
    const [lec,setLec] =useState({video:""});
    const videoRef = useRef(null);
    const [EditLecture ,setEditLecture] = useState(false);
    const [lecture , setLecture] = useState({_method:"PUT",section_id: id});
    const [progress , setProgress]= useState(false);
    const [Addattachment, setAddAttachment] = useState(false);
    const [attachment, setAttachment] = useState({});
    useEffect(()=>{
        const showLecture = async()=>{
            console.log(`/tch/courses/sections/lectures/${id}`);
            await AxiosAuth.get(`/tch/courses/sections/lectures/${id}`).then(response =>{
                const res=response.data
                if(res.success){
                    console.log(res.data);
                    setLec(res.data)
                }
            })
              
        }
     
        showLecture();
        //eslint-disable-next-line
      },[])


    const handelDeleteLecture = async(event) =>{
      event.preventDefault();
      setDeleteLec(true);
      await AxiosAuth.delete(`/tch/courses/sections/lectures/${id}`).then(response =>{
              setMsg("The Lecture has been Deleted");
              setOpen(true);
              setDeleteLec(false);
              navigate(-1);   
      })
      .catch(err =>{
          setMsg(err.response.data.message);
          setOpen(true);
          setDeleteLec(false);
      })
      
    }

    function handleClose(){
        setOpen(false);
        setEditLecture(false);
        setAddAttachment(false);
    }


    const handleEditLecture = async(event)=>{
      event.preventDefault();
      await AxiosAuth.post(`/tch/courses/sections/lectures/${id}`,
          lecture,
          { onUploadProgress : setProgress(true)  , headers:{'Content-Type':'multipart/form-data'}}).then(response =>{
              const res = response.data;
              if(res.success === true){
                  setOpen(true);
                  setMsg(res.message);
                  setProgress(null);
                  setEditLecture(false);
                  setLec(res.data);
              }
          }).catch(err =>{
              console.log(err)
              setOpen(true);
              setMsg(err.response.data.message);
              setProgress(null);
              setEditLecture(false);
          })

    }

    const handleCreateAttachment = async(event)=>{
      event.preventDefault();
      await AxiosAuth.post(`/tch/courses/sections/lectures/${id}/attachments`,
          attachment,
          { onUploadProgress : setProgress(true)  , headers:{'Content-Type':'multipart/form-data'}}).then(response =>{
              const res = response.data;
                  setOpen(true);
                  setMsg("The file has been Added");
                  setProgress(null);
                  setAddAttachment(false);
                //   setLec(res.data);
          }).catch(err =>{
              console.log(err)
              setOpen(true);
              setMsg(err.response.data.message);
              setProgress(null);
              setAddAttachment(false);
          })

    }

    return ( 
        <>

              <div style={{display:"flex",width:"100%", justifyContent:"center",marginTop:"1rem"}}>
                <div className='outer-container-show-course shadow'>
                <div className="outer-section-component" style={{marginBottom:"0"}}>
                        <div className="inner1-section-component">
                            <MovieIcon style={{color:"rgb(245, 144, 122)" ,marginLeft:"0.2rem"}}/>
                            {lec? lec.title:""}
                        </div>
                        <div className="inner2-section-component">
                            <button  className="btn-section-show-edit"  onClick={()=>{setAddAttachment(true)}}> Add Attachments </button>
                            <button  className="btn-section-show-edit" onClick={()=>{setEditLecture(true)}} > Edit </button>
                            <button  className="btn-section-show-edit" onClick={handelDeleteLecture} > {deleteLec?<Bars
                                                                                                            height="25"
                                                                                                            width="25"
                                                                                                            color="rgb(245, 144, 122)"
                                                                                                            ariaLabel="bars-loading"
                                                                                                            visible={true}
                                                                                                            /> : "Delete"} </button>
                        </div>
                    </div>
                </div>
            </div>



            <div style={{display:"flex",width:"100%", justifyContent:"center",marginTop:"1rem"}}>
                <div className='outer-container-show-course shadow'>
                <div className="outer-section-component" style={{marginBottom:"0" , padding:"0"}}>
                  {lec.video?
                        <ReactPlayer
                        
                        width={"110%"}
                        ref={videoRef}
                        light={"http://192.168.137.1:8000/api/image?path="+lec.thumbnail}
                        url={`http://192.168.137.1:8000/storage/${lec.video}`}
                        controls={true}
                        />  
                    :""}
                    </div>
                </div>
            </div>

            <Dialog
                open={EditLecture}
                onClose={handleClose}
                PaperProps={{
                component: 'form',
                }}
                fullWidth
            >
                <DialogTitle>Edit your lecture</DialogTitle>
                <DialogContent>
                        <div style={{display:"flex",justifyContent:"space-around"}}>
                            <div>
                                <div className="app1">
                                    <div className="parent1">
                                        <div className="file-upload1">
                                            <img src={img1} 
                                                alt="upload" 
                                                className="image-upload-file1" 
                                                />
                                                <p>
                                                    The Lecture Photo
                                                </p>
                                            <input type="file" required onChange={(e)=>{setLecture(prev =>{return{...prev , thumbnail:e.target.files[0]}})}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="app1">
                                    <div className="parent1">
                                        <div className="file-upload1">
                                            <img src={img2} 
                                                alt="upload" 
                                                className="image-upload-file1" 
                                                />
                                                <p>
                                                    The Lecture Video
                                                </p>
                                            <input type="file" required onChange={(e)=>{setLecture(prev =>{return{...prev , video:e.target.files[0]}})}} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>
                        <div style={{display:"flex",justifyContent:"center" , width:"100%"}}>
                            <div style={{width:"70%" , marginBottom:"1rem"}}>
                                <label className="label-create-course">Titel :</label>
                                <input type="text" required  className="input-create-course" onChange={(e)=>{setLecture(prev =>{return{...prev , title : e.target.value}})}}/>
                            </div>
                        </div>
                        
                        {progress?
                        <div style={{display:"flex" , justifyContent:"center" ,marginBottom:"1rem"}}>
                            <CircularProgress />
                        </div>
                        
                        :""}
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} className='btn-section-show-edit'>Cancel</button>
                    <button onClick={handleEditLecture} className='btn-section-show-edit' >Edit</button>
                </DialogActions>
            </Dialog>



            <Dialog
                open={Addattachment}
                onClose={handleClose}
                PaperProps={{
                component: 'form',
                }}
                fullWidth
            >
                <DialogTitle>Add Attachments to youre lecture</DialogTitle>
                <DialogContent>
                        <div style={{display:"flex",justifyContent:"space-around"}}>
                            <div>
                                <div className="app1">
                                    <div className="parent1">
                                        <div className="file-upload1">
                                            <img src={img3} 
                                                alt="upload" 
                                                className="image-upload-file1" 
                                                />
                                                {/* <p>
                                                    The attachment
                                                </p> */}
                                            <input type="file" required onChange={(e)=>{setAttachment(prev =>{return{...prev , file:e.target.files[0]}})}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>
                        <div style={{display:"flex",justifyContent:"center" , width:"100%"}}>
                            <div style={{width:"70%" , marginBottom:"1rem"}}>
                                <label className="label-create-course">File Name :</label>
                                <input type="text" required  className="input-create-course" onChange={(e)=>{setAttachment(prev =>{return{...prev , name : e.target.value}})}}/>
                            </div>
                        </div>
                        
                        {progress?
                        <div style={{display:"flex" , justifyContent:"center" ,marginBottom:"1rem"}}>
                            <CircularProgress />
                        </div>
                        
                        :""}
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} className='btn-section-show-edit'>Cancel</button>
                    <button onClick={handleCreateAttachment} className='btn-section-show-edit' >Add</button>
                </DialogActions>
            </Dialog>

            <div style={{display:"flex",width:"100%", justifyContent:"center",marginTop:"2rem"}}>
                <div className='outer-container-show-course shadow'>
                    <h1 className="add-section-h1 ">
                        Attachments
                    </h1>
                    <hr />
                    <Row className="mx-0 mb-5">
                    {lec.attachments?
            
                    lec.attachments.map((e,i)=>{
                        return(
                            <Col lg='4' md='6' xs='12' key={i}> <AttachmentsCard data={e}/></Col>
                        )
                    })
            
                    :""}

{/* <Col lg='4' md='6' xs='12' > <AttachmentsCard /></Col>
<Col lg='4' md='6' xs='12' > <AttachmentsCard /></Col>
<Col lg='4' md='6' xs='12' > <AttachmentsCard /></Col> */}
                        
                    </Row>
                
                </div>
            </div>
            
            
      
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
 
export default ViewLecture;