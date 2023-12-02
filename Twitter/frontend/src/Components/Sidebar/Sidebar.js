import SidebarOption from './SidebarOptions/SidebarOption';
import './sidebar.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreIcon from "@mui/icons-material/More"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Divider from '@mui/material/Divider';
import DoneIcon from '@mui/icons-material/Done';
import Button from "@mui/material/Button";
import ListItemIcon from '@mui/material/ListItemIcon';
import { Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import CustomLink from './customLink';
import UserLoggedIn from '../../Hooks/userLoggedIn';



function Sidebar({ handleLogout, user }) {

    const [loginInUser] = UserLoggedIn();
    const userName = user[0]?.email.split('@')[0];
    //console.log(loginInUser);

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    //console.log(openMenu);

    //const profileImg = loginInUser[0]?.profileImg ? loginInUser.profileImg : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null);
    }


    return (
        <>
            <div className="sidebar-cont">
                <TwitterIcon className='sidebar-twitterIcon' />
                <CustomLink to='/'>
                    <SidebarOption active Icon={HomeIcon} text='Home' />
                </CustomLink>
                <CustomLink to='/home/explore'>
                    <SidebarOption active Icon={SearchIcon} text='Explore' />
                </CustomLink>
                <CustomLink to='/home/notification' >
                    <SidebarOption active Icon={NotificationsNoneIcon} text='Notification' />
                </CustomLink>
                <CustomLink to='/home/messages' >
                    <SidebarOption active Icon={MailOutlineIcon} text='Messages' />
                </CustomLink>
                <CustomLink to='/home/bookmarks' >
                    <SidebarOption active Icon={BookmarkBorderIcon} text='Bookmarks' />
                </CustomLink>
                <CustomLink to='/home/lists' >
                    <SidebarOption active Icon={ListAltIcon} text='Lists' />
                </CustomLink>
                <CustomLink to='/home/profile' >
                    <SidebarOption active Icon={PermIdentityIcon} text='Profile' />
                </CustomLink>
                <CustomLink to='/home/more' >
                    <SidebarOption active Icon={MoreIcon} text='More' />
                </CustomLink>
                <Button className='sidebar-tweet' variant='outlined' >
                    Tweet
                </Button>

                <div className="profile-info">
                    {
                        !user ? ('') : (<Avatar src='' />)
                    }

                    <div className="user-info">
                        <h4>{loginInUser.name ? loginInUser.name : 'user' && user[0]?.displayName}</h4>
                        <h5>@{userName}</h5>
                    </div>
                    <IconButton
                        size='small'
                        sx={{ ml: 2 }}
                        aria-controls={openMenu ? 'basic-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={openMenu ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MoreHorizIcon />
                    </IconButton>

                    <Menu id='basic-menu' anchorEl={anchorEl} open={openMenu} onClick={handleClose} >
                        <MenuItem className='profile-info1'>
                            <Avatar src='' />
                            <div className="subuserInfo">
                                <div className="user-info">
                                    <h4>{loginInUser.name}</h4>
                                    <h5>@{userName}</h5>
                                </div>
                                <ListItemIcon>
                                    <DoneIcon className='done-icon' />
                                </ListItemIcon>
                            </div>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose} >Add an existing account</MenuItem>
                        <MenuItem onClick={handleLogout}>Log Out </MenuItem>
                    </Menu>
                </div>
        </div>
        </>
    )
}

export default Sidebar;