import React,{ useState, useEffect } from 'react';
import { Embed,Dropdown } from 'semantic-ui-react';

import "./Videos.scss";

const videose = [
  { key: 'af', value: 'vOEro_vgUH0', text: 'Las aficiones de mis compañeros' },
  
]

export default function Videos() {

  const [formData, setformData] = useState(initialValueForm());

  return (
    <div style={{ backgroundColor: '#101010', height: '160vh'}}>    
    <br></br>
     <div className="video" >
         <h1 className="titulo-videos">Video player</h1>
         <br></br>
      <Embed
      aspectRatio='21:9'    
      id={formData.id}
      placeholder="https://firebasestorage.googleapis.com/v0/b/comligoaap.appspot.com/o/other%2FBusiness%20Spanish_business%20woman.jpg?alt=media&token=d59fcced-cef6-4715-8881-451ccfbd0494"
      source='youtube'
      />
    <div >
        <h3 className="seleccionar-video">Select a video of the list:</h3>
          <Dropdown
            placeholder="video list"
            search
            selection
            lazyLoad
            options={videose}
            onChange={(e,data) => setformData({...formData, id: data.value})}
            className="listado-videos" />   
     </div>     
     </div>   
     </div>
  )
}

function initialValueForm(){
  return{
     id:""
}
}

