import DescriptionIcon from '@mui/icons-material/Description';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useAxiosPrivate from './hooks/useAxiosPrivate';
import { useState } from 'react';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import img3 from "../Assets/images/add-file1.jpg"
import { BASE_URL } from '../API/Axios';

const AttachmentsCard = ({data}) => {

    const AxiosAuth = useAxiosPrivate();
    const [isDeleted , setIsDeleted] =useState(false);
    const [msg,setMsg] = useState("");
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [progress , setProgress]= useState(false);
    const [Attachment , setAttachment] =useState({_method:"PUT"})

    const handleDeleteFile = async(event) =>{
        event.preventDefault();

        await AxiosAuth.delete(`/tch/courses/sections/lectures/attachments/${data.id}`).then(response =>{
                setMsg("The Lecture has been Deleted");
                setOpen(true);
                setIsDeleted(true); 
        })
        .catch(err =>{
            setMsg(err.response.data.message);
            setOpen(true);
        })
        
      }


      const handleEditFile = async(event)=>{
        event.preventDefault();
        await AxiosAuth.post(`/tch/courses/sections/lectures/attachments/${data.id}`,
            Attachment,
            { onUploadProgress : setProgress(true)  , headers:{'Content-Type':'multipart/form-data'}}).then(response =>{
                    setOpen(true);
                    setMsg("The file has been Edited");
                    setProgress(null);
                    setOpen2(false)
            }).catch(err =>{
                console.log(err)
                setOpen(true);
                setMsg(err.response.data.message);
                setProgress(null);
                setOpen2(false)
            })
  
      }


      const handleDownloadFile = async(event)=>{
        event.preventDefault();
        console.log(`${BASE_URL}/files/${data.id}`);
        await AxiosAuth.get(`/files/${data.id}`, { responseType: 'arraybuffer' }).then((response) => {
            // const Buffer = new ArrayBuffer(response.data);
            // const  newFileBlob = new Blob(Buffer);
            // console.log("blob :", newFileBlob)
            const file = new Blob(
                [response.data], { type: response.headers['content-type'] })
                
                let url = window.URL.createObjectURL(file);
                let a = document.createElement('a');
                a.href = url;
                a.download = data.name;
                a.click();
        })
            .catch(err =>{
                console.log(err)
                setOpen(true);
                setMsg(err.response);
                setProgress(null);
                setOpen2(false)
            })
  
      }

      function handleClose(){
        setOpen(false);
        setOpen2(false);
    }


    return ( 
        <>
        {isDeleted?"":
        <div>
        <div style={{width:"100%" }} className=" mt-3">
            <div className="outer-container-attachments shadow">
                <div >
                    <DescriptionIcon className='file-icon'/>
                    <h6 className='file-name'>
                        {data.name}
                    </h6>
                </div>
                <div>
                    
                    <button style={{background:"none" , border:"none"}} onClick={handleDownloadFile}>
                        <FileDownloadIcon className='file-upload-icon' />
                    </button>
                    <button style={{background:"none" , border:"none",marginLeft:"0.3rem"}} onClick={()=>{setOpen2(true)}}>
                        <SaveAsIcon className='file-upload-icon'/>
                    </button>
                    <button style={{background:"none" , border:"none" , marginLeft:"0.3rem"}} onClick={handleDeleteFile}>
                        <DeleteOutlineIcon className='file-upload-icon'/>
                    </button>
                </div>
            </div>
        </div>


        <Dialog
        open={open2}
        onClose={handleClose}
        PaperProps={{
        component: 'form',
        }}
        fullWidth
        >
        <DialogTitle>Update Your Attachment :</DialogTitle>
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
                                    <input type="file"  onChange={(e)=>{setAttachment(prev =>{return{...prev , file:e.target.files[0]}})}}/>
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
            <button onClick={handleEditFile} className='btn-section-show-edit' >Edit</button>
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
 
export default AttachmentsCard;