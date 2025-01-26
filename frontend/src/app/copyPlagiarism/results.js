import React from "react";

function Results({ results }) {
  if (!results || results.length === 0) {
    return (
      <p className="text-gray-500 italic mt-4">
        No results available. Upload files to see results.
      </p>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Results</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">File 1</th>
            <th className="border border-gray-300 px-4 py-2">File 2</th>
            <th className="border border-gray-300 px-4 py-2">Similarity</th>
            <th className="border border-gray-300 px-4 py-2">Significant</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{result.file1}</td>
              <td className="border border-gray-300 px-4 py-2">{result.file2}</td>
              <td className="border border-gray-300 px-4 py-2">{result.similarity}</td>
              <td className="border border-gray-300 px-4 py-2">
                {result.is_significant ? (
                  <span className="text-green-600 font-semibold">Yes</span>
                ) : (
                  <span className="text-red-600 font-semibold">No</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
