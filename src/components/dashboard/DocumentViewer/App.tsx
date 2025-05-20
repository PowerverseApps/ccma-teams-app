import React, { useState } from 'react';
import './App.css';
 
function App() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setLoading(true);
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      setTimeout(() => setLoading(false), 1000); // simulate processing
    }
  };
 
  const clearFile = () => {
    setFile(null);
    setPreviewUrl(null);
  };
 
  return (
    <div className="app-container">
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-left">
          <img src="/CCMA.jpeg" alt="Logo" className="logo" />
          <button className="back-button">Back</button>
        </div>
        <div className="navbar-center">
          <h2>Document Annotator</h2>
        </div>
        <div className="profile-menu">
          <div
            className="profile-circle"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              src="/profile.jpg"
              alt="Profile"
              className="profile-image"
            />
          </div>
          {showDropdown && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  className="dropdown-profile-image"
                />
                <div className="profile-details">
                  <div className="profile-name">John Doe</div>
                  <div className="profile-email">john.doe@email.com</div>
                </div>
              </div>
              <input type="file" className="upload-image-input" />
              <button className="sign-out-button">Sign Out</button>
            </div>
          )}
        </div>
      </div>
 
      {/* Main */}
      <div className="main-container">
        <div className="file-selection">
          <div className="file-selection-buttons">
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
            />
            <button className="sharepoint-button">Upload from SharePoint</button>
          </div>
        </div>
 
        {file && (
          <div className="file-info-bar">
            <p>Selected File: {file.name}</p>
            <button className="clear-file-button" onClick={clearFile}>
              Remove File
            </button>
          </div>
        )}
 
        {loading && (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Processing File...</p>
          </div>
        )}
 
        {previewUrl && !loading && (
          <div className="file-preview">
            <iframe
              src={previewUrl}
              width="100%"
              height="600px"
              title="Document Preview"
            ></iframe>
            <a
              href={previewUrl}
              download={file?.name}
              className="download-link"
            >
              Download File
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
 
export default App;