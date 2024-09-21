import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../../Assets/css/AppBar.css"

const MenuItemsAppBar = ({to , title , fun}) => {
    const [class1,setClass1] = useState("not-active-item");
    const location = useLocation();
    useEffect(()=>{
        location.pathname === to ?setClass1('active-item'):setClass1('not-active-item')
    },[to,location])
    return ( 
        <>
        <MenuItem  onClick={fun}>
            <Link  to={to} className={class1}>{title}</Link>
        </MenuItem>
        </>
     );
}
 
export default MenuItemsAppBar;