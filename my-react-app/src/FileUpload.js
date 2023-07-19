import React,{useState } from 'react';
import axios from 'axios';
import './App.css';

function FileUpload() {

  const [file, setFile] = useState();

  const handleFile = (e) => {
    
    setFile(e.target.files[0])
  }

  const handleUpload =()=>{
    const formdata= new FormData();
    formdata.append('image',file)
    axios.post('http://localhost:3000/upload',formdata)
    .then(res=> console.log(res))
    .catch(err => console.log(err));
  }

  return (
    <div className="container">
      <input type="file" onChange={handleFile}/>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;