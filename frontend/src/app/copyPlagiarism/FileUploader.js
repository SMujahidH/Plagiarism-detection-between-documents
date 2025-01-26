import React, { useState } from "react";

function FileUploader({ onUpload, loading }) {
  const [files, setFiles] = useState([]);
  const [threshold, setThreshold] = useState(50);

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleUpload = () => {
    if (files.length === 0) {
      alert("Please select at least one file.");
      return;
    }
    onUpload(files, threshold);
  };

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Files</h2>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        disabled={loading}
        accept=".docx,.pdf,.txt"
        className="block mb-4 border border-gray-300 rounded p-2 w-full"
      />
      <label className="block text-gray-600 mb-2">Threshold (%)</label>
      <input
        type="number"
        value={threshold}
        onChange={(e) => setThreshold(e.target.value)}
        disabled={loading}
        min="0"
        max="100"
        className="block mb-4 border border-gray-300 rounded p-2 w-full"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`px-6 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Upload and Analyze"}
      </button>
    </div>
  );
}

export default FileUploader;
