import { useEffect, useState } from 'react';
import TweetBox from '../Feed/TweetBox';
import './feed.css';
import axios from 'axios';
import PostComp from '../Feed/postComp/PostComp';

function Feed() {

    const [post, setPost] = useState([]);

    useEffect(() => {
        const post = async () => {
            const res = await axios.get('http://localhost:5000/post');
            setPost(res);
        }
        post();
    }, [post])
    //console.log(post)

    return (
        <>
            <div className="feed-cont">
                <div className="feed-header">
                    <p style={{ fontWeight: 'bold', fontSize: '24px',fontFamily:'Sarabun, sans-serif'}} >Home</p>
                    <TweetBox />
                </div>
                <div className="feed-post">
                    {
                        post.data?.map((item) => {
                            return <PostComp item={item} key={item._id} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Feed;