import axios from 'axios';
import React, { useState } from 'react';
import '../App.css';
import Home from './home';

const App = () => {
  const [file, setfile] = useState(null);

  const onformSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('photo', file);
    const config = {
      headers: {
        'content-type': 'multipart/from-data',
      },
    };
    const url = 'http://localhost:3001/upload';
    axios
      .post(url, formData, config)
      .then((response) => {
        alert('Image Uploaded Successfully!!');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const onInputChange = (e) => {
    setfile(e.target.files[0]);
  };
  return (
    <>
      <div className="App">
        <form onSubmit={onformSubmit}>
          <h1>Simple File Uploader</h1>
          <div className="button">
            <input type="file" name="photo" onChange={onInputChange} />
            <button type="submit">Upload</button>
          </div>
        </form>
      </div>
      <Home />
    </>
  );
};

export default App;
