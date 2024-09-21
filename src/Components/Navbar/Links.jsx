import { useEffect, useState } from 'react';

import {Link, useLocation} from 'react-router-dom';

const Links = ({e}) => {
        const location =useLocation()
        const [class1 , setClass1] = useState("not-active-link")
        useEffect(()=>{
        location.pathname === e.to ?setClass1('active-link'):setClass1('not-active-link')
    },[e.to,location])
    return ( 
        <>
    
    <Link to={e.to} className={class1}>{e.title}</Link>
        </>
     );
}
 
export default Links;