import React,{useState,useEffect} from 'react';
//import {Button, Grid, GridColumn} from "semantic-ui-react";
import { map } from "lodash";
import firebase from "../../utils/Firebase";
/////router
import {BrowserRouter as Router} from "react-router-dom";
import Routes from "../../routes/Routes";
import Hamburgesa from '../../Components/Hamburgesa';

import "./LoggedLayout.scss";

const db = firebase.firestore(firebase);

export default function LoggedLayout(props) {

 const {user,setReloadApp} =props;
 const [myclass, setMyclass] = useState(null);
 const [idclass, setIdclass] = useState(null);
 const [classname, setClassname] = useState(null);
 const [teachername, setTeachername] = useState(null);

 //console.log(myclass);
 //console.log(idclass);
 //console.log(teacherid);
 //console.log(teachername);
////////////////list classroom
useEffect(() => {
  db.collection("studentclass")
  .get()
  .then(response => {

      const arrayofClasses=[]

      map(response?.docs, classes => {
          const data = classes.data();
          data.id=classes.id;
         // console.log(data.teacher);
          if(user.uid === data.studentid){
            setIdclass(data.id);
            setClassname(data.class);
            setTeachername(data.teacher);
            //  setClase(data.class);
          //  console.log(data.level);
         // console.log(data);
         arrayofClasses.push(data);
          }else{
              // console.log("fail");
          }
        });   
        setMyclass(arrayofClasses);
});
}, [])
////////////////

    return (

      <div style={{ backgroundColor: '#101010', height: '100%'}}>
      <Router >
          <Hamburgesa/>
          <Routes 
          user={user} 
          setReloadApp={setReloadApp}  
          myclass={myclass} 
          idclass={idclass}
          classname={classname}
          teachername={teachername}
       
          />           
       </Router>
      </div>  
      
    )
}
