import { Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from "@mui/material";
import { useState } from "react";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { Bars } from "react-loader-spinner";

const BlankCard = ({id , title ,separated_body , blanks}) => {
    
    const [editBlank , setEditBlank] = useState(false);
    const [deleteBlank , setDeleteBlank] = useState(false);
    const [openBars , setOpenBars] = useState(false);
    const AxiosAuth = useAxiosPrivate();
    const [msg,setMsg]=useState("");
    const [BlankQuizz,setBlankQuizz]=useState({title:"",body:""});
    const [openSnackbar , setOpenSnackbar] = useState(false);
    function handleClose(){setEditBlank(false); setOpenSnackbar(false);}

    const handelEditBlankQuizz = async(event)=>{
        event.preventDefault();
        setOpenBars(true);
        await AxiosAuth.post(`/tch/courses/sections/blank-quizzes/${id}`,{title:BlankQuizz.title ,body:BlankQuizz.body, _method:"PUT"} , {headers:{"Content-Type":"multipart/form-data"}}).then(response =>{
                const res = response.data;
                if(res.success === true){
                    setEditBlank(false);
                    setOpenBars(false);
                    setMsg("Your Quizz has been Updated");
                    setOpenSnackbar(true);
                    title=res.data.title;
                    separated_body=res.data.separated_body;
                    blanks=res.data.blanks;

                }
            }).catch(err =>{
                console.log(err);
                setOpenBars(false);
                setEditBlank(false);
                setOpenSnackbar(true);
                setMsg(err.response.data.message);
            })

      }

      const handleDeleteBlank = async(event)=>{
        event.preventDefault();
        setDeleteBlank(true);

        await AxiosAuth.delete(`/tch/courses/sections/blank-quizzes/${id}`).then(response =>{
            setDeleteBlank(false);
            setOpenSnackbar(true);
            setMsg("The quizz has been deleted");
            }).catch(err =>{
                console.log(err);
                setDeleteBlank(false);
                setOpenSnackbar(true);
                setMsg(err.response.data.message);
            })

      }

    return ( 
        <>
        <div className="card-blank-quizz" >
            <div className="inner-blank-card ">
                <div >
                    <h3 className="h3-blank">
                        {title}
                    </h3>
                    <p className="p-blank-quizz">{separated_body}</p>
                    <div style={{display:"flex" , justifyContent:"space-around"}}>
                        <button className='btn-section-show-edit' onClick={handleDeleteBlank}>{deleteBlank?<Bars
                                                                                                            height="30"
                                                                                                            width="30"
                                                                                                            color="rgb(245, 144, 122)"
                                                                                                            ariaLabel="bars-loading"
                                                                                                            visible={true}
                                                                                                            /> : "Delete"}</button>
                        <button className='btn-section-show-edit' onClick={()=>{setEditBlank(true)}}>Edit</button>
                    </div>
                </div>
                <div >
                    <h5 className="h3-blank">
                        Blanks :
                    </h5>
                    <div style={{display:"flex" , justifyContent:"space-around",alignItems:"center"}}>

                        {blanks.map((e,i)=>{
                            return(
                                <p className="p-blank-quizz" key={i}><span style={{color:"rgb(245, 144, 122)"}}>{i+1}_ </span>{e}</p>
                            )
                        })}

                    </div>
                </div>
            </div>
        </div>

        <Dialog
            open={editBlank}
            onClose={handleClose}
            PaperProps={{
            component: 'form',
            }}
            fullWidth
        >
            <DialogTitle>Edit your Quizz :</DialogTitle>
            <DialogContent>
            <div>
                <div style={{display:"flex",justifyContent:"center" , width:"100%"}}>
                    <div style={{width:"70%" , marginBottom:"1rem"}}>
                        <label className="label-create-course">Titel :</label>
                        <input type="text" required  className="input-create-course" onChange={(e)=>{setBlankQuizz(prev =>{return{...prev , title : e.target.value}})}}/>
                    </div>
                </div>
                <div style={{display:"flex",justifyContent:"center" , width:"100%"}}>
                    <div style={{width:"70%" , marginBottom:"1rem"}}>
                        <label className="label-create-course">Body :</label>
                        <input type="text" required   className="input-create-course" onChange={(e)=>{setBlankQuizz(prev =>{return{...prev , body : e.target.value}})}}/>
                    </div>
                </div>
                <div style={{display:"flex",justifyContent:"center" , width:"100%"}}>
                    <button onClick={handelEditBlankQuizz} className='btn-section-show-edit'>
                    {openBars ?<Bars
                            height="30"
                            width="30"
                            color="rgb(245, 144, 122)"
                            ariaLabel="bars-loading"
                            visible={true}
                            /> : "Update"}
                    </button>
                </div>
            </div>
            </DialogContent>
            <DialogActions>
                <button onClick={handleClose} className='btn-section-show-edit'>Cancel</button>
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
 
export default BlankCard;