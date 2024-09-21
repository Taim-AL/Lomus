import { Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Radio, RadioGroup, Snackbar } from "@mui/material";
import { useState } from "react";
import { Bars } from "react-loader-spinner";
import useAxiosPrivate from "./hooks/useAxiosPrivate";

const MultiChoiceCard = ({id,title , right_answer,choices}) => {
    const [myTitle , setMyTitle] = useState(title); 
    const [my_right_answer , set_my_right_answer] = useState(right_answer); 
    const [myChoices , setMyChoices] = useState(choices); 
    const [editMulti , setEditMulti] = useState(false);
    const [deleteMulti , setDeleteMulti] = useState(false);
    const [deleted , setDeleted] = useState(false);
    const [openBars , setOpenBars] = useState(false);
    const AxiosAuth = useAxiosPrivate();
    const [msg,setMsg]=useState("");
    const [MultiQuizz , setMultiQuizz] = useState({choices:[]});
    const [openSnackbar , setOpenSnackbar] = useState(false);

    function handleClose(){setEditMulti(false); setOpenSnackbar(false);}

    const handleDeleteMulti = async(event)=>{
      event.preventDefault();
      setDeleteMulti(true);

      await AxiosAuth.delete(`/tch/courses/sections/multi-choice-quizzes/${id}`).then(response =>{
          setDeleteMulti(false);
          setOpenSnackbar(true);
          setMsg("The quizz has been deleted");
          setDeleted(true);
          }).catch(err =>{
              console.log(err);
              setDeleteMulti(false);
              setOpenSnackbar(true);
              setMsg(err.response.data.message);
          })

    }

    const handelUpdateMultiChoice = async(event)=>{
      event.preventDefault();
      setOpenBars(true);
      await AxiosAuth.post(`/tch/courses/sections/multi-choice-quizzes/${id}`,{text:MultiQuizz.text ,right_answer:MultiQuizz.right_answer,choices : MultiQuizz.choices, _method:"PUT"} , {headers:{"Content-Type":"multipart/form-data"}}).then(response =>{
              const res = response.data;
              if(res.success === true){
                  setEditMulti(false);
                  setOpenBars(false);
                  setMsg("Your Quizz has been Updated");
                  setOpenSnackbar(true);
                  setMyTitle(res.data.text);
                  set_my_right_answer(res.data.right_answer);
                  setMyChoices(res.data.choices);
              }
          }).catch(err =>{
              console.log(err);
              setOpenBars(false);
              setEditMulti(false);
              setOpenSnackbar(true);
              setMsg(err.response.data.message);
          })

    }

    function handleAddChoice(e,i){
      const newChoices = [...MultiQuizz.choices];
      newChoices[i] = e;
      setMultiQuizz(prev => {
      return { ...prev, choices: newChoices }; 
      });
    }

    return (
        <>
        {deleted?"":
        <div>
        <div className="card-blank-quizz" >
            <div className="inner-blank-card ">
                <div >
                    <h3 className="h3-blank">
                        {myTitle}
                    </h3>
                    <p className="p-blank-quizz"><span style={{color:"rgb(245, 144, 122)"}}>Right Answer : </span> {my_right_answer}</p>
                    <div style={{display:"flex" , justifyContent:"space-around"}}>
                        <button className='btn-section-show-edit' onClick={handleDeleteMulti}>{deleteMulti?<Bars
                                                                                                            height="30"
                                                                                                            width="30"
                                                                                                            color="rgb(245, 144, 122)"
                                                                                                            ariaLabel="bars-loading"
                                                                                                            visible={true}
                                                                                                            /> : "Delete"}</button>
                        <button className='btn-section-show-edit' onClick={()=>{setEditMulti(true)}}>Edit</button>
                    </div>
                </div>
                <div >
                    <h5 className="h3-blank">
                        Choices :
                    </h5>
                    <div style={{display:"flex" , justifyContent:"space-around",alignItems:"center"}}>

                        {myChoices.map((e,i)=>{
                            return(
                                <p className="p-blank-quizz" key={i}><span style={{color:"rgb(245, 144, 122)"}}>{i+1}_ </span>{e}</p>
                            )
                        })}

                    </div>
                </div>
            </div>
        </div>

        <Dialog
            open={editMulti}
            onClose={handleClose}
            PaperProps={{
            component: 'form',
            }}
            fullWidth
        >
            <DialogTitle>Update your Quizz :</DialogTitle>
            <DialogContent>
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
                    <button onClick={handelUpdateMultiChoice} className='btn-section-show-edit' >{openBars?<Bars
                                                                                                            height="30"
                                                                                                            width="30"
                                                                                                            color="rgb(245, 144, 122)"
                                                                                                            ariaLabel="bars-loading"
                                                                                                            visible={true}
                                                                                                            />: "Update"}</button>
                </div>
            </div>
            </DialogContent>
            <DialogActions>
                <button onClick={handleClose} className='btn-section-show-edit'>Cancel</button>
            </DialogActions>
        </Dialog>

        </div>
      }

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
 
export default MultiChoiceCard;