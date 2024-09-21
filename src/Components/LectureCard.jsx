// import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
// import {  SwiperSlide } from 'swiper/react';
import {  useNavigate } from "react-router-dom";
import "../Assets/css/Lectures.css"
const LectureCard = ({lec , thumb}) => {
    const navigate = useNavigate();

    return ( 
        <>    
    <div style={{borderRadius:"20px",overflow:"hidden"}} className='shadow card4' onClick={()=>{navigate(`../lecture/${lec.id}`) }}>
        <div style={{overflow:"hidden"}}>
            <img src={thumb} className='img-portfolio' alt={lec.title}/>
        </div>
        <div className='p-3'>
        <h5 className='mt-1 h5-port' >{lec.title}</h5>
        </div>
    </div>


        </>
     );
}
 
export default LectureCard;