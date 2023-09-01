import React, { useState } from 'react';
import S3Service from './services/S3Service';

const S3 = new S3Service();

const labels = {
  buttons: {
    upload: 'Upload',
    testGet: 'Make test GET request'
  }
}

function App() {
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleGetClick = () => {
    S3.getImage('123')
      .then(res => console.log(res));
  }

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file)
    reader.onload = () => {
      S3.postImage(reader.result, file.name)
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

      <button onClick={handleUploadClick}>{labels.buttons.upload}</button>

      <button onClick={handleGetClick}>{labels.buttons.testGet}</button>
    </div>
  );
}

export default App;
