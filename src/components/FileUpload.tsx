"use client";

import { useState } from "react";
import { useCourseworkStore } from "../store/useCourseworkStore";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const addFile = useCourseworkStore((state) => state.addFile);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    handleFileUpload(uploadedFile);
  };

  const handleFileUpload = (uploadedFile: File | undefined) => {
    if (uploadedFile && uploadedFile.size <= 25 * 1024 * 1024) {
      setFile(uploadedFile);
      addFile(uploadedFile);
    } else if (uploadedFile) {
      alert("File size exceeds 25 MB limit.");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const uploadedFile = e.dataTransfer.files?.[0];
    handleFileUpload(uploadedFile);
  };

  return (
    <div
      className={`border-dashed border-2 p-4 text-center mb-4 grid place-items-center m-4 ${
        dragging ? "border-blue-500 bg-blue-100" : "border-gray-300"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf"
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        Drag & Drop your PDF here or click to upload
      </label>
      {file && <p className="mt-2">Uploaded: {file.name}</p>}
    </div>
  );
};

export default FileUpload;
