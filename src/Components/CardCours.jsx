import { Link } from "react-router-dom";
import '../Assets/css/Courses.css'
import { Dialog, DialogActions, DialogContent, DialogTitle, Rating, Snackbar } from "@mui/material";
import DiscountIcon from '@mui/icons-material/Discount';
import { useState } from "react";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { BASE_URL } from "../API/Axios";

const CardCours = ({img , title , discreption ,id ,rate}) => {
  const baseURL = BASE_URL; 
    const coursePhoto = baseURL+"/image?path="+img;
    const AxiosAuth = useAxiosPrivate();
    const [openCreate , setOpenCreate] = useState(false);
    const [coupon , setCoupon] = useState({});
    const [openSnackbar , setOpenSnackbar] = useState(false);
    const [msg , setMsg] = useState(null);

    function handleClose(){setOpenCreate(false);}
  
    function handleCloseSnackbar(){setOpenSnackbar(false);}

    const handleCreateCoupon = async(event)=>{
        event.preventDefault();
        await AxiosAuth.post(`/tch/courses/${id}/coupons`,coupon).then(response =>{
            const res = response.data;
            if(res.success === true){
                handleClose();
                setMsg(res.message);
                setOpenSnackbar(true);
            }
        }).catch(err =>{
            handleClose();
            setMsg(err.response.data.message);
            setOpenSnackbar(true);
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
                    <Link to={`myCourse/${id}`} className="show-more-course">
                    Show more &gt;
                    </Link>
                    <button onClick={()=>{setOpenCreate(true);}} style={{background:"none",border:"none" , display:"flex"}} className="show-more-course">
                    <DiscountIcon style={{marginBottom:"0.2rem"}}/> Add Coupon 
                    </button>
                </div>
            </div>
        </div>
        <Dialog
            open={openCreate}
            onClose={handleClose}
            PaperProps={{
            component: 'form',
            }}
            fullWidth
        >
            <DialogTitle>Coupon {title}</DialogTitle>
            <DialogContent>
                <div>
                    <label className="label-create-course">Discount %:</label>
                    <input type="number" required  className="input-create-course" onChange={(e)=>{setCoupon(prev=>{return{...prev , discount:e.target.value}})}}/>
                </div>
                <div>
                    <label className="label-create-course">Number of user :</label>
                    <input type="number" required  className="input-create-course" onChange={(e)=>{setCoupon(prev=>{return{...prev , number_of_use:e.target.value}})}}/>
                </div>
                <div>
                    <label className="label-create-course" >Expiration date :</label>
                    <input type="date" required style={{direction:"rtl"}} className="input-create-course" onChange={(e)=>{setCoupon(prev=>{return{...prev , expiration_date:e.target.value}})}}/>
                </div>
            </DialogContent>
            <DialogActions>
            <button onClick={handleClose} className='btn-section-show-edit'>Cancel</button>
            <button onClick={handleCreateCoupon} className='btn-section-show-edit' >Create</button>
            </DialogActions>
        </Dialog>
        {
                msg && <Snackbar
                        open={openSnackbar}
                        autoHideDuration={5000}
                        onClose={handleCloseSnackbar}
                        message={msg}
                        />
            } 
        </>
     );
}
 
export default CardCours;