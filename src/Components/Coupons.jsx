import { useState } from "react";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import CardCoupon from "./CardCoupon";
import AddIcon from '@mui/icons-material/Add';
import {  Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from "@mui/material";
import { Bars } from "react-loader-spinner";

const Coupons = ({id , coupons}) => {

    const AxiosAuth = useAxiosPrivate();
    const [couponData , setCouponData] = useState({});
    const [loading , setLoading] = useState(false);
    const [openDialog , setOpenDialog] = useState(false);
    const [openSnack , setOpenSnack] = useState(false);
    const [msg , setMsg] = useState("");


    function handleClose(){
        setOpenDialog(false);
        setOpenSnack(false);
    }

      const handleCreateCoupon = async(event)=>{
        event.preventDefault();
        setLoading(true);
        await AxiosAuth.post(`/tch/courses/${id}/coupons`,couponData).then(response =>{
            const res = response.data
            if(res.success){
                setLoading(false);
                setOpenDialog(false);
                setMsg(res.message)
                setOpenSnack(true);
            }
        }).catch(err =>{
            console.log(err);
            setLoading(false);
            setOpenDialog(false);
            setMsg(err.response.data.message);
            setOpenSnack(true);
        })
      }

    return ( 
        <>
            <h1 className="add-section-h1 ">
                My Coupons
            </h1>
            <hr />
        
            {
                coupons?
                coupons.map((e,i)=>{
                    return(
                        <CardCoupon key={i} id={e.id} code={e.code} discount={e.discount} number_of_use={e.number_of_use} expiration_date={e.expiration_date}/>
                    )
                })
                
                :<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}><Bars
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
                Add Coupon
            </h1>
            <div style={{display:"flex",justifyContent:"center"}}>
                <button onClick={()=>{setOpenDialog(true);}}  style={{border:"none" , width:"50%"}} >
                    <div className="bottun-add-section">
                    <AddIcon className="add-section-icon"/>
                    </div>
                </button>
            </div>


            <Dialog
            open={openDialog}
            onClose={handleClose}
            PaperProps={{
            component: 'form',
            }}
            fullWidth
        >
            <DialogTitle>Create Your Coupon</DialogTitle>
            <DialogContent>
                <div>
                    <label className="label-create-course">Discount %:</label>
                    <input type="number" required  className="input-create-course" onChange={(e)=>{setCouponData(prev=>{return{...prev , discount:e.target.value}})}}/>
                </div>
                <div>
                    <label className="label-create-course">Number of user :</label>
                    <input type="number" required  className="input-create-course" onChange={(e)=>{setCouponData(prev=>{return{...prev , number_of_use:e.target.value}})}}/>
                </div>
                <div>
                    <label className="label-create-course" >Expiration date :</label>
                    <input type="date" required style={{direction:"rtl"}} className="input-create-course" onChange={(e)=>{setCouponData(prev=>{return{...prev , expiration_date:e.target.value}})}}/>
                </div>
            </DialogContent>
            <DialogActions>
            <button onClick={handleClose} className='btn-section-show-edit'>Cancel</button>
            <button onClick={handleCreateCoupon} className='btn-section-show-edit' >
                {loading?<Bars
                height="25"
                width="25"
                color="rgb(245, 144, 122)"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
                :"Create"}
            </button>
            </DialogActions>
        </Dialog>

        <Snackbar
            open={openSnack}
            onClose={handleClose}
            message={msg}
            key="bottom center"
        />
        </>
     );
}
 
export default Coupons;