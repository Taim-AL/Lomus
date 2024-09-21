import { Snackbar } from "@mui/material";
import "../Assets/css/Comments.css";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { Bars } from "react-loader-spinner";
import CommentCard from "./CommentCard";
import { BASE_URL } from "../API/Axios";

const Comments = ({id , comments}) => {
    const [Comment , setComments] = useState("");
    const [AddComment , setAddComment] = useState(false);
    const [open,setOpen] = useState(false);
    const [msg,setMsg] = useState("");
    const baseURL = BASE_URL; 
    const AxiosAuth = useAxiosPrivate();

    const handleAddComment =async(event) =>{
        event.preventDefault();
        setAddComment(true)
        await AxiosAuth.post(`/tch/courses/${id}/comments`,{content:Comment}).then(response =>{
            const res = response.data
            if(res.success){
                setAddComment(false);
                setMsg(res.message);
                setOpen(true);
                setComments("");
            }
        }).catch(err =>{
            console.log(err);
            setAddComment(false);
            setMsg(err.response.data.message);
            setOpen(true);
        })
    }

    function handleClose(){
        setOpen(false);
    }

    return ( 
        <>

        <div className="card-blank-quizz  mt-3" >
            
            <div className="inner-blank-card" style={{border:"2px solid #fff",height:"13rem",overflowY:"scroll"}}>

                {comments?
                    comments.map((e,i)=>{
                        return(
                            <CommentCard comment={e} key={i} image={baseURL+"/image?path="+e.owner.photo}/>
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

            </div>
            <div style={{display:"flex",justifyContent:"end"}}>
                <textarea type="text" value={Comment} placeholder="New Comment" className="input-add-comment" onChange={(e)=>{setComments(e.target.value)}}></textarea>
                <div style={{position:"absolute"}}>
                    <button className="btn-add-comment" onClick={handleAddComment}>
                    {AddComment?<Bars
                                    height="25"
                                    width="25"
                                    color="rgb(245, 144, 122)"
                                    ariaLabel="bars-loading"
                                    visible={true}
                                    /> : <SendIcon/>}
                    </button>
                </div>
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
 
export default Comments;