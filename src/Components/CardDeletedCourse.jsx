import { useState } from 'react';
import '../Assets/css/Courses.css'
import { Dialog, Rating, Snackbar } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import useAxiosPrivate from './hooks/useAxiosPrivate';
import { BASE_URL } from '../API/Axios';

const CardDeletedCours = ({img , title , discreption ,id ,rate}) => {
  const baseURL = BASE_URL; 
    const coursePhoto = baseURL+"/image?path="+img;
    const [openD , setOpenD]=useState(false);
    const [open2 , setOpen2]=useState(false);
    const AxiosAuth=useAxiosPrivate();

    function handleClose(){
        setOpenD(false);
    }
    function handleClose2(){
        setOpen2(false);
    }
    function handelOpenDialog(){
        setOpenD(true);
    }
    const handelRestore = async (event) =>{
        event.preventDefault();
        AxiosAuth.put(`/tch/courses/${id}/restore`).then(response =>{
            setOpen2(true);
        }).catch(err=>{
            console.log(err)
        })
        
    }
    return ( 
        <>
        <div className="mb-3 outer-container-corses shadow">
                <div style={{position:"absolute" , marginTop:"1rem" , marginLeft:"1rem"}}>
                    <Rating name="read-only" value={rate} precision={0.5} readOnly />
                </div>
                <img src={coursePhoto} alt="" className="img-cours" />
            <div style={{padding:"0rem 1rem"}}>    
                <h3 className="title-cours">
                    {title}
                    
                </h3>
                <p className="discreption-cours">
                    {discreption}
                </p>
                <div className="outer-container-next-cours">
                    <button style={{background:"none",border:"none"}} onClick={handelOpenDialog} className="show-more-course">
                    ReStore &gt;
                    </button>
                </div>
            </div>
        </div>
        <Dialog
        fullWidth={true}
        maxWidth={'xs'}
        open={openD}
        onClose={handleClose}
        style={{borderRadius:"30px"}}
            >
            <p style={{textAlign:"center" , color:"rgb(94, 105, 202)"}}>
            Do you want to restore this course?
            </p>
            <div style={{display:"flex" , justifyContent:"center" , marginBottom:"1rem"}}>
                <button onClick={handelRestore} className="delete-image-button">
                    {open2 ? <DoneIcon/>:"ReStore"}
                </button>
            </div>
            <Snackbar
            open={open2}
            autoHideDuration={5000}
            onClose={handleClose2}
            message="The Course has been Restored "
            />
        </Dialog>
        </>
     );
}
 
export default CardDeletedCours;