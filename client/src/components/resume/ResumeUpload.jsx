import { useRef, useState } from "react";
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
} from "lucide-react";
import { useUploadResume } from "../../hooks/useUploadResume.js";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

function ResumeUpload() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  // manage server state  using tanstack query 
  const uploadMutation = useUploadResume();

  const handleUpload = () => {
    if (!file) {
      console.log("file is not present ");
      return;
    }
    console.log("the file type is :", file.type);
    uploadMutation.mutate(file);
    console.log("file uploaded successfully");
  }

  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;

    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return false;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("Maximum allowed file size is 5 MB.");
      return false;
    }

    setError("");
    setFile(selectedFile);
    return true;
  };

  const handleFileChange = (event) => {
    validateFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragging(false);

    validateFile(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const removeFile = () => {
    setFile(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`cursor-pointer rounded-3xl border-2 border-dashed px-6 py-8 text-center transition-all sm:px-8 sm:py-10 md:p-12
        ${dragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/40"
          }`}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 sm:h-20 sm:w-20">
          <Upload
            size={32}
            className="text-primary sm:h-9 sm:w-9"
          />
        </div>

        <h2 className="mt-6 text-xl sm:text-2xl font-semibold">
          Upload Resume
        </h2>

        <p className="mt-3 text-muted-foreground">
          Drag & drop your PDF here
        </p>

        <p className="text-muted-foreground">
          or click to browse.
        </p>

        <p className="mt-5 text-sm text-muted-foreground">
          PDF • Maximum size 5 MB
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      {file && (
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <FileText className="text-primary" />

            <div>
              <p className="truncate font-medium">{file.name}</p>

              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <CheckCircle2 className="text-green-500" />

            <button
              onClick={removeFile}
              className="rounded-lg p-2 transition hover:bg-muted"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <button
        disabled={!file || uploadMutation.isPending}
        onClick={handleUpload}
        className="w-full rounded-xl cursor-pointer bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploadMutation.isPending
          ? "Uploading..."
          : "Upload Resume"}
      </button>


    </div>
  );
}

export default ResumeUpload;