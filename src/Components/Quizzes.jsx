import { useEffect, useState } from "react";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import AddIcon from '@mui/icons-material/Add';
import "../Assets/css/Quizzes.css";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Radio, RadioGroup, Snackbar } from "@mui/material";
import BlankCard from "./BlankCard";
import MultiChoiceCard from "./MultiChoiceCard";
// import useData from "./hooks/useData";

const Lectures = ({id}) => {
    const [BlankQuizz , setBlankQuizz] = useState([]);
    const [indexBlankQuizz , setIndexBlankQuizz] = useState({});
    const [indexMultiChoiceQuizz , setIndexMultiChoiceQuizz] = useState({});
    const [MultiQuizz , setMultiQuizz] = useState({choices:[]});

    const [addQuizz , setAddQuizz] = useState(false);
    const [addBlank , setAddBlank] = useState(false);
    const [addMulti , setAddMulti] = useState(false);
    const [progress , setProgress] = useState(false);
    const [Exam , setExam] = useState(false);
    const [msg,setMsg]=useState("");
    const [openSnackbar,setOpenSnackbar]=useState(false);
    const AxiosAuth = useAxiosPrivate();
    // http://localhost:8000/api/tch/courses/sections/1/blank-quizzes
    const handelCreateBlankQuizz = async(event)=>{
        event.preventDefault();
        console.log(BlankQuizz);
        console.log(`/tch/courses/sections/${id}/blank-quizzes`);
        await AxiosAuth.post(`/tch/courses/sections/${id}/blank-quizzes`,
            BlankQuizz,
            { onUploadProgress : setProgress(true) }).then(response =>{
                const res = response.data;
                if(res.success === true){
                    setOpenSnackbar(true);
                    setMsg("The Quizze has been Created");
                    setProgress(null);
                    setAddBlank(false);
                    setAddQuizz(false);
                }
            }).catch(err =>{
                console.log(err)
                setOpenSnackbar(true);
                setMsg(err.response.data.message);
                setProgress(null);
                setAddBlank(false);
                setAddQuizz(false);
            })

      }

      useEffect(()=>{
        const getBlankQuizzes = async()=>{
          try{
            const response = await AxiosAuth.get(`/tch/courses/sections/${id}/blank-quizzes`)
              const res = response.data;
              if(res.success === true){
                console.log("Blanks", res.data);
                setIndexBlankQuizz(res.data);
              }
          
          }catch(e){
            console.log(e)
          }
        }
     
        getBlankQuizzes();
        //eslint-disable-next-line
      },[addBlank])

      useEffect(()=>{
        const getMultiChoiceQuizzes = async()=>{
          try{
            const response = await AxiosAuth.get(`/tch/courses/sections/${id}/multi-choice-quizzes`)
              const res = response.data;
              if(res.success === true){
                console.log("Multi Choice", res.data);
                setIndexMultiChoiceQuizz(res.data);
              }
          
          }catch(e){
            console.log(e)
          }
        }
     
        getMultiChoiceQuizzes();
        //eslint-disable-next-line
      },[addMulti])

      const handelCreateMultiChoice = async(event)=>{
        event.preventDefault();
        console.log(MultiQuizz);
        await AxiosAuth.post(`/tch/courses/sections/${id}/multi-choice-quizzes`,
            MultiQuizz,
            { onUploadProgress : setProgress(true) }).then(response =>{
                const res = response.data;
                if(res.success === true){
                    setOpenSnackbar(true);
                    setMsg("The Quizze has been Created");
                    setProgress(null);
                    setAddMulti(false);
                    setAddQuizz(false);
                }
            }).catch(err =>{
                console.log(err)
                setOpenSnackbar(true);
                setMsg(err.response.data.message);
                setProgress(null);
                setAddMulti(false);
                setAddQuizz(false);
            })

      }

      function handleClose(){setAddQuizz(false);}

      function handleAddChoice(e,i){
        const newChoices = [...MultiQuizz.choices];
        newChoices[i] = e;
        setMultiQuizz(prev => {
        return { ...prev, choices: newChoices }; 
        });
      }

    return ( 
        <>
            <div style={{display:"flex",width:"100%", justifyContent:"center",marginTop:"1rem"}}>
                <div className='outer-container-show-course shadow'>
                    <h1 className="add-section-h1 ">
                        Quizzes
                    </h1>
                    
                    {/* {lecture?
                    lectures.map((e,i)=>{
                        return(

                        )
                    })
                    
                    :""} */}
                    <hr />
                    <h1 className="add-section-h1" style={{textAlign:"left",marginLeft:"1rem"}}>
                        Blank Quizzes :
                    </h1>
                    {indexBlankQuizz[1] ?
                    
                    indexBlankQuizz.map((e,i)=>{
                        return(
                            <BlankCard key={i} id={e.id} title={e.title} separated_body={e.separated_body} blanks={e.blanks}/>
                        )
                    })
                    :""}

                    <hr />
                    <h1 className="add-section-h1" style={{textAlign:"left",marginLeft:"1rem"}}>
                        Multi Choice Quizzes :
                    </h1>
                    {indexMultiChoiceQuizz[1] ?
                    
                    indexMultiChoiceQuizz.map((e,i)=>{
                        return(
                            <MultiChoiceCard key={i} id={e.id} title={e.text} right_answer={e.right_answer} choices={e.choices}/>
                        )
                    })
                    :""}
                    
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <button onClick={()=>{setAddQuizz(true)}} style={{border:"none" , width:"50%"}} >
                            <div className="bottun-add-section">
                                <AddIcon className="add-section-icon"/>
                            </div>
                        </button>
                    </div>
                </div>
            </div>    

                    <Dialog
                        open={addQuizz}
                        onClose={handleClose}
                        PaperProps={{
                        component: 'form',
                        }}
                        fullWidth
                    >
                        <DialogTitle>Create your Quizz</DialogTitle>
                        <DialogContent>
                            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <button className='btn-section-show-edit' onClick={()=>{setAddBlank(true);setAddMulti(false)}}>Blank Quizz</button>
                                <button className='btn-section-show-edit' onClick={()=>{setAddBlank(false);setAddMulti(true)}}>Multi Choice Quizz</button>
                            </div>
                            {addBlank?
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
                                        <button onClick={handelCreateBlankQuizz} className='btn-section-show-edit' >Create</button>
                                        <button onClick={()=>{setExam(true)}} className='btn-section-show-edit' >{Exam.stat?"Close Exampel":"Show Exampel"}</button>
                                    </div>
                                    {Exam?
                                    <div >
                                        <p style={{color:"#333649" ,marginBottom:"0",marginTop:"0.3rem"}}>But The blank ![here]!</p>
                                        <p style={{color:"#333649"}}>The student show :</p>
                                        <p style={{color:"#333649"}}>But The blank_____</p>
                                    </div>
                                    :""}
                                </div>
                                :""
                            }
                            {addMulti?
                            
                                <div>
                                    <div style={{display:"flex",justifyContent:"center" , width:"100%"}}>
                                        <div style={{width:"70%" , marginBottom:"1rem"}}>
                                            <label className="label-create-course">Text :</label>
                                            <input type="text" required  className="input-create-course" onChange={(e)=>{setMultiQuizz(prev =>{return{...prev , text : e.target.value}})}}/>
                                        </div>
                                    </div>
                                    <div style={{display:"flex",justifyContent:"center" , width:"100%"}}>
                                        {[...Array(4)].map((e,i)=>{
                                            return(
                                            <div key={i} style={{width:"20%" , marginBottom:"1rem" , padding:"0 0.5rem"}}>
                                                <label className="label-create-course">Choice {i+1} :</label>
                                                <input type="text"   className="input-create-course" onChange={(e)=>{handleAddChoice(e.target.value , [i])}}/>
                                            </div>
                                            )
                                        })}
                                    </div>
                                    <div style={{display:"flex",justifyContent:"center" , width:"100%"}}>
                                        <div style={{width:"70%" , marginBottom:"1rem"}}>
                                            <label className="label-create-course">Right Answer :</label>
                                            <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            aria-required
                                            >
                                                <div style={{display:"flex"}}>
                                                    <FormControlLabel  value="1" onChange={(e)=>{setMultiQuizz(prev =>{return{...prev , right_answer : e.target.value}})}} control={<Radio />} label="1" />
                                                    <FormControlLabel  value="2" onChange={(e)=>{setMultiQuizz(prev =>{return{...prev , right_answer : e.target.value}})}} control={<Radio />} label="2" />
                                                    <FormControlLabel  value="3" onChange={(e)=>{setMultiQuizz(prev =>{return{...prev , right_answer : e.target.value}})}} control={<Radio />} label="3" />
                                                    <FormControlLabel  value="4" onChange={(e)=>{setMultiQuizz(prev =>{return{...prev , right_answer : e.target.value}})}} control={<Radio />} label="4" />
                                                </div>
                                        </RadioGroup>
                                        </div>
                                    </div>
                                    <div style={{display:"flex",justifyContent:"center" , width:"100%"}}>
                                        <button onClick={handelCreateMultiChoice} className='btn-section-show-edit' >Create</button>
                                    </div>
                                </div>
                            
                            :""}
                                {progress?
                                <div style={{display:"flex" , justifyContent:"center" ,marginBottom:"1rem",marginTop:"1rem"}}>
                                    <CircularProgress />
                                    {progress}
                                </div>
                                
                                :""}
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
 
export default Lectures;