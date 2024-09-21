import { useState } from "react";
import "../Assets/css/Sections.css";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import AddIcon from '@mui/icons-material/Add';
// import { Accordion, RadioGroup } from "rsuite";
import {  FormControlLabel, Radio, RadioGroup, Snackbar } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";
import FolderIcon from '@mui/icons-material/Folder';



const Sections = ({id ,allSections}) => {
    const AxiosAuth = useAxiosPrivate();
    const [name,setName] = useState("");
    const [open,setOpen] = useState(false);
    const [request,setRequest] = useState(false);
    const [isUnlocked,setIsUnlocked] = useState("");
    const [addSection , setAddSection] = useState(false);
    const [msg , setMsg] = useState("")

    const handelCreateSection = async (event)=>{
        event.preventDefault();
        setRequest(true);
        await AxiosAuth.post(`/tch/courses/${id}/sections`,{name:name,is_unlocked:isUnlocked}).then(response =>{
            const res = response.data;
            if(res.success === true){
                console.log(response);
                setRequest(false);
                setAddSection(false);
                setOpen(true);
                setMsg("Section created successfully");
                // // setSections(prev=>{return {...prev , response.data.data}})
                // setSections(prev =>{return{...prev + response.data.data}});
                console.log(allSections);
                setName("");
                setIsUnlocked("");
            }
        }).catch(err=>{
            setAddSection(false);
            console.log(err);
        })
    }

    function handelAddForm(){
        setAddSection(true);
    }

    function handelCloseForm(){
        setAddSection(false);
        
    }
    function handleClose(){
        setOpen(false);
    }
    return ( 
        <>
        
        {
            allSections ?
            allSections.map((e,i)=>{
                return(
                    <div key={i} className="outer-section-component">
                        <div  className="inner1-section-component">
                            <FolderIcon style={{color:"rgb(245, 144, 122)" ,marginLeft:"0.2rem"}}/>
                            {e.name}
                            {
                                e.is_unlocked?"":<LockIcon style={{color:"rgb(245, 144, 122)",marginRight:"0.2rem"}}/>
                            }
                        </div>
                        <div className="inner2-section-component">
                            <Link to={`/home/courses/myCourse/${id}/section/${e.id}`}  className="btn-section-show-edit">Show</Link>
                            {/* <Link to={`/home/editSection/${e.id}`}  className="btn-section-show-edit" > Edit </Link> */}
                        </div>
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
    
        <h1 className="add-section-h1 ">
            Add Section
        </h1>
        <div style={{display:"flex",justifyContent:"center"}}>
            <button onClick={handelAddForm} style={{border:"none" , width:"50%"}} >
                <div className="bottun-add-section">
                <AddIcon className="add-section-icon"/>
                </div>
            </button>
        </div>


        {
            addSection?
            <div className="outer-container-create-section">
            <form style={{display:"flex",justifyContent:"space-around"}}>
                <div>
                    <label className="label-create-course">name :</label>
                    <input type="text"   className="input-create-course" onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div>
                    <label className="label-create-course mt-3">is unlocked :</label>
                        <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        >
                            <div style={{display:"flex"}}>
                                <FormControlLabel  value="1" onChange={e => {setIsUnlocked(e.target.value) }} control={<Radio />} label="Yes" />
                                <FormControlLabel  value="0" onChange={e => setIsUnlocked(e.target.value)} control={<Radio />} label="No" />
                            </div>
                    </RadioGroup>
                </div>
            </form>
            <div style={{display:"flex" , justifyContent:"space-around"}}>
                <button onClick={handelCloseForm} className="create-section-button">
                    Close
                </button>   
                <button className="create-section-button" onClick={handelCreateSection}>
                    {
                        request?
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <Bars height="20" width="20" color="rgb(245, 144, 122)" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
                        </div>
                        :"Create"
                    }
                </button>
            </div>
            </div>
            :""
        }
        <Snackbar
        open={open}
        onClose={handleClose}
        message={msg}
        key="bottom center"
      />
        </>
     );
}
 
export default Sections;