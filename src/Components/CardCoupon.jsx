import { Bars } from "react-loader-spinner";
import "../Assets/css/Coupon.css";
import { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from "@mui/material";
import useAxiosPrivate from "./hooks/useAxiosPrivate";

const CardCoupon = ({id,code,discount,number_of_use,expiration_date}) => {
//   const [MyCode , setMyCode] = useState(code);
//   const [MyDiscount , setMyDiscount] = useState(discount);
//   const [MyNumber_of_use , setMyNumber_of_use] = useState(number_of_use);
//   const [MyExpiration_date , setMyExpiration_date] = useState(expiration_date);
  const [deleteCoupon ,setDeleteCoupon] = useState(false);
  const [openSnackbar ,setOpenSnackbar] = useState(false);
  const [openBars ,setOpenBars] = useState(false);
  const [coupon , setCoupon] = useState({_method:"PUT"});
  const [UpdateCoupon ,setUpdateCoupon] = useState(false);
  const [deleted ,setDeleted] = useState(false);
  const [msg ,setMsg] = useState("");
  const AxiosAuth = useAxiosPrivate();

  function handleClose(){ setOpenSnackbar(false); setUpdateCoupon(false)}

  const handleDeleteCoupon = async(event)=>{
    event.preventDefault();
    setDeleteCoupon(true);
    await AxiosAuth.delete(`/tch/courses/coupons/${id}`).then(response =>{
        setDeleteCoupon(false);
        setOpenSnackbar(true);
        setMsg("The Coupon has been deleted");
        setDeleted(true);
        }).catch(err =>{
            console.log(err);
            setDeleteCoupon(false);
            setOpenSnackbar(true);
            setMsg(err.response.data.message);
        })

  }

  const handleUpdateCoupon = async(event)=>{
    event.preventDefault();
    setOpenBars(true);
    await AxiosAuth.post(`/tch/courses/coupons/${id}`,coupon).then(response =>{
      const res = response.data;
      if(res.success === true){
        setOpenBars(false);
        setUpdateCoupon(false);
        setOpenSnackbar(true);
        setMsg(res.message);
        
      }  
        }).catch(err =>{
            console.log(err);
            setUpdateCoupon(false);
            setOpenSnackbar(true);
            setMsg(err.response.data.message);
        })

  }


    return ( 
        <>
        {deleted ?"":
        <div>
          <div className="card-blank-quizz" >
              <div className="inner-blank-card ">
                  <div >
                      <h3 className="h3-blank text-center">
                        Discount : {discount}%
                      </h3>
                  </div>
                  <div >
                      <h5 className="h3-blank">
                          Information :
                      </h5>
                      <div style={{display:"flex" , justifyContent:"space-around",alignItems:"center"}}>

                      <p className="p-blank-quizz" ><span style={{color:"rgb(245, 144, 122)"}}>Expiration Date : </span>{expiration_date}</p>
                      <p className="p-blank-quizz" ><span style={{color:"rgb(245, 144, 122)"}}>Number of use : </span>{number_of_use}</p>
                      <p className="p-blank-quizz" ><span style={{color:"rgb(245, 144, 122)"}}>Code : </span>{code}</p>

                      </div>

                      <div style={{display:"flex" , justifyContent:"space-around"}}>
                          <button className='btn-section-show-edit' onClick={handleDeleteCoupon}>{deleteCoupon?<Bars
                                                                                    height="30"
                                                                                    width="30"
                                                                                    color="rgb(245, 144, 122)"
                                                                                    ariaLabel="bars-loading"
                                                                                    visible={true}
                                                                                    /> : "Delete"}</button>
                          <button className='btn-section-show-edit' onClick={()=>{setUpdateCoupon(true)}} >Update</button>
                      </div>
                  </div>
              </div>
          </div>

          <Dialog
            open={UpdateCoupon}
            onClose={handleClose}
            PaperProps={{
            component: 'form',
            }}
            fullWidth
        >
            <DialogTitle>Update your Coupon</DialogTitle>
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
            <button onClick={handleUpdateCoupon} className='btn-section-show-edit' >{openBars?<Bars
                                                                                    height="30"
                                                                                    width="30"
                                                                                    color="#ef6603"
                                                                                    ariaLabel="bars-loading"
                                                                                    visible={true}
                                                                                    /> : "Update"}</button>
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
 
export default CardCoupon;