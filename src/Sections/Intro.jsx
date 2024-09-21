import React from 'react';
import Wave from 'react-wavify';
import AOS from 'aos';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';     

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard , Autoplay} from 'swiper/modules';

// import Data
import {DataSblide } from '../Assets/Data.js';
import OuterNav from '../Components/outer nav/OutNav.jsx';


function Intro() {
    AOS.init();
    return ( 

        <>
            <OuterNav/>

            <section id='home' style={{backgroundColor:"rgb(94, 105, 202)"}}>
                <div className='outer-nav'></div>
            <div style={{display:"flex",justifyContent:"center",padding:"4rem 0px"}}>
        <div className='continar-swiper'>
        <Swiper
        loop={true}
        cssMode={true}
        navigation={true}
        mousewheel={true}
        keyboard={true}
        // Navigation={true}
        pagination={false}
        zoom={true}
        autoplay={{
            delay:10000,
            disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Mousewheel, Keyboard,Autoplay]}
        className="mySwiper"
        style={{padding:"40px 0px"}}
      >
        {DataSblide.map((e,i)=>{
            return(
                <SwiperSlide key={i}>
                    <div className='testimonial'>
                        <h2 className='title' data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration="700">
                            {e.title}
                        </h2>
                        <div className='continar-ditailes' style={{width:"63%"}}>
                            <p className='text-white text-center ' style={{fontWeight:"600"}} data-aos="fade-up" data-aos-easing="linear" data-aos-duration="700" data-aos-delay="200">
                                <i className='bx bxs-quote-alt-left quote-icon'></i>{e.about}
                                <i className='bx bxs-quote-alt-right quote-icon'></i>
                            </p>
                        </div>
                        <div className='details text-center' >
                        </div>
                    </div>
                </SwiperSlide>
            )
        })}
        
      </Swiper>  
      
      </div>
      </div>

        <Wave fill={'#ffffff40'} paused={false} options={{height:70 , amplitude:45 , speed:0.15 , points:4,}}/>          
        <Wave fill={'#ffffffd0'} paused={false} options={{height:70 , amplitude:35 , speed:0.20 , points:4,}} className='wave-1'/>
        <Wave fill={'#fff'} paused={false} options={{height:70 , amplitude:40 , speed:0.25 , points:4,}} className='wave-1'/>
        
        </section>
        </>
        
     );
}


export default Intro;