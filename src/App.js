import React, { useState } from 'react';
import S3Service from './services/S3Service';

const S3 = new S3Service();

function App() {
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file)
    reader.onload = () => {
      console.log(reader.result.split(':')[1]);
      S3.postImage(reader.result.split(':')[1])
        .then((data) => console.log(data));    
    }
  };

  return (
    <div className='container'>
      <div className='file-container'>
        <label>
          <input type="file" onChange={handleFileChange} />
        </label>
      </div>

      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default App;
