
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.js';
import Login from './pages/Login/Login.js';
import SignUp from './pages/SignUp/SignUp.js';
import ProtectedRoute from './pages/ProtectedRoute.js';
import LoadingPage from './pages/LodingPage.js';
import Feed from './Components/Feed/Feed.js';
import Profile from './pages/Profile/Profile.js';
import Notification from './pages/Notification/Notification.js';
import More from './pages/More/More.js';
import List from './pages/List/List.js';
import Bookmark from './pages/Bookmarks/Bookmark.js';
import Explore from './pages/Explore/Explore.js';
import Messages from './pages/Messages/Messages.js';


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} >
            <Route index element={<Feed />} />
          </Route>
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} >
            <Route path='feed' element={<Feed />} />
            <Route path='notification' element={<Notification />} />
            <Route path='profile' element={<Profile />} />
            <Route path='more' element={<More />} />
            <Route path='lists' element={<List />} />
            <Route path='bookmarks' element={<Bookmark />} />
            <Route path='explore' element={<Explore />} />
            <Route path='messages' element={<Messages />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/loadingpage' element={<LoadingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
