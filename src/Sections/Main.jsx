import { Col, Row } from "react-bootstrap";
import "../Assets/css/HomeMain.css"
import CardMain1 from "../Components/CardMain1";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import DvrIcon from '@mui/icons-material/Dvr';
import MovieIcon from '@mui/icons-material/Movie';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Example from "../Components/Chart1";
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import Chart2 from "../Components/Chart2";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../Components/hooks/useAxiosPrivate";
import { Bars } from "react-loader-spinner";
import Example2 from "../Components/Chart3";
import { BASE_URL } from "../API/Axios";

const Main = () => {
    const baseURL = BASE_URL; 
    const AxiosAuth=useAxiosPrivate();
    const [dashInfo , setDashInfo] = useState();
    useEffect(()=>{
        const getInfo = async()=>{
            await AxiosAuth.get(`/dashboard`).then(response =>{
                const res=response.data
                if(res.success){
                    // setLec(res.data)
                    console.log("info :",res.data);
                    setDashInfo(res.data)
                    
                }
            })
              
        }
     
        getInfo();
        //eslint-disable-next-line
      },[])
      

    return ( 
        <>
            {dashInfo?
            <>
            <Row className="mx-0">
                <Col lg='3' md='6' xs='12' className='mb-1'>
                    <CardMain1 h3={dashInfo.totalFollowers} p1={"Followers"} icon={<PeopleOutlineIcon className='icon-card1' style={{backgroundColor:"rgba(218, 7, 218, 0.378)",color:"purple"}}/>}/>
                </Col>
                <Col lg='3' md='6' xs='12' className='mb-1'>
                    <CardMain1 h3={dashInfo.totalCourses} p1={"Courses"} icon={<DvrIcon className='icon-card1' style={{backgroundColor:"#e9bf0664",color:"#e9bf06"}}/>}/>
                </Col>
                <Col lg='3' md='6' xs='12' className='mb-1'>
                    <CardMain1 h3={dashInfo.totalVideos} p1={"Videos"} icon={<MovieIcon className='icon-card1' style={{backgroundColor:"#3fcdc655",color:"#3fcdc7"}}/>}/>
                </Col>
                <Col lg='3' md='6' xs='12' className='mb-1'>
                    <CardMain1 h3={`${parseInt(dashInfo.totalProfits)}$`} p1={"Profits"} icon={<AttachMoneyIcon className='icon-card1' style={{backgroundColor:"#41cf2e4d",color:"#41cf2e"}}/>}/>
                </Col>
            </Row>
            

            <Row className="mx-0">
                <Col lg='6' md='12' xs='12' className="mb-1">
                    <div className="first-chart-contained shadow">
                        <Chart2 data={dashInfo.formatedFollowingTrend}/>
                    </div>
                </Col>
                <Col lg='6' md='12' xs='12' className="mb-1" >
                    <div className="first-chart-contained shadow" >
                        <div className="inner-first-chart">
                            <SensorOccupiedIcon className="all-subscriptions-icon"/>
                            <div>
                                <h3 className="h3-first-chart">Total Subscriptions</h3>
                                <p className="p-first-chart">
                                    {Object.keys(dashInfo.subscription).length}
                                </p>
                            </div>
                        </div>
                        
                        <Example data={dashInfo.subscription}/> 
                    </div>
                </Col>
                
            </Row>


            <Row className="mx-0">
                <Col lg='6' md='12' xs='12' className="mb-1" >
                    <div className="first-chart-contained shadow">
                        <h1 className="my-student-title text-center ">
                        Top Profits  
                        </h1>
                        <Example2 data={dashInfo.topProfits}/>
                    </div>
                </Col>
                <Col lg='6' md='12' xs='12' className="mb-5" >
                    <div className="first-chart-contained shadow" >
                        <h1 className="my-student-title text-center ">
                            Followers 
                        </h1>
                        <Row style={{height:"12.5rem",overflowY:"scroll"}}>
                            
                        
                        {
                            dashInfo.followers.map((e,i)=>{
                                return(
                                    <Col md='6' key={i}>
                                        <div  className="followers-account" style={{backgroundColor:"#f2ecfd"}}>
                                        <div className="inner-student-account">
                                        
                                        <Avatar 
                                            alt="Remy Sharp" 
                                            src={baseURL+"/image?path="+e.photo} 
                                            sx={{ width: 50, height: 50 }}/>
                    
                                        <div className="inner-student-information-courses">
                                            <h5 className="student-name-courses mt-3">
                                            {e.name}
                                            </h5>
                                        </div>
                                        </div>
                                    </div>
                              </Col>
                                )
                              })
                        }
                        </Row>
                    </div>
                </Col>
            </Row>



            </>
            
            :
            
            <div style={{display:"flex",justifyContent:"center",alignItems:"center" , height:"90vh"}}><Bars
                            height="70"
                            width="70"
                            color="rgb(94, 105, 202)"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            /></div>
            }
            
            
        </>
     );
}
 
export default Main;