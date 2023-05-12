import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import axios from 'axios';
import './styles/image-uploader.css'
import { useEffect } from 'react';

function ImageUploader({isAuthorized, setIsAuthorized}) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data: { text } } = await Tesseract.recognize(file);
      console.log(text)

      const requiredLines = ['NATIONAL UNIVERSITY OF', 'SCIENCES & TECHNOLOGY'];
      const lines = text.split('\n');

      const isValid = requiredLines.every(line => lines.some(l => l.includes(line)));

      if (isValid) {
        // sign up the user
        const formData = new FormData();
        formData.append('card_image', file);

        axios.post('http://127.0.0.1:5000/authorize', formData)
          .then(response => setResult(response.data.result))
          .catch(error => console.error(error));
      }
      else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setMessage('Error processing image');
    }

  }

  useEffect(() => {
    setIsAuthorized(Number(result) === 1);
  }, [result])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {result && !isAuthorized && <p className="card-result0">Unauthorized</p>}
      {result && isAuthorized && <p className="card-result1">Authorized</p>}
    </div>
  );
};

export default ImageUploader;