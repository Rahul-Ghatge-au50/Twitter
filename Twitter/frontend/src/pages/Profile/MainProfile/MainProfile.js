import React, { useEffect, useState } from 'react';
import './mainProfile.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import UserLoggedIn from '../../../Hooks/userLoggedIn';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LockResetIcon from '@mui/icons-material/LockReset';
import AddLinkIcon from '@mui/icons-material/AddLink';
import axios from 'axios';
import PostComp from '../../../Components/Feed/postComp/PostComp';
import EditProfile from '../EditProfile/EditProfile';


function MainProfile({ user }) {

  const username = user?.email?.split('@')[0];
  const navigate = useNavigate();
  const [loginInUser] = UserLoggedIn();
  //console.log(loginInUser);

  const [isLoading, setIsLoading] = useState('');
  const [coverImageURL, setCoverImageURL] = useState('');

  const [post, setPost] = useState([]);

  useEffect(() => {
    const post = async () => {
      const res = await axios.get(`http://localhost:5000/userPost?email=${user?.email}`);
      setPost(res);
    }
    post();
  }, [post])

  const handleCoverImage = async (e) => {
    setIsLoading(true);
    const image = e.target.files[0];

    const data = new FormData();
    data.set('image', image);

    const res = await axios.post('https://api.imgbb.com/1/upload?key=c19b746c4c85dde258fa97b38197c77c', (data));
    const url = res.data.data.display_url;

    //console.log(res);
    const userCoverImg = {
      email: user?.email,
      coverImage: url
    }
    setIsLoading(false);
    if (url) {
      axios.patch(`http://localhost:5000/userUpdates/${user?.email}`, (userCoverImg));
    }
  }

  const handleProfileImage = async (e) => {
    setIsLoading(true);
    const image = e.target.files[0];

    const data = new FormData();
    data.set('image', image);

    const res = await axios.post('https://api.imgbb.com/1/upload?key=c19b746c4c85dde258fa97b38197c77c', (data));
    const url = res.data.data.display_url;

    const userProfileImg = {
      email:user?.email,
      profileImage: url,
    }
    setIsLoading(false);
    if (url) {
      axios.patch(`http://localhost:5000/userUpdates/${user?.email}`, (userProfileImg))
    }
  }

  return (
    <div>
      <ArrowBackIcon className='arrowIcon' onClick={() => { navigate('/') }} />
      <h3 style={{ textTransform: 'capitalize' }} className='heading-4' >@{username}</h3>
      <div className="mainProfile">
        <div className="profile-bio">
          {
            <div>
              {
                <div className="coverImgCont">
                  <img
                    src={loginInUser?.coverImage ? loginInUser?.coverImage :
                      'https://www.proactivechannel.com/Files/BrandImages/Default.jpg'} alt="" className='coverImage' />
                  <div className="hoverCoverImg">
                    <div className="imgIcon-Tweetbtn">
                      <label htmlFor="image" className='imageIcon'>
                        {
                          isLoading ? (<LockResetIcon className='photoIcon photoIconDisabled ' />)
                            :
                            (<CenterFocusWeakIcon className='photoIcon' />)
                        }
                      </label>
                      <input type="file" id='image' className='imageInput' onChange={handleCoverImage} />
                    </div>
                  </div>
                </div>
              }

              <div className="avatarImg">
                <div className="avatarContainer">
                  <img
                    src={loginInUser?.profileImage ? loginInUser?.profileImage :
                      'https://www.proactivechannel.com/Files/BrandImages/Default.jpg'} alt="" className='avater' />
                  <div className="hoverAvatarImg">
                    <div className="imgIcon-TweetBtn">
                      <label htmlFor="profileImage" className='imageIcon'>
                        {
                          isLoading ? (<LockResetIcon className='photoIcon photoIconDisabled ' />)
                            :
                            (<CenterFocusWeakIcon className='photoIcon' />)
                        }
                      </label>
                      <input type="file" id='profileImage' className='imageInput' onChange={handleProfileImage} />
                    </div>
                  </div>
                </div>
                <div className="userInfo">
                  <div>
                    <h3 className='heading-3' >
                      {loginInUser?.name ? loginInUser?.name : user && user?.displayName}
                    </h3>
                    <p className='usernameSec'>@{username}</p>
                  </div>
                  <EditProfile user={user} />
                </div>
                <div className="infoContainer">
                  {loginInUser?.bio ? loginInUser?.bio : ''}
                  <div className="locationAndLink">
                    {loginInUser.location ? <p className='subInfo' ><MyLocationIcon />{loginInUser.location}</p> : ''}
                    {loginInUser.website ? <p className='subInfo Link' ><AddLinkIcon />{loginInUser.website}</p> : ""}
                  </div>
                </div>
                <h4 className='tweetText' >Tweets</h4>
                <hr />
              </div>
              <div style={{ margin: '0px 5px' }} >
                {
                  post.data?.map((item) => {
                    return <PostComp item={item} key={item._id} />
                  })
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default MainProfile
