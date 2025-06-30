import React, { useState } from 'react';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  return (
    <div className="my-2">
      <h4 className="font-semibold">🗂 File Upload</h4>
      <input type="file" onChange={e => setFile(e.target.files[0])} className="block mt-1" />
      {file && <div className="text-xs text-gray-600 mt-1">Selected: {file.name}</div>}
    </div>
  );
};

export default FileUploader; 