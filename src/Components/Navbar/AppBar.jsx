import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import SchoolIcon from '@mui/icons-material/School';
import "../../Assets/css/AppBar.css"
import MenuItemsAppBar from './MenuItemsAppBar';
import img1 from "../../Assets/images/account-null.png";
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { BASE_URL } from '../../API/Axios';

const Links = [{ title: "Home", to: "/home/main" }, { title: "Courses", to: "/home/courses" },{ title: "Setting", to: "/home/editProfile" }]



function ResponsiveAppBar() {


  const {auth ,token ,setAuth} = useAuth();
  const baseURL = BASE_URL; 


  const AxiosAuth = axios.create({
    baseURL: baseURL , 
    headers :{
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  })

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseNavMenuLogout = async(e)=>{
    try{
      
      const response = await AxiosAuth.post('/logout') ;
      console.log(response);
      if(response.status === 204 ){
        console.log('done');
        setAuth({email : "" , password :"" , accessToken :""});
        console.log(auth);
        return  ;
      };
        
  
      }catch(e){
        console.log(e);
        alert(e.response.data.message)
      }
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  
  const [image , setImage] =React.useState("");

  
  React.useEffect(()=>{
    const getUserInfo = async()=>{
      try{
        const response = await AxiosAuth.get('/teacher-info')
          const res = response.data;
          localStorage.setItem('userInfo' , JSON.stringify(res.data));
          if(res.success === true){
            if(res.data.photo){
              setImage(baseURL+"/image?path="+res.data.photo);
              console.log(baseURL+"/image?path="+res.data.photo);
           }else{
              setImage(img1)
           }
          }
      
      }catch(e){
        console.log(e)
      }
    }

    getUserInfo();
    //eslint-disable-next-line
  },[])

  return (
    <AppBar position="static" className='app-bar'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {Links.map((e, i) => {
                return (
                  <MenuItemsAppBar key={i} title={e.title} to={e.to} fun={handleCloseNavMenu} />
                )
              })}
            </Menu>
          </Box>
          <SchoolIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} style={{ color: "#ef6603" }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            className='title-appBar'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LUMOS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItemsAppBar  title={'Profile'} to={'/home/profile'} fun={handleCloseNavMenu} />
                <MenuItemsAppBar  title={'Logout'} to={'/'} fun={handleCloseNavMenuLogout} />

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;