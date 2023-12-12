import React, { useState } from 'react';
import './editProfile.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Avatar } from "@mui/material";
import TextField from '@mui/material/TextField';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import UserLoggedIn from '../../../Hooks/userLoggedIn';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 8,
}


function EditChild({ setDob, dob }) {

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <div className="birthDateSection" onClick={handleOpen} >
        <text>Edit</text>
      </div>

      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: '300px', height: '300px' }} >
          <div className="text">
            <h2>Edit date of Birth</h2>
            <p>
              This can only be changed a few times.<br />
              Make sure you enter the age of the <br />
              person using the account.
            </p>
            <input type="date" onChange={(e) => setDob(e.target.value)} />
            <Button className='e-button' onClick={() => { setOpen(false); }}>Cancel</Button>
          </div>
        </Box>
      </Modal>

    </>
  )
}

export default function EditProfile({ user }) {

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [dob, setDob] = useState('');
  const [loginInUser] = UserLoggedIn();
  //console.log(loginInUser);

  const handleSave = async () => {
    const editInfo = {
      name:name,
      bio:bio,
      location:location,
      website:website,
      dob:dob
    }
    //console.log(editInfo);
      await axios.patch(`http://localhost:5000/userUpdates/${user?.email}`,(editInfo));
      setOpen(false);   
  }

  return (
    <div>
      <button className='editProfileBtn' onClick={() => setOpen(true)} >Edit Profile</button>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal" >
          <div className='header' >
            <IconButton className='closeBtn'><CloseIcon onClick={() => setOpen(false)} /></IconButton>
            <h2 className='headerTitle'>Edit Profile</h2>
            <button className='save-btn' onClick={handleSave} >Save</button>
          </div>
          <form className='fillContent' >
            <TextField
              className='text-field'
              label='Name' id="fullWidth"
              variant='filled' fullWidth
              onChange={(e) => setName(e.target.value)}
              defaultValue={loginInUser.name ? loginInUser.name : " "}
            />
            <TextField
              className='text-field'
              label='Bio' id="fullWidth"
              variant='filled' fullWidth
              onChange={(e) => setBio(e.target.value)}
              defaultValue={loginInUser.bio ? loginInUser.bio : " "}
            />
            <TextField
              className='text-field'
              label='Location' id="fullWidth"
              variant='filled' fullWidth
              onChange={(e) => setLocation(e.target.value)}
              defaultValue={loginInUser.location ? loginInUser.location : " "}
            />
            <TextField
              className='text-field'
              label='Website'
              id="fullWidth"
              variant='filled' fullWidth
              onChange={(e) => setWebsite(e.target.value)}
              defaultValue={loginInUser.website ? loginInUser.website : " "}
            />
          </form>
          <div className='birthdateSection' >
            <p>Birth Date</p>
            <p>.</p>
            <EditChild setDob={setDob} dob={dob} />
          </div>
          <div className='lastSection' >
            {
              loginInUser.dob ?
                (<h2>{loginInUser.dob}</h2>) :
                (<h2>
                  {
                    dob ? dob : 'Add your date of birth'
                  }
                </h2>)
            }
            <div className='last-btn'>
              <h2>Switch to professional </h2>
              <ChevronRightIcon />
            </div>
          </div>
        </Box>
      </Modal>

    </div>
  )
}

