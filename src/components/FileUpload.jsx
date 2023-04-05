import React, { useState } from 'react';
import axios from 'axios'; 
import './styles/global.css';
import './file-upload.css';

function Upload(props) {

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    // postImage();
  };

  async function postImage() {
    console.log(file);
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append('image',file)
    try {
      const {data:{image:{src}}} = await axios.post('http://localhost:8080/api/v1/post/uploads/', formData,{
        headers:{
          authorization: `Bearer ${token}`,
         'Content-Type':'multipart/form-data'
        }
       });
       console.log("src: "+src);
      if (src) props.setImg(src);
      else props.setImg("");
      console.log("open: " +props.open);
      if(props.setOpen) {props.setOpen();}
    } catch (error) {
        console.error(error.response.data);
    }
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    console.log("FILE: " + file);
    // Send the file to the server using fetch or axios
    await postImage(file);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
      {/* <form> */}
        <label htmlFor="fileInput">Upload image: </label>
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          accept="image/*, video/*"
        />
        <button className="file-upload-btn" type="submit" disabled={!file}>
          Upload
        </button>
      </form>
      {file && (
        <div>
          {/* <p>Filename: {file.name}</p>
          <p>File type: {file.type}</p>
          <p>File size: {file.size} bytes</p> */}
          <img className="file-upload-img-preview" src={URL.createObjectURL(file)} alt="Preview" />
        </div>
      )}
    </div>
  );
}

export default Upload;
