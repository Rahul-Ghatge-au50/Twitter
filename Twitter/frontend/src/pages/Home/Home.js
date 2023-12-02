import { signOut } from 'firebase/auth';
import Feed from '../../Components/Feed/Feed';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Widgets from '../../Components/Widgets/Widgets';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import './home.css';

function Home() {

    const user = useAuthState(auth);
    //console.log(user);
    
    const handleLogout = () => {
        signOut(auth);
    }

    return (
        <div className='home-cont'>
            <Sidebar handleLogout={handleLogout} user={user}/>
            <main>
                <Outlet/>
            </main>
            <Widgets />
        </div>
    )
}

export default Home;