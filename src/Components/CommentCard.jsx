import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from "react";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { Bars } from "react-loader-spinner";

const CommentCard = ({comment , image}) => {
    const [content,setConntent] = useState(comment.content);
    const [EditComment,setEditComment] = useState(false);
    const [loading,setLoading] = useState(false);
    const [DeleteComment,setDeleteComment] = useState(false);
    const [deleted,setDeleted] = useState(false);
    const [open,setOpen] = useState(false);
    const [msg , setMsg] = useState("");
    const AxiosAuth = useAxiosPrivate();

    function handleClose(){
        setEditComment(false);
        setDeleteComment(false);
        setOpen(false);
    }

    const handleUpdateComment =async(event) =>{
        event.preventDefault();
        setLoading(true);
        await AxiosAuth.post(`/tch/courses/comments/${comment.id}`,{content:content,_method:"PUT"}).then(response =>{
            const res = response.data
            if(res.success){
                console.log(res);
                setLoading(false);
                setEditComment(false);
                setMsg(res.message);
                setOpen(true);
                setDeleted(true);
            }
        }).catch(err =>{
            console.log(err);
            setEditComment(false);
            setMsg(err.response.data.message);
            setOpen(true);
        })
    }

    const handleDeleteComment =async(event) =>{
        event.preventDefault();
        setLoading(true);
        await AxiosAuth.delete(`/tch/courses/comments/${comment.id}`).then(response =>{
                setLoading(false);
                setDeleteComment(false);
                setMsg("Comment deleted successfully");
                setOpen(true);
        }).catch(err =>{
            console.log(err);
            setEditComment(false);
            setMsg(err.response.data.message);
            setOpen(true);
        })
    }
    
    return ( 
        <>
        {deleted ?""
        :
        <div>
        {
            comment.owner_type === "student"?
                
            <div className="outer-comment-container">
                <div style={{display:"flex" }}>
                    <Avatar style={{marginRight:"1rem" , border:`2px solid ${comment.owner.color}`}} sx={{ width: 50, height: 50 }} alt="Profile Picture" src={image} />
                    
                    <div>    
                        <h6 className="h3-comments-name">{comment.owner.name}</h6>
                        <p className="p-comments-content">
                            {comment.content}
                        </p>
                    </div>
                    
                </div>
            </div>

            :
            <div className="outer-comment-container">
                <div style={{direction:"rtl"}}>
                    <div style={{position:"relative"}}>
                        <button className="btn-update-comment" onClick={()=>{setDeleteComment(true)}}>
                            <DeleteOutlineIcon/> 
                        </button>
                        <button className="btn-update-comment" onClick={()=>{setEditComment(true)}}>
                            <EditIcon/>
                        </button>
                    </div>
                </div>
                <div style={{display:"flex",marginTop:"-1rem" }}>
                    <Avatar style={{marginRight:"1rem" }} sx={{ width: 50, height: 50 }} alt="Profile Picture" src={image} />
                    
                    <div>    
                        <h6 className="h3-comments-name">{comment.owner.name}</h6>
                        <p className="p-comments-content">
                            {content}
                        </p>
                    </div>
                    
                </div>
            </div>
        }


        <Dialog
            open={EditComment || DeleteComment}
            onClose={handleClose}
            PaperProps={{
            component: 'form',
            }}
            fullWidth
        >
            <DialogTitle>{EditComment?"Edit Your Comment":"Are You Sure :"}</DialogTitle>
            <DialogContent>
                {EditComment?
                <div>
                    <label className="label-create-course">Your Comment :</label>
                    <textarea type="text" required value={content} className="input-create-course" onChange={(e)=>{setConntent(e.target.value)}}/>
                </div>
                : ""}
                
            </DialogContent>
            <DialogActions>
            {EditComment?
            <button onClick={handleUpdateComment} className='btn-section-show-edit' >
            {loading?<Bars
                    height="25"
                    width="25"
                    color="rgb(245, 144, 122)"
                    ariaLabel="bars-loading"
                    visible={true}
                    /> : "Edit"}
            </button>
            
            :
            <button onClick={handleDeleteComment} className='btn-section-show-edit' >
            {loading?<Bars
                    height="25"
                    width="25"
                    color="rgb(245, 144, 122)"
                    ariaLabel="bars-loading"
                    visible={true}
                    /> : "Delete"}
            </button>}
            
            </DialogActions>
        </Dialog>
        </div>
        }
        

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
 
export default CommentCard;