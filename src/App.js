import React,{useState} from "react";
import {ToastContainer} from "react-toastify";
//import './App.css';
import firebase from './utils/Firebase';
import "firebase/auth";
import Auth from "./pages/Auth";
import LoggedLayout from "./layouts/LoggedLayout";

function App() {

  const [user,setUser]= useState(null);
  const [isLoading,setIsLoading]= useState(true);
  //console.log(user.uid);
/////update avatar in top bar
  const [reloadApp, setReloadApp] = useState(false);

  firebase.auth().onAuthStateChanged(currentUser =>{
    // console.log(currentUser);
     if(!currentUser?.emailVerified){
        firebase.auth().signOut();
        setUser(null);
     }else{
       setUser(currentUser);
     }
    setIsLoading(false);
   });

   if (isLoading) {
    return null;
  }

  // return !user ? <Auth/> : <UserLogged/>;
  return (
    // !user ? <Auth/> : <UserLogged />
    <>
    {/*setting layout loggin*/}
   {!user ? <Auth/> : <LoggedLayout user={user} setReloadApp={setReloadApp} />} 
   <ToastContainer
       position="top-center"
       autoClose={5000}
       hideProgressBar
       newestOnTop
       closeOnClick
       rtl={false}
       puaseOnVisibilityChange
       draggable
       pauseOnHover={false}
     />
    </>
 );

}


export default App;
