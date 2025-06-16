'use client';
import React, { useState } from 'react';

type FileUploadProps = {
  onUpload: (newFile: any) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [fileType, setFileType] = useState('');
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !fileType || !fileName) {
      setMessage('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileType', fileType);
    formData.append('fileName', fileName);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/files/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { error: 'Unexpected server error.' };
      }

      if (res.ok) {
        console.log("Uploaded file response:", data);
        setMessage('File uploaded successfully!');
        if (typeof onUpload === 'function') {
          onUpload(data); // ✅ send to parent
        } else {
          console.warn("onUpload is not a function", onUpload);
        }

        setFile(null);
        setFileName('');
        setFileType('');
      } else {
        setMessage(data?.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Server error.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow w-[700px]">
      <h2 className="text-2xl font-bold mb-4 text-blue-900 ml-[100px]">
        <span style={{borderBottom: '2px solid blue'}}>Please Add Your Medical Records</span>
      </h2>

      <label className="block mb-2 font-medium">File Type</label>
      <select
        value={fileType}
        onChange={(e) => setFileType(e.target.value)}
        className="w-[600px] mb-4 border rounded px-3 py-2"
      >
        <option value="">Select Type</option>
        <option value="Lab Report">Lab Report</option>
        <option value="Prescription">Prescription</option>
        <option value="X-Ray">X-Ray</option>
        <option value="Blood Report">Blood Report</option>
        <option value="MRI Scan">MRI Scan</option>
        <option value="CT Scan">CT Scan</option>
      </select>

      <label className="block mb-2 font-medium">File Name</label>
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        className="w-[600px] mb-4 border rounded px-3 py-2"
        placeholder="E.g., Ankit’s Lab Report for Typhoid"
      />

      <label className="block mb-2 font-medium">Upload File (PDF/Image)</label>
      <input
        type="file"
        accept="application/pdf, image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-[200px]"
      >
        Submit
      </button>

      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
    </form>
  );
};

export default FileUpload;








// import React, { useState } from 'react';

// const FileUpload = ({ onUpload }: { onUpload: (newFile: any) => void }) => {
//   const [fileType, setFileType] = useState('');
//   const [fileName, setFileName] = useState('');
//   const [file, setFile] = useState<File | null>(null);
//   const [message, setMessage] = useState('');
//   // const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!file || !fileType || !fileName) {
//       setMessage('All fields are required.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('fileType', fileType);
//     formData.append('fileName', fileName);

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/files/upload`, {
//         method: 'POST',
//         credentials: 'include',
//         body: formData,
//       });

//       // const data = await res.json();

//        let data;
//       try {
//         data = await res.json(); // 🔐 Try parse only if it's JSON
//       } catch {
//         data = { error: 'Unexpected server error.' };
//       }

//       if (res.ok) {
//         setMessage('File uploaded successfully!');
//         onUpload(data); // ✅ Send to parent
//         // setUploadedFiles((prev) => [...prev, data]);
//         setFile(null);
//         setFileName('');
//         setFileType('');
//       } else {
//         setMessage(data?.error || 'Something went wrong.');
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage('Server error.');
//     }
//   };

//   // const handleDelete = async (id: number) => {
//   //   try {
//   //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/files/${id}`, {
//   //       method: 'DELETE',
//   //       credentials: 'include',
//   //     });

//   //     if (res.ok) {
//   //       setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
//   //     } else {
//   //       console.error('Failed to delete file');
//   //     }
//   //   } catch (err) {
//   //     console.error('Error deleting file', err);
//   //   }
//   // };

//   // const renderFilePreview = (filePath: string) => {
//   //   const isImage = /\.(jpg|jpeg|png|gif)$/i.test(filePath);
//   //   const isPDF = /\.pdf$/i.test(filePath);

//   //   if (isImage) {
//   //     return (
//   //       <img
//   //         src={`${process.env.NEXT_PUBLIC_API_URL}${filePath}`}
//   //         alt="Uploaded"
//   //         className="h-32 w-auto object-cover rounded"
//   //       />
//   //     );
//   //   }

//   //   if (isPDF) {
//   //     return (
//   //       <img
//   //         src="/pdf-icon.png"
//   //         alt="PDF Icon"
//   //         className="h-16 w-16"
//   //       />
//   //     );
//   //   }

//   //   return <span className="text-sm text-gray-500">Unsupported format</span>;
//   // };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow w-full">
//       <h2 className="text-xl font-semibold mb-4">Upload Medical File</h2>

//       <label className="block mb-2 font-medium">File Type</label>
//       <select
//         value={fileType}
//         onChange={(e) => setFileType(e.target.value)}
//         className="w-full mb-4 border rounded px-3 py-2"
//       >
//         <option value="">Select Type</option>
//         <option value="Lab Report">Lab Report</option>
//         <option value="Prescription">Prescription</option>
//         <option value="X-Ray">X-Ray</option>
//         <option value="Blood Report">Blood Report</option>
//         <option value="MRI Scan">MRI Scan</option>
//         <option value="CT Scan">CT Scan</option>
//       </select>

//       <label className="block mb-2 font-medium">File Name</label>
//       <input
//         type="text"
//         value={fileName}
//         onChange={(e) => setFileName(e.target.value)}
//         className="w-full mb-4 border rounded px-3 py-2"
//         placeholder="E.g., Ankit’s Lab Report for Typhoid"
//       />

//       <label className="block mb-2 font-medium">Upload File (PDF/Image)</label>
//       <input
//         type="file"
//         accept="application/pdf, image/*"
//         onChange={(e) => setFile(e.target.files?.[0] || null)}
//         className="mb-4"
//       />

//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Submit
//       </button>

//       {message && <p className="mt-4 text-sm text-red-600">{message}</p>}

//     </form>
//   );
// };

// export default FileUpload;

      {/* Uploaded Files Preview
      {uploadedFiles.length > 0 && (
  <div className="mt-8 w-full">
    <h3 className="text-lg font-semibold mb-4">Uploaded Files</h3>
    <div className="flex flex-wrap gap-4 w-full">
      {uploadedFiles.map((file) => (
        <div
          key={file.id}
          className="border rounded p-4 flex gap-4 items-start w-full md:w-[48%] lg:w-[32%]"
        >
          {renderFilePreview(file.filePath)}
          <div>
            <p className="font-medium">{file.fileName}</p>
            <p className="text-sm text-gray-600">{file.fileType}</p>
            <div className="flex gap-4 mt-2">
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}${file.filePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View
              </a>
              <button
                onClick={() => handleDelete(file.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)} */}

      {/* {uploadedFiles.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Uploaded Files</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="border rounded p-4 flex gap-4 items-start">
                {renderFilePreview(file.filePath)}
                <div>
                  <p className="font-medium">{file.fileName}</p>
                  <p className="text-sm text-gray-600">{file.fileType}</p>
                  <div className="flex gap-4 mt-2">
                    <a
                      href={`${process.env.NEXT_PUBLIC_API_URL}${file.filePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )} */}
    {/* </form>
  );
};

export default FileUpload; */}








// 'use client';
// import React, { useState } from 'react';

// const FileUploadForm = () => {
//   const [fileType, setFileType] = useState('');
//   const [fileName, setFileName] = useState('');
//   const [file, setFile] = useState<File | null>(null);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!file || !fileType || !fileName) {
//       setMessage('All fields are required.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('fileType', fileType);
//     formData.append('fileName', fileName);

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/files/upload`, {
//         method: 'POST',
//         credentials: 'include', // important for session cookies
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage('File uploaded successfully!');
//         // Optionally reset the form
//         setFile(null);
//         setFileName('');
//         setFileType('');
//       } else {
//         setMessage(data?.error || 'Something went wrong.');
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage('Server error.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow w-full">
//       <h2 className="text-xl font-semibold mb-4">Upload Medical File</h2>

//       <label className="block mb-2 font-medium">File Type</label>
//       <select
//         value={fileType}
//         onChange={(e) => setFileType(e.target.value)}
//         className="w-full mb-4 border rounded px-3 py-2"
//       >
//         <option value="">Select Type</option>
//         <option value="Lab Report">Lab Report</option>
//         <option value="Prescription">Prescription</option>
//         <option value="X-Ray">X-Ray</option>
//         <option value="Blood Report">Blood Report</option>
//         <option value="MRI Scan">MRI Scan</option>
//         <option value="CT Scan">CT Scan</option>
//       </select>

//       <label className="block mb-2 font-medium">File Name</label>
//       <input
//         type="text"
//         value={fileName}
//         onChange={(e) => setFileName(e.target.value)}
//         className="w-full mb-4 border rounded px-3 py-2"
//         placeholder="E.g., Ankit’s Lab Report for Typhoid"
//       />

//       <label className="block mb-2 font-medium">Upload File (PDF/Image)</label>
//       <input
//         type="file"
//         accept="application/pdf, image/*"
//         onChange={(e) => setFile(e.target.files?.[0] || null)}
//         className="mb-4"
//       />

//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Submit
//       </button>

//       {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
//     </form>
//   );
// };

// export default FileUploadForm;
