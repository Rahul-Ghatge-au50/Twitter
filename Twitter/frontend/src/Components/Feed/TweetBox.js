import React, { useState } from "react";
import "./tweetbox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import axios from "axios";
import UserLoggedIn from "../../Hooks/userLoggedIn";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";


function TweetBox() {
    const [post, setPost] = useState('')
    const [imageURL, setImageURL] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const [loginInUser] = UserLoggedIn();
    const [name,setName] = useState('');
    const [userName,setUserName] = useState('');

    const [user] = useAuthState(auth);
    const email = user?.email;
    //console.log(email);
    //console.log(user);


    const handleImage = async (e) => {
        setIsLoading(true);
        const image = e.target.files[0];
        //console.log(image);


        //Image is uploaded in ImgBB website 
        const data = new FormData();
        data.set('image', image);
        const res = await axios.post('https://api.imgbb.com/1/upload?key=c19b746c4c85dde258fa97b38197c77c', (data));
        setImageURL(res.data.data.display_url);
        //console.log(res);
        setIsLoading(false);
    }


    const handleTweet = async (e) => {
        e.preventDefault();
        if(user.providerData[0].providerId === 'password'){
            fetch(`http://localhost:5000/loggedUser?email=${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setName(data?.name);
                setUserName(data?.username);
            })
            console.log(name);
            console.log(userName);
        }else{
            setName(user?.displayName);
            setUserName(email?.split('@')[0])
        }
        console.log(imageURL);
        if (name) {
            const userPost = {
                profilePhoto:loginInUser?.profileImage,
                post: post,
                photo: imageURL,
                name:name,
                username:userName,
                email:email
            }
            setPost('');
            setImageURL('');
            // fetch('http://localhost:5000/post',{
            //     method:'POST',
            //     headers:{
            //         'content-type':'application/json'
            //     },
            //     body:JSON.stringify(userPost)
            // }).then(res => res.json()).then((data) => console.log(data));

            const res = await axios.post('http://localhost:5000/post', (userPost));
            //console.log(res);
        }
    }

    return <div className="tweetBox">
        <form onSubmit={handleTweet}>
            <div className="tweetBox__input">
                <Avatar src={loginInUser?.profileImage} />
                <input
                    type="text"
                    placeholder="What's happening?"
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    required
                />

            </div>
            <div className="imageIcon_tweetButton">
                <label htmlFor='image' className="imageIcon">
                    {
                        isLoading ? <p>Image is loading</p> : <p>{imageURL ? 'Image uploaded' : <AddPhotoAlternateOutlinedIcon />}</p>
                    }
                </label>
                <input
                    type="file"
                    id='image'
                    className="imageInput"
                    onChange={handleImage}
                />
                <Button className="tweetBox__tweetButton" type="submit">Tweet</Button>
            </div>
        </form>
    </div>
}
export default TweetBox;