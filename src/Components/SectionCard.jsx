import { useNavigate, useParams } from 'react-router-dom';
import '../Assets/css/ShowSection.css';
import { useEffect, useState } from 'react';
import useAxiosPrivate from './hooks/useAxiosPrivate';
import FolderIcon from '@mui/icons-material/Folder';
import LockIcon from '@mui/icons-material/Lock';
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Radio, RadioGroup, Snackbar } from '@mui/material';
import Quizzes from './Quizzes';
import Lectures from './Lectures';

const SectionCard = () => {
    const {id} = useParams();
    const [section , setSection]= useState({});
    const [openSnackbar , setOpenSnackbar] = useState(false);
    const [msg , setMsg] = useState("");
    const [openEdit , setOpenEdit] = useState(false);
    const [openDelete , setOpenDelete] = useState(false);
    const [name , setName] = useState("");
    const [isUnlocked ,setIsUnlocked] = useState('');
    const navigate = useNavigate();
    const AxiosAuth = useAxiosPrivate();
    useEffect(()=>{
        const showSection = async()=>{
          try{
            const response = await AxiosAuth.get(`/tch/courses/sections/${id}`)
              const res = response.data;
              if(res.success === true){
                 setSection(res.data);
                 console.log("section :" , res.data);
              }
          
          }catch(e){
            console.log(e)
          }
        }
     
        showSection();
        //eslint-disable-next-line
      },[])

      function handleClose(){setOpenEdit(false);setOpenSnackbar(false);setOpenDelete(false);}

      const handleEditSection = async(event)=>{
        event.preventDefault();
        handleClose();
        await AxiosAuth.post(`/tch/courses/sections/${id}`,{name:name , is_unlocked:isUnlocked , _method:"PUT"}).then(response =>{
            const res = response.data;
            if(res.success === true){
                setSection(res.data);
                setMsg("The Section has been edited");
                setOpenSnackbar(true);
            }
        })
      }

      const handleDeleteSection = async(event)=>{
        event.preventDefault();
        handleClose();
        setMsg("The Section has been deleted");
        setOpenSnackbar(true);
        await AxiosAuth.delete(`/tch/courses/sections/${id}`).then(response =>{
                navigate(-1);
        })
      }


    return ( 
        <>
        {/* The Section and Edit and Delete it */}
            <div style={{display:"flex",width:"100%", justifyContent:"center",marginTop:"1rem"}}>
                <div className='outer-container-show-course shadow'>
                <div className="outer-section-component" style={{marginBottom:"0"}}>
                        <div className="inner1-section-component">
                            <FolderIcon style={{color:"rgb(245, 144, 122)" ,marginLeft:"0.2rem"}}/>
                            {section.name}
                            {
                                section.is_unlocked?"":<LockIcon style={{color:"rgb(245, 144, 122)",marginRight:"0.2rem"}}/>
                            }
                        </div>
                        <div className="inner1-section-component">
                            Total Hours : {section.total_hours}
                        </div>
                        <div className="inner2-section-component">
                            <button  className="btn-section-show-edit" onClick={()=>{setOpenEdit(true)}} > Edit </button>
                            <button  className="btn-section-show-edit" onClick={()=>{setOpenDelete(true)}} > Delete </button>
                        </div>
                    </div>
                </div>
            </div>

        <Dialog
            open={openEdit}
            onClose={handleClose}
            PaperProps={{
            component: 'form',
            }}
        >
            <DialogTitle>{section.name}</DialogTitle>
            <DialogContent>
                <div>
                    <label className="label-create-course">name :</label>
                    <input type="text" required  className="input-create-course" onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div>
                    <label className="label-create-course mt-3">is unlocked :</label>
                        <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        aria-required
                        >
                            <div style={{display:"flex"}}>
                                <FormControlLabel  value="1" onChange={e => {setIsUnlocked(e.target.value) }} control={<Radio />} label="Yes" />
                                <FormControlLabel  value="0" onChange={e => setIsUnlocked(e.target.value)} control={<Radio />} label="No" />
                            </div>
                    </RadioGroup>
                </div>
            </DialogContent>
            <DialogActions>
            <button onClick={handleClose} className='btn-section-show-edit'>Cancel</button>
            <button onClick={handleEditSection} className='btn-section-show-edit' >Edit</button>
            </DialogActions>
        </Dialog>

        <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
             Are you sure to delete {section.name}
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className='btn-section-show-edit'>Close</button>
          <button onClick={handleDeleteSection} className='btn-section-show-edit'>
            Delete
          </button>
        </DialogActions>
      </Dialog>


            {/* The Lectures & The Quizes*/}
            <Lectures id={id} lectures={section.lectures}/>
            <Quizzes id={id}/>

            {/* My Snackbar */}
            {
                msg && <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={msg}
                        />
            } 
        </>
     );
}
 
export default SectionCard;