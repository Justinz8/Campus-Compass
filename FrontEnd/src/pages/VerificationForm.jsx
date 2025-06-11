import React, { useState } from 'react';
import axios from 'axios';

function VerificationForm() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/verify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStatus('Submitted successfully and pending approval.');
    } catch (error) {
      console.error(error);
      setStatus('Failed to submit. Try again.');
    }
  };

  return (
    <div>
      <h2>Club Verification</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf,image/*" onChange={handleFileChange} required />
        <button type="submit">Submit</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default VerificationForm;
