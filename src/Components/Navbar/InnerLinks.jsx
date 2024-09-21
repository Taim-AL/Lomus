import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const InnerLinks = ({e}) => {
    const location =useLocation()
        const [class1 , setClass1] = useState("left-br")
        useEffect(()=>{
        location.pathname === e.to ?setClass1('left-br-activ'):setClass1('left-br')
    },[e.to,location])

    return ( 
        
        <>
        <div className="each-icon">
            <div className={class1}></div>
            {e.icon}
        </div>
        </>
     );
}
 
export default InnerLinks;
