import { Avatar } from "@mui/material";
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import './postcomp.css';
import UserLoggedIn from "../../../Hooks/userLoggedIn";



function PostComp({ item }) {
    //console.log(item);
    const [loginInUser] = UserLoggedIn();
    const { name, profilePhoto, username, email, photo, post } = item;

    return (
        <>
            <div className="post-cont">
                <div className="post-avatar">
                    <Avatar src={profilePhoto}/>
                </div>
                <div className="post-body">
                    <div className="post-header">
                        <div className="post-data">
                            <h3 style={{display:'flex',alignItems:'center'}} className="post-head">
                                {name}
                               <span><VerifiedIcon className="verifyIcon" fontSize="small" /></span>
                            </h3>
                            <span style={{color:'gray',fontSize:'12px',fontWeight:'600'}}>
                                {email}
                            </span>
                        </div>
                        <div className="post-desc">
                            {post}
                        </div>
                    </div>
                        <img src={photo} alt="" className="post-photo" />
                    <div className="post-icons">
                        <ChatBubbleOutlineIcon className="post_icon" fontSize="small" />
                        <RepeatIcon className="post_icon" fontSize="small" />
                        <FavoriteBorderIcon className="post_icon" fontSize="small" />
                        <PublishIcon className="post_icon" fontSize="small" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostComp;