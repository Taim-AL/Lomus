import imag1 from "../Assets/images/upload-image1.jpg"
import "../Assets/css/CreateCourse.css"
import { Col, Row } from "react-bootstrap";
import { inputsDataCreateCourse } from "../Assets/Data";
import { FormControlLabel, Radio, RadioGroup, Snackbar } from "@mui/material";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";


const UpdateCourse = () => {
    const  [postPhoto ,setPostPhoto] = useState(null);
    const [open ,setOpen]=useState(true);
    const [msg ,setMsg]=useState("");
    const [loading ,setloading]=useState(false);
    const [selectedPhoto , setSelectedPhoto] = useState(null);
    const [courseInfo, setCourseInfo] = useState({_method:"PUT",tags:[]});
    const AxiosAuth = useAxiosPrivate();
    const navigate = useNavigate();
    const {id} = useParams();
        
    const handelCreateCousre = async (event)=> {
        event.preventDefault();
        setloading(true);
        try{
        await AxiosAuth.post(`/tch/courses/${id}`,courseInfo,{headers:{"Content-Type" : 'multipart/form-data'}}).then(response =>{
            console.log(response.data);
            setloading(false); 
            setMsg("The Course has been Updated");
            setCourseInfo({});
            navigate(-1);
        })
        }catch(err){
            setloading(false); 
            setMsg(err.response.data.message);
            console.log(err);
        }
    }

    const handelSetTheImage = (e) =>{
        
        setPostPhoto(e.target.files[0]);
        setSelectedPhoto(e.target.files[0]); 
    }

    useEffect(()=>{
       if(postPhoto){
        setCourseInfo(prev => ( {...prev , photo : postPhoto } ) );
       }
    },[postPhoto])

    function handelAddTag(e,i){
        const newTags = courseInfo.tags;
        newTags[i] = e;
        setCourseInfo(prev => {
        return { ...prev, tags: newTags }; 
        });
        console.log(courseInfo.tags);
    }

    function handleClose(){
        setOpen(false);
    }

    return ( 
        <>
        <form onSubmit={handelCreateCousre}>
            <div className="container-outer-create-course ">
                
                <div className="app1">
                    <div className="parent1">
                        <div className="file-upload1">
                            <img src={selectedPhoto ? URL.createObjectURL(selectedPhoto) : imag1} 
                                alt="upload" 
                                className="image-upload-file1" 
                                />
                                {
                                    selectedPhoto? "" : 
                                <p>
                                    The Course Photo
                                </p>
                                }
                            <input type="file"  onChange={(e) => handelSetTheImage(e)}/>
                        </div>
                    </div>
                </div>

                <Row className="mx-0">
                    {inputsDataCreateCourse.map((e,i)=>{
                        return(
                            <Col md='6' xs='12' key={i} style={{marginTop:"0.5rem"}}>
                                <label className="label-create-course">{ e.placeholder}</label>
                                <input type="text"  onChange={event => setCourseInfo(prev=>{return({...prev , [e.proberty]:event.target.value})})}  className="input-create-course"/>
                            </Col>
                        )
                    })}

                    <Col md='12'>
                        <label className="label-create-course">Description :</label>
                        <textarea value={courseInfo?.description}  onChange={e => setCourseInfo(prev=>{return({...prev , description:e.target.value})})} className="input-create-course"> </textarea>
                    </Col>

                    {
                    [...Array(5)].map((e,index)=>{
                        return(
                            <Col md='4' key={index}>
                                <label className="label-create-course">Tag {index+1}:</label>
                                <input   onChange={e=> handelAddTag(e.target.value , [index])} type="text" className="input-create-course" />
                            </Col>
                        )
                    })
                    }
                    <Col md='6'>
                            <label className="label-create-course mt-3">For Child :</label>
                            <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            >
                                <div style={{display:"flex"}}>
                                    <FormControlLabel  value="1" onChange={e => setCourseInfo(prev=>{return({...prev , for_child:e.target.value})})} control={<Radio />} label="Yes" />
                                    <FormControlLabel  value="0" onChange={e => setCourseInfo(prev=>{return({...prev , for_child:e.target.value})})} control={<Radio />} label="No" />
                                </div>
                        </RadioGroup>
                    </Col>

                    <Col md='6' style={{display:"flex" , justifyContent:"center" , alignItems:"center"}}>
                        <button className="button-create-course">
                            {loading ?<Bars
                                        height="30"
                                        width="30"
                                        color="rgb(245, 144, 122)"
                                        ariaLabel="bars-loading"
                                        visible={true}
                                        />:"Update"}
                        </button>
                    </Col>
                </Row>

            </div>
        </form>
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
 
export default UpdateCourse;