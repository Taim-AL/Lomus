import { Link } from "react-router-dom";
// icons 
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import LinkIcon from '@mui/icons-material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { Snackbar } from "@mui/material";
import { useState } from "react";



const DeleteAccount = ({e}) => {
    const [open , setOpen ]= useState(false);
    const axiosPrivate = useAxiosPrivate();
    const id = e.id ;
    const handelDeleteAccount = async (event) =>{
        event.preventDefault();
       try{
        await axiosPrivate.delete(`/teacher-info/social-account/${id}`).then(res=>{
            console.log("response : ", res);
            if(res.status === 204){
                console.log("done ya 7abiby")
                setOpen(true);
            }
        })
       }catch(err){
       }

     }

     const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    

    return ( 
        <>
        <div className="li-accouts-profile" >
            {
                e.type === 'facebook' ? <FacebookOutlinedIcon className="edit-accounts-icons"/> 
                :e.type === 'instagram' ? <InstagramIcon className="edit-accounts-icons"/>
                :e.type === 'telegram' ? <TelegramIcon className="edit-accounts-icons"/>
                :e.type === 'whatsApp'? <WhatsAppIcon className="edit-accounts-icons"/> 
                :e.type === 'gitHub'? <GitHubIcon className="edit-accounts-icons"/> 
                :e.type === 'youTube'? <YouTubeIcon className="edit-accounts-icons"/> 
                :e.type === 'x'? <XIcon className="edit-accounts-icons"/> 
                :e.type === null? <LinkIcon className="edit-accounts-icons"/>:""
            }
            <p className="container-deleteAndLink-accounts">
                <Link href={e.link} className="a-edit-accounst-profile">
                    {
                    e.type ? e.type : "Link"
                    }
                </Link>
                <button className="buttonDelete-forAccounts" onClick={handelDeleteAccount}>
                    <DeleteIcon className="deleteIcon-forAccounts"/>
                </button>
            </p>
        </div>
        <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="The link has been deleted "
        />
        </>
     );
}
 
export default DeleteAccount;