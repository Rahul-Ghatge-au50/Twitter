import './widgets.css';
import SearchIcon from "@mui/icons-material/Search";
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';



function Widgets() {
    return (
        <>
            <div className="widgets">
                <div className="widgets-input">
                    <SearchIcon className='widgets-searchIcon' />
                    <input type="text" placeholder='Search Twitter' />
                </div>

                <div className="widgets-cont">
                    <h2>What's Happening</h2>

                    <TwitterTweetEmbed
                        tweetId={"1557187138352861186"}
                    />

                    <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="elonmusk"
                        options={{ height: 400 }}
                    />
                    
                </div>
            </div>
        </>
    )
}

export default Widgets;