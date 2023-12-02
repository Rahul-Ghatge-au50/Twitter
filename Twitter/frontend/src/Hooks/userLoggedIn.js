import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";


function UserLoggedIn() {

    const user = useAuthState(auth);
    const [loginInUser, setLoginInUser] = useState({});

    
    const email = user[0]?.email;
    // const googleEmail = googleUser[0]?.email;
    //console.log(email);
    useEffect(() => {
        fetch(`http://localhost:5000/loggedUser?email=${email}`)
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                setLoginInUser(data);
            })
    }, [email])
    return [loginInUser, setLoginInUser]
}

export default UserLoggedIn