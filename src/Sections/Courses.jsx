import { Col, Row } from "react-bootstrap";
import "../Assets/css/Courses.css"
import {  BottomNavigation, BottomNavigationAction, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CardCours from "../Components/CardCours";
import { Link } from "react-router-dom";
import SchoolIcon from '@mui/icons-material/School';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from "react";
import useAxiosPrivate from "../Components/hooks/useAxiosPrivate";
import { Bars } from "react-loader-spinner";
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import PublicOffOutlinedIcon from '@mui/icons-material/PublicOffOutlined';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import CardDeletedCours from "../Components/CardDeletedCourse";
import { BASE_URL } from "../API/Axios";

const Courses = () => {

  const [courses , setCourses] = useState([]);
  const [deletedCourse,setDeletedCourse]= useState([]);
  const [coursesSearch , setCoursesSearch] = useState([]);
  const [search , setSearch] = useState("");
  const [load1 , setLoad1] = useState(true);
  const AxiosAuth = useAxiosPrivate();
  const [value, setValue] = useState('pub');
  const [students , setStudents] = useState([]);
  const baseURL = BASE_URL; 

  useEffect(()=>{
    const getCourses = async()=>{
      try{
        const response = await AxiosAuth.get('/tch/courses?page=1' ,{params:{page:1}})
          const res = response.data;
          console.log("my Courses :",res.data);
          if(res.success === true){
            setLoad1(false);
            setCourses(res.data.courses);
          }
      
      }catch(e){
        console.log(e)
        setLoad1(false);
      }
    }
 
    getCourses();
    //eslint-disable-next-line
  },[]);

  useEffect(()=>{
    const getStudents = async()=>{
      try{
        const response = await AxiosAuth.get('/students-with-certification')
          const res = response.data;
          console.log("my Courses :",res.data);
          if(res.success === true){ 
            console.log( 'students :',res.data)
            setStudents(res.data)
          }
      
      }catch(e){
        console.log('students :',e)
      }
    }
 
    getStudents();
    //eslint-disable-next-line
  },[]);

  useEffect(()=>{
    const getSearch = async()=>{
      try{
        const response = await AxiosAuth.get(`/tch/courses?page=1&search=${search}` ,{params:{page:1,search:search}})
        setLoad1(true)
          const res = response.data;
          console.log("my Search :",res.data.courses);
          if(res.success === true){
            setLoad1(false);
            setCoursesSearch(res.data.courses);
          }
      
      }catch(e){
        console.log(e);
        setLoad1(false);
      }
    }
 
    getSearch();
    //eslint-disable-next-line
  },[search])

  useEffect(()=>{
    const getDeletedCourse = async()=>{
      try{
        const response = await AxiosAuth.get("/tch/courses?page=1&deleted=1" ,{params:{page:1,deleted:1}})
          const res = response.data;
          if(res.success === true){
            setDeletedCourse(res.data.courses);
            console.log("deleted",deletedCourse);
          }
      
      }catch(e){
        console.log(e);
      }
    }
 
    getDeletedCourse();
    //eslint-disable-next-line
  },[])

    return ( 
        <>
         <Row className="mx-0">
            <Col lg="8" md='12' xs='12' className="mt-3">
              <div style={{display:"flex" , justifyContent:"space-between", paddingRight:"1.5rem"}}>
                <h1 className="my-courses-title">
                  My Courses
                </h1>
                <div className="container-search">
                  <button className="button-search">
                    <SearchIcon className="icon-search"/>
                  </button>
                  <TextField 
                  id="standard-basic" 
                  label="Search......" 
                  variant="standard"
                  color="secondary"
                  onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <Row className="mx-0 mt-3">
                <Col md='12'>
                    {!search ?<BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    style={{borderRadius:"20px",marginBottom:"2rem"}}
                    >
                    <BottomNavigationAction label="Published" value='pub' icon={<PublicOutlinedIcon />} />
                    <BottomNavigationAction label="Not Published" value='notPub' icon={<PublicOffOutlinedIcon />} /> 
                    <BottomNavigationAction label="Deleted" value='deleted' icon={<AutoDeleteIcon />} /> 
                    </BottomNavigation> :""}
                  {
                    load1?<div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"5rem"}}><Bars
                          height="50"
                          width="50"
                          color="rgb(245, 144, 122)"
                          ariaLabel="bars-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                          /></div>:
                          search?coursesSearch?
                          coursesSearch.map((e)=>{
                            return(
                              <CardCours key={e?.id} id={e?.id} img={e?.photo} rate={e?.rate} title={e?.title} discreption={e?.description}/>
                            )
                          }):""
                          :
                  courses ?
                  // eslint-disable-next-line array-callback-return
                  courses.map((e)=>{
                    if(value === "pub"){
                      if(e.published_at){
                    return(
                      <CardCours key={e?.id} id={e?.id} img={e?.photo} rate={e?.rate} title={e?.title} discreption={e?.description}/>
                    )}}else if(value === "notPub"){
                      if(!e.published_at){
                        return(
                          <CardCours key={e?.id} id={e?.id} img={e?.photo} rate={e?.rate} title={e?.title} discreption={e?.description}/>
                        )}
                    }
                  }) : ""
                  }
                  {
                    deletedCourse ?
                    // eslint-disable-next-line array-callback-return
                    deletedCourse.map((e)=>{
                      if(value === "deleted"){
                      return(
                        <CardDeletedCours key={e?.id} id={e?.id} img={e?.photo} rate={e?.rate} title={e?.title} discreption={e?.description}/>
                      )}
                    }) : ""
                    
                  }
                </Col>
              </Row>
            </Col>
            <Col lg="4" md='12' xs='12' className="mt-3">
              <div >
                <h1 className="my-courses-title text-center">
                  Add Course
                </h1>
                <Link to={'addCourse'} >
                  <div className="bottun-add-course">
                    <AddIcon className="add-course-icon"/>
                  </div>
                </Link>
              </div>
              <hr/>
              <div className="studint-outer-container">
                <h1 className="my-student-title text-center">
                  Students with certificates
                </h1>
                {
                  students[0] ?
                  students.map((e,i)=>{
                    return( 
                      <div key={i} className="studet-account">
                    <div className="inner-student-account">
                      
                      <Avatar 
                        alt={e.name}
                        src={baseURL+"/image?path="+e.photo} 
                        sx={{ width: 56, height: 56 }}/>
  
                      <div className="inner-student-information-courses">
                        <h5 className="student-name-courses">
                          {e.name}
                        </h5>
                        <p className="description-student-course">
                          {e.course_name}
                        </p>
                      </div>
                    </div>
                    <SchoolIcon className="student-account-icon"/>
                  </div>
                    )
                  })
                  
                  :<div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"5rem"}}><Bars
                  height="50"
                  width="50"
                  color="rgb(245, 144, 122)"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  /></div>
                }
              </div>
            </Col>
         </Row>
        </>
     );
}
 
export default Courses;