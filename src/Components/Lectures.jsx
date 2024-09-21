import { useState } from "react";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import AddIcon from '@mui/icons-material/Add';
import img1 from "../Assets/images/upload-image1.jpg"
import img2 from "../Assets/images/video.webp"
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from "@mui/material";
import LectureCard from "./LectureCard";
import { Bars } from "react-loader-spinner";
import { Col, Row } from "react-bootstrap";
import { BASE_URL } from "../API/Axios";


const Lectures = ({id , lectures}) => {
    const [lecture , setLecture] = useState({});
    const [addLecture , setAddLecture] = useState(false);
    const [progress , setProgress] = useState(false);
    const [msg,setMsg]=useState("");
    const [openSnackbar,setOpenSnackbar]=useState(false);
    const baseURL = BASE_URL; 
    const AxiosAuth = useAxiosPrivate();

    const handelCreateLecture = async(event)=>{
        event.preventDefault();
        console.log(lecture);
        await AxiosAuth.post(`/tch/courses/sections/${id}/lectures`,
            lecture,
            { onUploadProgress : setProgress(true)  , headers:{'Content-Type':'multipart/form-data'}}).then(response =>{
                const res = response.data;
                if(res.success === true){
                    setOpenSnackbar(true);
                    setMsg(res.message);
                    setProgress(null);
                    setAddLecture(false);
                }
            }).catch(err =>{
                console.log(err)
                setOpenSnackbar(true);
                setMsg(err.response.data.message);
                setProgress(null);
                setAddLecture(false);
            })

      }

      function handleClose(){setAddLecture(false); setOpenSnackbar(false);}

    return ( 
        <>
                    <h1 className="add-section-h1 ">
                        Lectures
                    </h1>
                    <hr />
                    
                    {lectures?

                        <Row className='mx-0' >

                            {
                                lectures.map((e,i)=>{
                                    return(
                                    <Col lg='4' md='6' sx='12' className='mt-1' key={i}>
                                        <LectureCard  lec={e} thumb={baseURL+"/image?path="+e.thumbnail}/>
                                    </Col>
                                )
                                })
                            }

                        </Row>

                    :
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}><Bars
                            height="50"
                            width="50"
                            color="rgb(245, 144, 122)"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            /></div>
                    }
                    
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <button onClick={()=>{setAddLecture(true)}} style={{border:"none" , width:"50%"}} >
                            <div className="bottun-add-section">
                                <AddIcon className="add-section-icon"/>
                            </div>
                        </button>
                    </div>
                {/* </div>
            </div>     */}

                    <Dialog
                        open={addLecture}
                        onClose={handleClose}
                        PaperProps={{
                        component: 'form',
                        }}
                        fullWidth
                    >
                        <DialogTitle>Create your lecture</DialogTitle>
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
                                    {progress}
                                </div>
                                
                                :""}
                        </DialogContent>
                        <DialogActions>
                            <button onClick={handleClose} className='btn-section-show-edit'>Cancel</button>
                            <button onClick={handelCreateLecture} className='btn-section-show-edit' >Create</button>
                        </DialogActions>
                    </Dialog>

            {
                msg && <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={handleClose}
                message={msg}
                />
            } 
        </>
     );
}
 
export default Lectures;