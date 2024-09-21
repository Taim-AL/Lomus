import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import WbIncandescentOutlinedIcon from '@mui/icons-material/WbIncandescentOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import img1 from './images/cours1.jpg'
import img2 from './images/cours2.png'
import img3 from './images/cours3.png'
import stu1 from './images/stu1.jpg'
import stu2 from './images/stu2.jpg'
import stu3 from './images/stu3.jpg'

export const DataSblide=[
    {
        id:0,
        title:"Welcome to LUMOS Acadimy",
        about:"We are an educational platform that provides many services , Our goalis to facilitate the educational process and make it more time and effort saving for both the professor and the student"
    },
    {
        id:1,
        title:"Some of our services",
        about:"We provide the ability to publish courses recorded by the professor in video form , and the professor can publish tests for his students , communicate with them through comments , and follow their progress , and upload files attached to each lecture ."
    },
    {
        id:2,
        title:"We work for the convenience of the teacher",
        about:"The teacher can follow the statistics of his own courses in terms of views, profits, and other details, and follow and respond to students’ comments"
    },
]

export const DataWaves=[
    {
        id:0,
        color:"#ffffff40",
        amplitude:45,
        speed:0.15
    },
    {
        id:1,
        color:"#ffffffd0",
        amplitude:35,
        speed:0.20
    },
    {
        id:2,
        color:"#fff",
        amplitude:40,
        speed:0.25
    },
]

export const DataLocation =[
    {title:"Home",to:'/home/main' },
    {title:"Courses",to:'/home/courses' },
    {title:"Profile",to:'/home/profile' },
    {title:"Setting",to:'/home/editProfile' },
]

export const DataInnerLinksSideBar = [
    {icon : <CottageOutlinedIcon className="link-icon"/>, to:"/home/main"},
    {icon : <WbIncandescentOutlinedIcon className="link-icon"/>, to:"/home/courses"},
    {icon : <AccountCircleOutlinedIcon className="link-icon"/> , to:"/home/profile"},
    {icon : <SettingsOutlinedIcon className="link-icon"/> , to:"/home/editProfile"},
]


export const DataCourses = [
    {
        id:1,
        img: img1,
        title:"paython cours",
        discreption:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto molestias numquam dolores reiciendis, libero aut maxime error nihil suscipit architecto."
    },
    {
        id:2,
        img: img2,
        title:"Laravel cours",
        discreption:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto molestias numquam dolores reiciendis, libero aut maxime error nihil suscipit architecto."
    },
    {
        id:3,
        img: img3,
        title:"React cours",
        discreption:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto molestias numquam dolores reiciendis, libero aut maxime error nihil suscipit architecto."
    },
]


export const DataStudents =[
    {
        id:1,
        img: stu1,
        name:"Rayan", 
        des:"React Course"
    },
    {
        id:2,
        img: stu2,
        name:"Ziad",
        des:"Laravel Course"
    },
    {
        id:3,
        img: stu3,
        name:"Mohamad",
        des:"Programing Course"
    },
    {
        id:4,
        img: stu2,
        name:"Ziad",
        des:"Laravel Course"
    }
    ,
    {
        id:3,
        img: stu3,
        name:"Mohamad",
        des:"Programing Course"
    },
    {
        id:4,
        img: stu2,
        name:"Ziad",
        des:"Laravel Course"
    }
]

export const inputsDataCreateCourse = [
    {
        placeholder:"Title :",
        proberty:"title",
        isRequired : true
    },
    {
        placeholder:"Cost $ :",
        proberty:"cost",
        isRequired : true
    },
    {
        placeholder:"Requirements :",
        proberty:"requirements",
        isRequired : false
    },
    {
        placeholder:"Expectations :",
        proberty:"expectations",
        isRequired : false
    },
]


export const students = [

]
// color:"#ffffffd0",  "#ffffff40"