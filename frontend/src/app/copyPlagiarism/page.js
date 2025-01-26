"use client";

import React, { useState } from "react";
import FileUploader from "./FileUploader";
import Results from "./results";

function PlagiarismPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (files, threshold) => {
    setLoading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/copy-plagiarism/?threshold=${threshold}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to process files.");
      }

      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error(error);
      alert("An error occurred while processing the files.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-20">
        Copy Detection
      </h1>
      <FileUploader onUpload={handleUpload} loading={loading} />
      <Results results={results} />
    </div>
  );
}

export default PlagiarismPage;
