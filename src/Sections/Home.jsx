import { Route, Routes } from "react-router-dom";
import "../Assets/css/Home.css";
import Sidabar from "../Components/Navbar/SidBar";
import Main from "./Main";
import Courses from "./Courses";
import Profile from "./Profile";
import ResponsiveAppBar from "../Components/Navbar/AppBar";
import EditProfile from "./EditProfile";
import CreateCourse from "../Components/CreateCourse";
import InnerCourse from "../Components/innerCourse";
import UpdateCourse from "../Components/updateCourse";
import SectionCard from "../Components/SectionCard";
import Coupons from "../Components/Coupons";
import ViewLecture from "../Components/ViewLecture";

const Home = () => {
    return ( 
        <>
            <Sidabar/>
            <div className="home-body">
                <ResponsiveAppBar/>
                <Routes>
                    <Route path="main" element={<Main/>}/>
                    <Route path="courses" element={<Courses/>}/>
                    <Route path="coupons" element={<Coupons/>}/>
                    <Route path="courses/addCourse" element={<CreateCourse/>}/>
                    <Route path="courses/myCourse/:id" element={<InnerCourse/>}/>
                        <Route path={'courses/myCourse/:id/section/:id'}  element={<SectionCard/>}/>
                    <Route/>
                    <Route path={'lecture/:id'}  element={<ViewLecture/>}/>
                    <Route path="courses/editCourse/:id" element={<UpdateCourse/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="editProfile" element={<EditProfile/>}/>
                </Routes>
            </div>
        </>
     );
}
 
export default Home;