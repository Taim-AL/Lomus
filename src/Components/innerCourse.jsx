import { useEffect, useState } from "react";
import { Link , useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import "../Assets/css/ShowCourse.css";
import {  BottomNavigation, BottomNavigationAction, Chip, Rating, Snackbar } from "@mui/material";
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import TagIcon from '@mui/icons-material/Tag';
import AirplayIcon from '@mui/icons-material/Airplay';
import AutoFixHighTwoToneIcon from '@mui/icons-material/AutoFixHighTwoTone';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import Sections from "./Sections";
import DiscountIcon from '@mui/icons-material/Discount';
import { Bars } from "react-loader-spinner";
import Coupons from "./Coupons";
import Comments from "./Comments";
import { BASE_URL } from "../API/Axios";


const InnerCourse = () => {
    const { id } = useParams();
    const [course , setCourse] = useState({});
    const [coupons , setCoupons] = useState();
    const [comments , setComments] = useState();
    const [msg,setMsg]= useState("")
    const [open , setOpen] = useState(false);
    const AxiosAuth = useAxiosPrivate();
    const [value, setValue] = useState('details');
    const navigate = useNavigate();
    useEffect(()=>{
        const getCourse = async()=>{
          try{
            const response = await AxiosAuth.get(`/tch/courses/${id}`)
              const res = response.data;
              if(res.success === true){
                 setCourse(res.data);
              }
          
          }catch(e){
            console.log(e)
          }
        }
     
        getCourse();
        //eslint-disable-next-line
      },[])

      useEffect(()=>{
        const getCoupons = async()=>{
          try{
            const response = await AxiosAuth.get(`/tch/courses/${id}/coupons`)
              const res = response.data;
              if(res.success === true){
                 setCoupons(res.data);
                 console.log('coupons :', res.data);
              }
          
          }catch(e){
            console.log(e)
          }
        }
     
        getCoupons();
        //eslint-disable-next-line
      },[])

      useEffect(()=>{
        const getComments = async()=>{
          try{
            const response = await AxiosAuth.get(`/tch/courses/${id}/comments`)
              const res = response.data;
              if(res.success === true){
                 setComments(res.data);
                 console.log('comments :', res.data);
              }
          
          }catch(e){
            console.log(e)
          }
        }
     
        getComments();
        //eslint-disable-next-line
      },[])

      const handelPublish = async(event) =>{
        event.preventDefault();
        await AxiosAuth.put(`/tch/courses/${id}/publish`).then(response =>{
            const res = response.data;
            if(res.success === true){
                setMsg("The Course has been published");
                setOpen(true);
            }
        })
        .catch(err =>{
            setMsg(err.response.data.message);
            setOpen(true);
        })
      }

      const handelDeleteCourse = async(event) =>{
        event.preventDefault();
        await AxiosAuth.delete(`/tch/courses/${id}`).then(response =>{
                setMsg("The Course has been Deleted");
                setOpen(true);
                navigate(-1);   
        })
        .catch(err =>{
            setMsg(err.response.data.message);
            setOpen(true);
        })
        
      }

      function handleClose(){
        setOpen(false);
    }

    const baseURL = BASE_URL; 
    const coursePhoto = baseURL+"/image?path="+course.photo;
    
      const courseData = [{key : "Is Publish : " , value : course.for_child ? "Yes":"No"},{key : "Title : " , value : course.title},{key : "Cost : " , value : course.cost +"$"},
      {key : "Description : " , value : course.description},{key : "Requirements : " , value : course.requirements},
      {key : "Is It For Child : " , value : course.published_at ? "Yes":"No"},]

    return ( 
        <>
            <div style={{display:"flex",width:"100%", justifyContent:"center",marginTop:"1rem"}}>
                <div className='outer-container-show-course shadow'>
                    <div className="editButton-container">
                        <Link to={`/home/courses/editCourse/${course?.id}`} className="editProfile-button mt-2"> 
                            <AutoFixHighTwoToneIcon className="icon-edit-profile" style={{color:"rgb(245, 144, 122)"}}/> 
                        </Link>
                    </div>
                    <div style={{position:"absolute" , marginTop:"1rem" , marginLeft:"1rem"}}>
                        {course.rate?
                        <Rating name="read-only" value={course.rate} precision={0.5} readOnly />
                        :""}
                    </div>
                    <img src={coursePhoto} alt=""  className=" course-image-show-course "/>
                    
                    <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    >
                    <BottomNavigationAction label="Details" value='details' icon={<SettingsSuggestOutlinedIcon />} />
                    <BottomNavigationAction label="Contents" value='contents' icon={<AirplayIcon />} /> 
                    <BottomNavigationAction label="Comments" value='comments' icon={<ChatOutlinedIcon />} />
                    <BottomNavigationAction label="Coupons" value='coupons' icon={<DiscountIcon />} />
                    </BottomNavigation>
                    
                    {
                        value === "details" ?
                        
                        <div className="outer-course-details">
                                {course.title?
                                courseData.map((e,i)=>{
                                    return(
                                        <div key={i}  >
                                            <h3 className="key-show-course">
                                                {e.key}
                                                <span className="value-show-course">
                                                    {e.value}
                                                </span>
                                            </h3>
                                        </div>
                                    )
                                })
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
                            {
                                    course.tags?
                            <div className="p-profile-about">
                                <span className="key-show-course">
                                    Tags :  
                                </span>
                                
                                    {course?.tags.map((e,i)=>{
                                        return(
                                        <Chip key={i} icon={<TagIcon  className="tag-icon-profile"/>} label={e.name} className="chip-tag" size="small" />
                                        )
                                    })}
                            </div>
                            :""
                        }
                            <div className="delete-publish-course-container">
                                <button className="delete-course-btn" onClick={handelDeleteCourse}>Delete Course <DeleteOutlineOutlinedIcon/></button>
                                {
                                    !course.published_at?<button className="publish-course-btn" onClick={handelPublish}>Publish Course <PublicOutlinedIcon/></button> : ""
                                }
                                
                            </div>
                        </div>
                        :value === "contents" ?
                        <Sections id={id} allSections={course.sections}/>
                        :value ==="coupons"?
                            <Coupons id={id} coupons={coupons}/>
                        :value ==="comments"?
                        <Comments id={id} comments={comments}/>
                        
                        :""
                    }
                    
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
};

export default InnerCourse;
